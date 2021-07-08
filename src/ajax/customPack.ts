import fileDownload from 'js-file-download';
// import store from '@/store';
// import {proTipsFun} from '@/componentsBusiness/ProTips';
import {IOBJ} from '../types/index';
import {IMyRejectObj, IMyOptions} from '../types/ajax';

import CacheAjax from './cacheAjax';
import get from './axiosPack';
import {ajaxConfig} from './config';
import * as utils from '../utils';


const cacheData: IOBJ = {};
const ajaxErr = [
    {key: 'timeout of', text: '请求超时，请稍后...'},
    {key: '404', text: '请求地址有误'},
];

const unauthorizedLink = utils.debounce(function (data: IMyRejectObj) {
    // console.log(1, data);
    // store.dispatch('userData/loginLink', data);
    const handleUnauthorized = ajaxConfig.handleUnauthorized;
    typeof handleUnauthorized === 'function' && handleUnauthorized(data);
}, 600);

const handleError = (err: IMyRejectObj) => {
    // console.log(err);
    const {type, data} = err;
    let errorText = '服务器异常';
    let item = null;
    // console.log(data.message);
    switch (true) {
        case type === 'catchError':
            item = ajaxErr.find((ii) => ~(data.message || data.errMsg || '').indexOf(ii.key));
            item && (errorText = item.text);
            break;
        case type === 'thenError' && data.status === 'unauthorized':
            errorText = 'unauthorized';
            unauthorizedLink(err);
            break;
        case type === 'thenError' && (!!data.resultMsg || !!data.message):
            errorText = data.resultMsg || data.message;
            break;
    }

    return errorText;
};


const handleParams = (params: IOBJ, options: IMyOptions) => {
    const interceptParams = ajaxConfig.interceptParams;

    if (typeof interceptParams === 'function') {
        params = interceptParams(params, options);
    } else {
        params = utils.clearJsonEmpty(params, false);
    }

    return params;
};

function ajax1 (url: string, params: IOBJ, options: IMyOptions) {
    const {closeErrorTips, resType, fileFullName, blobNoAutoDownload} = options;
    const isBlob = resType === 'blob';
    const conveyor: IOBJ = {};
    const {loadBefore, loadAfter, interceptError} = ajaxConfig;

    params = handleParams(params, options);

    typeof loadBefore === 'function' && loadBefore(options, conveyor);

    return new Promise((rel, rej) => {
        get(url, params, options).finally(() => {

            typeof loadAfter === 'function' && loadAfter(options, conveyor, 'finally');

        }).then((res) => {

            typeof loadAfter === 'function' && loadAfter(options, conveyor, 'then');

            if (isBlob) {
                const filename = (res.data as IOBJ).filename;
                !blobNoAutoDownload && fileDownload(res.data as Blob, fileFullName || filename || '');
            }

            rel(res);

        }).catch((err: IMyRejectObj) => {

            typeof loadAfter === 'function' && loadAfter(options, conveyor, 'catch');

            console.error(err);

            if (typeof interceptError === 'function') {
                interceptError(err, options);
                return;
            }

            const text = handleError(err);

            if (text === 'unauthorized') {
                return;
            }

            if (!closeErrorTips) {
                // 提示
                text && utils.toast(text, 3);
            }

            rej(err);
        });
    });
}

// 加上缓存功能
export default function ajax2 (url: string, params: IOBJ, options: IMyOptions) {
    const domain = ajaxConfig.domain;
    const targetDomain = options.targetDomain;
    const baseUrl = domain[targetDomain || 'apiUrl'];
    url = baseUrl + url;

    const cacheKey = url;
    // const cacheKey = `${url}${JSON.stringify(params)}`;
    let cacheObj = cacheData[cacheKey];
    if (!cacheObj) {
        cacheObj = new CacheAjax((params, options) => {
            delete params._URL;
            return ajax1(url, params, options) as Promise<IOBJ>;
        }, 20);
    }

    params._URL = url;
    cacheData[cacheKey] = cacheObj;
    return cacheObj.run(params, options);
}

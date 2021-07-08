import axios, {Canceler, AxiosResponse, AxiosRequestConfig} from 'axios';
// import JSONBin from 'json-bigint';
import qs from 'qs';

import {IOBJ} from '../types/index';
import {TMyGet, IMyResponse, IMyRejectObj} from '../types/ajax';

import {ajaxConfig} from './config';
import * as utils from '../utils';


// 执行中的ajax
const executionAjax: {[key: string]: Canceler | null} = {};

/**
 * 通过请求接口参数 获取对应的请求头 以及请求参数处理函数
 * @param action 一个标志
 */
const action = (action?: string) => {
    let contentType = null;
    let handleRequest = null;
    switch (action) {
        case 'form':
            contentType = 'application/x-www-form-urlencoded;charset=UTF-8';
            handleRequest = (data: IOBJ) => {
                return qs.stringify(data);
            };
            break;
        case 'formData':
            contentType = 'multipart/form-data';
            handleRequest = (data: IOBJ) => {
                return data;
            };
            break;
        default:
            contentType = 'application/json;charset=UTF-8';
            handleRequest = (data: IOBJ) => {
                return JSON.stringify(data);
            };
            break;
    }

    return {contentType, handleRequest};
};

/**
 * 初次封装，只处理请求头和参数回调，以及处理是否打断上一次请求
 * @param url 路径
 * @param params 请求参数
 * @param options 其它参数
 */
const get: TMyGet = (url, params, options) => {
    const {method, noCloseBeforeAjax = false, resType} = options;
    const {contentType, handleRequest} = action(options.action);
    const isBlob = resType === 'blob';
    const interceptHeaders = ajaxConfig.interceptHeaders;
    const headers = {
        'Content-Type': contentType,
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/json; charset=utf-8',
        // 'Access-Control-Allow-Origin': '*',
    };

    typeof interceptHeaders === 'function' && interceptHeaders(headers, options);


    return new Promise((resolve, reject) => {
        if (!noCloseBeforeAjax && typeof executionAjax[url] === 'function') {
            // console.warn('打断之前请求');
            executionAjax[url]!();
        }
        executionAjax[url] = null;

        const getParams = options.params || (method === 'get' ? params : {});

        const data: AxiosRequestConfig = {
            headers,
            method,
            url,
            params: getParams,
            data: params || {},
            timeout: 1000 * 60 * 12,
            transformRequest: [(data) => {
                return handleRequest(data);
            }],
            transformResponse: [(res) => {
                executionAjax[url] = null;
                try {
                    let str = res;
                    if (typeof res === 'string') {
                        // 把15位数值 转为字符串
                        // str = str.replace(/"\w+":\s*\d{15,}/g, (longVal: string) => {
                        //     const split = longVal.split(':');
                        //     return split[0] + ':' + '"' + split[1].trim() + '"';
                        // });
                        // str = JSON.parse(str);

                        str = utils.handleJsonNumToObj(str);
                    }
                    return str;
                } catch (error) {
                    return res;
                }
            }],
            cancelToken: new axios.CancelToken((c) => {
                executionAjax[url] = c;
            })

        };

        if (isBlob) {
            data.responseType = 'blob';
        }

        axios(data).finally(() => {
            executionAjax[url] = null;
        }).then((res) => {
            let data: IMyResponse = res.data;

            // 返回参数
            const returnData = (resData: IMyResponse) => {
                if (resData.status === 'success') {
                    resolve(resData);
                } else {
                    reject({type: 'thenError', data: resData, oldRes: res} as IMyRejectObj);
                }
            };

            // console.log(res);
            if (isBlob && data instanceof Blob && data.type === 'application/json') {
                // 处理返回是 json 的数据
                // blob 转 json
                const reader = new FileReader();
                const errorFun = () => {
                    returnData(data);
                };

                reader.readAsText(data, 'utf-8');
                reader.onload = () => {
                    // console.log(reader.result);
                    try {
                        const strToObj = JSON.parse(reader.result as string);
                        returnData(strToObj);
                    } catch (error) {
                        errorFun();
                    }
                };

                reader.onerror = errorFun;
            } else if (isBlob && data instanceof Blob) {
                // 文件流的时候，从响应头里获取文件名字，然后会把名字挂到 blob对象上
                let filename = '';
                try {
                    const str = res.headers['content-disposition'];
                    filename = qs.parse(str.replace(/; /g, '&')).filename as string;
                    (data as IOBJ).filename = filename;
                } catch (error) {
                    console.log(error);
                }

                data = {
                    status: 'success',
                    data,
                    message: '',
                    timestamp: 0,
                };
                returnData(data);
            } else {
                returnData(data);
            }
        }).catch((error) => {
            if (!axios.isCancel(error)) {
                reject({type: 'catchError', data: error} as IMyRejectObj);
            }
        });
    });
};

export default get;

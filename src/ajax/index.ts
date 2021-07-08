import {IOBJ} from '../types/index';
import {IMyResponse, IMyOptions} from '../types/ajax';
import ajax from './customPack';

export type TMyAjax = (url: string, params?: IOBJ, options?: IMyOptions) => Promise<IMyResponse>;

export type TApi = (params?: IOBJ, options?: IMyOptions) => Promise<IOBJ>;

export const apiGet: TMyAjax = (url, params, options) => {
    params = params || {};
    options = options || {};
    options.method = 'get';
    options.targetDomain = options.targetDomain || '';
    return ajax(url, params, options);
};

export const apiPost: TMyAjax = (url, params, options) => {
    params = params || {};
    options = options || {};
    options.method = 'post';
    options.targetDomain = options.targetDomain || '';
    return ajax(url, params, options);
};

export const apiPut: TMyAjax = (url, params, options) => {
    params = params || {};
    options = options || {};
    options.method = 'put';
    options.targetDomain = options.targetDomain || '';
    return ajax(url, params, options);
};

export const apiDel: TMyAjax = (url, params, options) => {
    params = params || {};
    options = options || {};
    options.method = 'delete';
    options.targetDomain = options.targetDomain || '';
    return ajax(url, params, options);
};

export const get = ajax;

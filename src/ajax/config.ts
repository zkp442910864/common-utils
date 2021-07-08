
import {IOBJ} from '../types/index';
import {IMyOptions, IMyRejectObj} from '../types/ajax';

interface IAjaxConfig {
    /**
     * 接口域名
     *
     * 可以分为多个域名，然后通过 targetDomain 来指定使用的域名
     */
    domain: {
        apiUrl: string;
        [key: string]: string;
    };
    /**
     * 处理权限不足问题
     */
    handleUnauthorized?: (data: IMyRejectObj) => void;
    /**
     * 拦截提交参数
     */
    interceptParams?: (data: IOBJ, options: IMyOptions) => IOBJ;
    /**
     * 拦截非success 状态的数据
     *
     * 覆盖 handleUnauthorized 函数
     */
    interceptError?: (err: IMyRejectObj, options: IMyOptions) => void;
    /**
     * 拦截请求头
     */
    interceptHeaders?: (headers: IOBJ, options: IMyOptions) => void;
    /**
     * 请求前设置load
     *
     * options 调用接口时传入的相关配置
     *
     * conveyor 一个对象，用来统一操作数据（一般在这赋值）
     */
    loadBefore?: (options: IMyOptions, conveyor: IOBJ) => any;
    /**
     * 请求后设置load
     *
     * options 调用接口时传入的相关配置
     *
     * conveyor 一个对象，用来统一操作数据（一般在这使用）
     *
     * status 分别对应 Promise 不同的状态
     */
    loadAfter?: (options: IMyOptions, conveyor: IOBJ, status: 'finally' | 'then' | 'catch') => void;
}

/**
 * ajax 的配置项
 *
 * 可配置项包括： domain, handleUnauthorized, interceptParams, interceptError, interceptHeaders, loadBefore, loadAfter
 *
 */
export const ajaxConfig: IAjaxConfig = {
    domain: {
        apiUrl: ''
    },
};

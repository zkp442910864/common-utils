
export interface IMyResponse {
    /**
     * 状态码
     *
     * Blob 文件流的时候，从响应头里获取文件名字，然后会把名字挂到 blob对象上
     *
     * IOBJ json数据
     */
    data: IOBJ | Blob;
    status: 'success' | 'error' | 'warning' | 'unauthorized' | 'fail';
    message: string;
    /**
     * 时间戳
     */
    timestamp: number;
    /**
     * 当开启了缓存，会出现这个
     */
    clearCurCache?: () => void;
}

export interface IMyOptions {
    method?: 'get' | 'delete' | 'post' | 'put' | 'post';
    /**
     * 默认json
     */
    action?: 'form' | 'formData';
    params?: IOBJ;
    /**
     * 不取消之前同接口的请求
     * true 不取消， false 取消
     */
    noCloseBeforeAjax?: boolean | false;
    /**
     * 是否读取缓存
     * 默认 false
     */
    isRCache?: boolean | false;
    /**
     * 缓存有效时间
     */
    validityTime?: number | 5;
    /**
     * 目标域名
     */
    targetDomain?: string;
    /**
     * 加载框
     */
    isLoad?: boolean | false;
    /**
     * 关闭错误提示
     */
    closeErrorTips?: boolean | false;
    /**
     * 响应类型 目前只有 blob字节流
     */
    resType?: 'blob';
    /**
     * blob 时候文件不自动下载
     */
    blobNoAutoDownload?: boolean;
    /**
     * 返回文件时候，这个作为文件名字进行 下载
     *
     * resType === 'blob' 必传
     */
    fileFullName?: string;
}

export interface IMyRejectObj {
    /**
     * 失败回调类型
     */
    type: 'thenError' | 'catchError';
    /**
     * 错误的相关信息
     */
    data: IOBJ;
    /**
     * thenError 回调里才有这参数
     */
    oldRes?: IOBJ;
    // oldRes?: AxiosResponse
}

export type IMyPromiseAjax = (params: IOBJ, options: IMyOptions) => Promise<IOBJ>;

export type TMyGet = (url: string, params: IOBJ, options: IMyOptions) => Promise<IMyResponse>;

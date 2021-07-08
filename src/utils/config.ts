
interface IUtilsConfig {
    /**
     * 弱提示相关函数
     *
     * 推荐使用ui框架提供的功能
     */
    message?: {
        // 成功的函数
        1: (msg: string) => void;
        // 警告的函数
        2: (msg: string) => void;
        // 错误的函数
        3: (msg: string) => void;
    };
    /**
     * 时间函数 没有就使用 window.Date
     *
     * 推荐使用moment
     *
     * 不引入主要是因为会有语言区分
     */
    moment?: any;
    /**
     * 确认弹窗
     *
     * 推荐使用ui框架提供的功能
     */
    modal?: any;
    /**
     * 重写 确认弹窗 的功能
     */
    modalFun?: any;
}


/**
 * utils 的配置
 *
 * 可配置项包括： message, moment, modal, modalFun
 *
 */
export const utilsConfig: IUtilsConfig = {
    moment: null,
    message: undefined,
    modal: null,
};

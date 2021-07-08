import {IOBJ} from '../../../types/index';
export type TKeyOrErr = {[key: string]: string};
export type TAddRuleFn = (val: any, data: IOBJ) => string;

export interface ICheckValObj {

    /**
     * 需要校验的字段，以及为空的提示
     * {name: '请输入名字'}
     */
    emptyKey: TKeyOrErr;

    /**
     * 错误数据的数组
     */
    checkErrArr: TKeyOrErr[];

    /**
     * 获取错误信息
     */
    getErrorInfo (): TKeyOrErr[];

    /**
     * 是否弹窗提示
     */
    showToast: boolean;

    /**
     * 执行函数
     */
    run (data: IOBJ): boolean;

    /**
     * 是否有错误信息
     * @param arr 错误数组
     */
    handleInfo (arr: IOBJ[]): boolean;

    /**
     * 添加新规则
     * @param key 属性字段
     * @param fn 判断函数
     */
    _addRule (key: string, fn: TAddRuleFn): void;

    /**
     * 校验银行卡
     * @param val 值
     */
    bankCard (val: string): string;

    /**
     * 校验手机号
     * @param val 值
     */
    phone (val: string): string;

    /**
     * 校验身份证号
     * @param val 值
     */
    idCard (val: string): string;
}

export type TCheckValFun = (emptyKey: TKeyOrErr, showToast?: boolean) => ICheckValObj;


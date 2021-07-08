
import {empty} from './empty';

type TToFixed = (val: string | number, toNum?: true | boolean, retain?: number | 2) => number | string;

/**
 * 保留小数点后两位
 * @param val 需要处理的值
 * @param toNum 是否转换为数字 true
 * @param retain 保留位数 2
 * @returns string | number
 */
export const toFixed: TToFixed = (val, toNum = true, retain = 2) => {
    if (empty(val) || isNaN(val as any)) {
        val = 0;
    }
    const newVal = (+val).toFixed(retain);
    return toNum ? +newVal : newVal;
};

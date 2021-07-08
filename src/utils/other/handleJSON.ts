import {empty} from './empty';

type TClearEmpty = <T>(data: T, playSort?: true | boolean) => T;

/**
 * 清空对象里或数组里的空数据
 *
 * @param data 对象 或 数组
 * @param playSort 是否进行排序
 * @returns 新 对象或数组
 */
export const clearJsonEmpty: TClearEmpty = (data: any, playSort = true) => {
    if (typeof data !== 'object') return data;

    const obj: any = Array.isArray(data) ? [] : {};

    const keys = playSort ? Object.keys(data).sort() : Object.keys(data);
    keys.forEach((key) => {
        if (!empty(data[key])) {
            obj[key] = clearJsonEmpty(data[key]);
        }
    });

    return obj;
};

/**
 * 数值长度过15的时候，正则匹配转字符串
 *
 * @param str json 字符串
 * @returns 对象
 */
export const handleJsonNumToObj = (str: string) => {

    const obj = str.replace(/"\w+":\s*\d{15,}/g, (longVal) => {
        const split = longVal.split(':');
        return split[0] + ':' + '"' + split[1].trim() + '"';
    });

    const result = JSON.parse(obj);
    return result;
};

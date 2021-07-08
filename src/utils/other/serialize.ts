import {IOBJ} from '../../types/index';
type ISerialize = (data: IOBJ) => 'a=1&b=2&c=3' | string;

/**
 * 参数序列化 a=1&b=2&c=3
 * @param data 对象
 * @returns a=1&b=2&c=3
 */
export const serialize: ISerialize = (data) => {
    const arr = [];
    for (const i in data) {
        const str = data[i];
        // item && (item = `${item}`.replace(/ /g, '%20'));
        arr.push(`${i}=${str || ''}`);
    }
    return arr.join('&');
};

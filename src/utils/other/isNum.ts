import {empty} from './empty';
import {IOBJ} from '../../types/index';


/**
 * params 对象
 *
 * key key值
 *
 * point 小数点
 *
 * negative 负数
 *
 * precision 精度 默认2
 */
type TIsNum = (this: any, params: IOBJ, key: string, point?: true | boolean, negative?: false | boolean, precision?: 2 | number) => void;



/**
 * params 对象
 *
 * key key值
 *
 * point 小数点 默认true
 *
 * negative 负数 默认false
 *
 * precision 精度 默认2
 */
export const isNum = (function isNum (this, item, key, point = true, negative = false, precision = 2) {
    let str = item[key];

    if (empty(str)) return str;
    str = str + '';

    // 去掉非数值
    str = str.replace(/[^\d.-]+/g, '');

    if (point) {
        // 保留两位
        str = str.replace(/(\.\d+)$/, (val: string) => val.substr(0, precision + 1));
    } else {
        // 去掉小数位
        str = str.replace(/(\.\d+)$/, '');
    }

    // let reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
    // 正浮点数，包括0
    let reg = /^\d+(\.\d+)?$/;

    switch (true) {
        case point && negative:
            reg = /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/;
            break;
        case point && !negative:
            reg = /^\d+(\.\d+)?$/;
            break;
        case !point && negative:
            reg = /^([-]?)[0-9]*$/;
            break;
        case !point && !negative:
            reg = /^[0-9]*$/;
            break;
    }

    // console.log(reg)
    // if (!reg.test(str)) {
    //     this.$set(item, key, '');
    // } else {
    //     this.$set(item, key, str);
    // }
    const nVal = !reg.test(str) ? '' : str;

    this.$set && this.$set(item, key, nVal);
    return nVal;
}) as TIsNum;

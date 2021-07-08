import {IOBJ} from '../../types/index';
import {utilsConfig} from '../config';
import {empty} from './empty';


interface IDateData extends IOBJ{
    // 年
    y: number | string;
    // 月
    m: number | string;
    // 日
    d: number | string;
    // 小时
    h: number | string;
    // 分
    mm: number | string;
    // 秒
    s: number | string;
    // 时间戳
    time: number;
    // 周几
    week: number | string;
    // 2002-01-01
    text: string;
    // 2002-01-01 00:00:00
    textTime: string;
}

type TDateData = (dateStr: string, format?: string) => IDateData | {text: string; textTime: string};

/**
 * 时间对象
 * @param dateStr 时间字符串
 * @param format 输出格式，默认 y-m-d
 * @returns IDateData | {text: string; textTime: string}
 */
export const dateData: TDateData = (() => {
    const WEEK_ARR = ['日', '一', '二', '三', '四', '五', '六'];

    const addZero = (val: number) => {
        return `${val}`.padStart(2, '0');
    };

    return (dateStr: string, format = 'y-m-d') => {
        if (empty(dateStr)) {
            return {text: dateStr, textTime: dateStr};
        }

        let date = new Date(dateStr);
        if (typeof utilsConfig.moment === 'function') {
            date = new Date(utilsConfig.moment(dateStr).toString());
        }

        const o: IDateData = {
            y: date.getFullYear(),
            m: addZero(date.getMonth() + 1),
            d: addZero(date.getDate()),
            h: addZero(date.getHours()),
            mm: addZero(date.getMinutes()),
            s: addZero(date.getSeconds()),
            time: date.getTime(),
            week: WEEK_ARR[date.getDay()],
            text: '',
            textTime: '',
        };

        const text = format.replace(/[ymd]/g, (str) => {
            return o[str || ''];
        });
        o.text = text;

        const textTime = `${format} h:M:s`.replace(/[ymdhMs]/g, (str) => {
            str === 'M' && (str = 'mm');
            return o[str || ''];
        });
        o.textTime = textTime;

        return o;
    };
})();


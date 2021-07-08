
// Throttle(节流) 和 Debounce(防抖) 结合
// 主要思路就是，在 长时间不操作或第一次操作 时立马执行，后续的连续操作使用防抖。


// TODO: 两种获取this的方式，这种主要在 返回新函数，挂在主对象上，获取当前对象的this

export type TFunCallBack = (...arr: any) => any;
export type TThrottleAndDebounce = (fn: TFunCallBack, interval?: number) => TFunCallBack;

/**
 * 函数节流，加入防抖的优化
 * @param {*} fn 函数
 * @param {*} interval 间隔
 * @returns 新函数
 */
export const throttleD: TThrottleAndDebounce = (fn, interval = 300) => {
    let t: any = null;
    let time = 0;

    return function (this: any, ...arg: any[]) {
        const now = Date.now();

        if (now - time > interval) {
            t && clearTimeout(t);

            time = now;
            fn.apply(this, arg);
        } else {
            t && clearTimeout(t);

            t = setTimeout(() => {
                time = now;
                fn.apply(this, arg);
                t = null;
            }, interval);
        }
    };
};

// 两种获取this的方式，这种主要在创建新函数时候得到this
/* export const throttleD: TThrottleAndDebounce = function (this: any, fn, interval = 300) {
    let t: any = null;
    let time = 0;

    return (...arg: any[]) => {
        const now = Date.now();

        if (now - time > interval) {
            t && clearTimeout(t);

            time = now;
            fn.apply(this, arg);
        } else {
            t && clearTimeout(t);

            t = setTimeout(() => {
                time = now;
                fn.apply(this, arg);
                t = null;
            }, interval);
        }
    };
}; */


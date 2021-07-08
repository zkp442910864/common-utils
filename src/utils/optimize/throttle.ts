// throttle 的中心思想在于：在某段时间内，不管你触发了多少次回调，我都只认第一次，并在计时结束时给予响应。

// TODO: 两种获取this的方式，这种主要在 返回新函数，挂在主对象上，获取当前对象的this

export type TFunCallBack = (...arr: any) => any;
export type TThrottleAndDebounce = (fn: TFunCallBack, interval?: number) => TFunCallBack;

/**
 * 函数节流
 * @param fn 函数
 * @param interval 间隔
 * @returns 新函数
 */
export const throttle: TThrottleAndDebounce = (fn, interval = 300) => {
    let time = 0;

    return function (this: any, ...arg: any[]) {
        const now = Date.now();

        if (now - time > interval) {
            time = now;
            fn.apply(this, arg);
        }
    };
};


// 两种获取this的方式，这种主要在创建新函数时候得到this
/* export const throttle: TThrottleAndDebounce = function (this: any, fn, interval = 300) {
    let time = 0;

    return (...arg: any[]) => {
        const now = Date.now();

        if (now - time > interval) {
            time = now;
            fn.apply(this, arg);
        }
    };
}; */



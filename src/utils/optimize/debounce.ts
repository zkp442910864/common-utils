
// 防抖的中心思想在于：我会等你到底。在某段时间内，不管你触发了多少次回调，我都只认最后一次。

// TODO: 两种获取this的方式，这种主要在 返回新函数，挂在主对象上，获取当前对象的this

export type TFunCallBack = (...arr: any) => any;
export type TThrottleAndDebounce = (fn: TFunCallBack, interval?: number) => TFunCallBack;

/**
 * 函数防抖
 * @param fn 函数
 * @param interval 间隔
 * @returns 新函数
 */
export const debounce: TThrottleAndDebounce = (fn, interval = 300) => {
    let t: any = null;

    return function (this: any, ...arg: any[]) {
        // 获取最后的一个参数，是一个对象，有一个 isForceRun 值
        // 提供个强制执行的入口
        let isForceRun = false;
		
		if (arg && arg.length && typeof arg[0] === 'object') {
			isForceRun = arg[0].isForceRun as boolean;
		}

        if (isForceRun) {
            t && clearTimeout(t);
            t = null;
            fn.apply(this, arg);
            return;
        }

        t && clearTimeout(t);
        t = setTimeout(() => {
            fn.apply(this, arg);
            t = null;
        }, interval);
    };
};

// 两种获取this的方式，这种主要在创建新函数时候得到this
/* export const debounce: TThrottleAndDebounce = function (this: any, fn, interval = 300) {
    let t: any = null;

    return (...arg: any[]) => {

        t && clearTimeout(t);
        t = setTimeout(() => {
            fn.apply(this, arg);
            t = null;
        }, interval);
    };
}; */

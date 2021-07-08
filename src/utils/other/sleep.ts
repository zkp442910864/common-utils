type TSleep = (duration?: number | 500) => Promise<void>;

/**
 * async/await 阻断执行，默认500ms
 * @param duration 500
 * @returns Promise<void>
 */
export const sleep: TSleep = (duration = 500) => {
    if (!duration) return Promise.resolve();
    return new Promise((rel) => {
        setTimeout(() => {
            rel();
        }, duration);
    });
};

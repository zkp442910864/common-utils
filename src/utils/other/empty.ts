type TEmpty = (str: any) => boolean;

/**
 * 判空
 * @param str 值
 * @returns true | false
 */
export const empty: TEmpty = (str) => {
    if (typeof str === 'undefined' || str === null || str === '') {
        return true;
    }
    return false;
};

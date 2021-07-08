

type TGetStorage = (str: string, defaultValue?: any) => any;
type TRemoveStorage = (str: string) => any;
type TSetStorage = (str: string, val: any) => void;

/**
 * localeStorage 存储
 * @param key 键
 * @param data 值
 */
export const setStorage: TSetStorage = (key, data) => {
    if (typeof data === 'object') {
        data = JSON.stringify(data);
    }
    window.localStorage.setItem(key, data);
};

/**
 * localeStorage 取值
 * @param key 键
 * @param defaultValue 取不到时的默认值
 * @returns 值
 */
export const getStorage: TGetStorage = (key, defaultValue) => {
    let data = window.localStorage.getItem(key);
    try {
        data && (data = JSON.parse(data as any));
    } catch (error) {
    }

    return data || defaultValue;
};

/**
 * localeStorage 删除
 * @param key 键
 */
export const removeStorage: TRemoveStorage = (key) => {
    window.localStorage.removeItem(key);
};

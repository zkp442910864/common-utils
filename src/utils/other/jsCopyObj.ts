
type TJsCopyObj = <T>(data: T, cache?: any[]) => T;

export const jsCopyObj: TJsCopyObj = (data: any, cache = []) => {
    // debugger
    if (data === null || typeof data !== 'object') {
        return data;
    }

    // 循环引用
    const find = cache.find((i) => (i.old === data));
    if (find) {
        return find.obj;
    }

    const obj: any = Array.isArray(data) ? [] : {};

    cache.push({
        obj,
        old: data
    });

    Object.keys(data).forEach((key: string) => {
        obj[key] = jsCopyObj(data[key], cache);
    });

    return obj;
};

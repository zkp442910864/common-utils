
export type TTaskItem = Promise<string>;
export type TConcurrentAjaxDataItem = () => Promise<void>;
export type TConcurrentAjaxData = TConcurrentAjaxDataItem[];
export type TConcurrentAjaxClose = () => void;
export type TConcurrentAjax = (data: TConcurrentAjaxData) => TConcurrentAjaxClose;

/**
 * 最大数持续并发
 * @param data (() => Promise<void>)[]
 * @returns 结束函数
 */
export const concurrentAjax: TConcurrentAjax = (data) => {
    // 结束标识
    let end = false;
    // 最大并发数
    const concurrentNum = 5;

    // 并发数组，和标识
    const taskMap: {[key: string]: TTaskItem} = {};
    let taskData: TTaskItem[] = [];
    let index = 0;

    // 添加任务
    const pushTask = () => {
        if (!data.length || (taskData.length >= concurrentNum) || end) return;
        const item = data.shift() as TConcurrentAjaxDataItem;

        const key = `${index++}`;
        // 包装起来，并加入对应标识，清空作用
        const promise = (async () => {
            try {
                // TODO: 报错在外层处理，不放这里
                await item();
            } catch (error) {
                console.error(error);
            }
            return key;
        })();

        // 重新生成数组
        taskMap[key] = promise;
        taskData = Object.values(taskMap);

        pushTask();
    };
    // 执行并发
    const run = async () => {
        if (!taskData.length || end) return;

        const key = await Promise.race(taskData);

        // 重新生成数组
        delete taskMap[key];
        taskData = Object.values(taskMap);
        // console.log(taskData)

        // 切成多个任务队列执行，如果接口使用缓存，会导致线程卡死
        setTimeout(() => {
            pushTask();
            run();
        }, 100);
    };

    pushTask();
    run();

    return () => {
        end = true;
    };
};



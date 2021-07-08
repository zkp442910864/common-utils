
import {utilsConfig} from '../config';


interface IConfirmData {
    /**
     * 主标题
     */
    title: string;
    /**
     * 副标题
     */
    content?: string;
    /**
     * 只能通过按钮关闭
     */
    force?: boolean;
    /**
     * 窗口类型
     */
    type?: 'info' | 'success' | 'error' | 'warning' | 'confirm';
}

export type TConfirm = (title: string | IConfirmData, msg?: string, force?: boolean) => Promise<void>;

/**
 * 确认窗口
 * @param title 标题 | 对象
 * @param content 内容
 * @param force 强制点确认
 * @param arg 其他参数
 * @returns Promise<void>
 */
export const confirm: TConfirm = (title, content, force, ...arg) => {
    const fn = utilsConfig.modalFun;
    const modal = utilsConfig.modal;

    if (typeof fn === 'function') {
        return fn(title, content, force, ...arg);
    }

    if (!modal) {
        throw new Error('需要引入 框架modal 才能使用');
    }


    let data: IConfirmData = {
        title: title as string
    };

    if (typeof title === 'object') {
        data = title;
    } else {
        data.title = title;
        data.content = content;
        // 把 强制点击确认 和 type 区别开来，上面使用对象可控性就多了
        data.force = force;
        data.force && (data.type = 'info');
    }

    return new Promise((rel, rej) => {
        const fn = data.type ? modal[data.type] : modal.confirm;
        fn({
            title: data.title,
            content: data.content,
            maskClosable: !data.force,
            cancelText: '取消',
            okText: '确定',
            onOk: () => rel(),
            onCancel: () => rej(),
        });
    });
};


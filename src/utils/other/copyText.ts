import {toast} from './toast';

type TCopyText = (str: string, showToast?: boolean) => Promise<void>;

/**
 * 复制文本
 * @param str 复制内容
 * @param showToast 复制后是否提示成功
 * @returns Promise<void>
 */
export const copyText: TCopyText = (str, showToast) => {
    const input = document.createElement('textarea');
    input.setAttribute('type', 'text');
    input.setAttribute('style', 'opacity: 0');
    input.value = str;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    input.remove();
    if (showToast) {
        toast('复制成功', 1);
    }
    return Promise.resolve();
};

import {utilsConfig} from '../config';
type TToast = (msg: string, status?: 1 | 2 | 3) => void;

/**
 * 弱提示框
 * @param msg 提示内容
 * @param status 1成功  2警告  3错误
 */
export const toast: TToast = (msg, status) => {
    const fn = (utilsConfig.message && utilsConfig.message[status || 1]) || window.alert;
    // let fn = null;
    // switch (status) {
    //     case 3:
    //         fn = message.error;
    //         break;
    //     case 2:
    //         fn = message.warning;
    //         break;
    //     case 1:
    //     default:
    //         fn = message.success;
    // }

    fn(msg);
};

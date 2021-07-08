import {IOBJ} from '../../../types/index';
import {TAddRuleFn, TKeyOrErr, TCheckValFun, ICheckValObj} from './checkVal';
import {toast} from '../toast';
import {empty} from '../empty';

export default function checkValFun (utils: IOBJ) {

    class CheckVal implements ICheckValObj {
        // eslint-disable-next-line no-undef
        [key: string]: any | TAddRuleFn;

        showToast = false;
        checkErrArr: TKeyOrErr[] = [];
        emptyKey: TKeyOrErr = {};

        constructor (emptyKey = {}, showToast = true) {
            // super();
            this.emptyKey = emptyKey;
            this.showToast = showToast;
        }

        getErrorInfo (): TKeyOrErr[] {
            return this.checkErrArr;
        }

        // 获取对应的值
        getVal (data: IOBJ, key: string) {
            let val = data;
            const arrKey = key.split('.');

            try {
                arrKey.forEach((aKey) => {
                    val = val[aKey];
                });
            } catch (error) {
                console.log(error, '数据结构有问题，找不到指定数据');
            }

            return val;
        }

        run (data: IOBJ): boolean {
            const emptyKey = this.emptyKey;
            const arr: TKeyOrErr[] = [];
            // debugger;

            Object.keys(emptyKey).forEach((key) => {
                const val = this.getVal(data, key);
                let text = '';

                if (emptyKey[key] && utils.zEmpty(val)) {
                    text = emptyKey[key];
                } else if (typeof this[key] === 'function') {
                    text = this[key](val, data);
                }

                text && arr.push({key, text});
            });
            // console.log(arr);

            this.checkErrArr = arr;
            return this.handleInfo(arr);
        }

        handleInfo (arr: IOBJ[]): boolean {
            const text = (arr[0] || {}).text || '';
            this.showToast && text && utils.toast(text, 2);
            return !!text;
        }

        _addRule (key: string, fn: TAddRuleFn): void {
            this[key] = fn;
        }

        bankCard (val: string): string {
            return !/^([1-9]{1})(\d{15}|\d{18})$/.test(val) ? '请输入正确银行卡号' : '';
        }

        phone (val: string): string {
            return !/^1[0-9]{10}$/.test(val) ? '请输入正确手机号' : '';
        }

        idCard (val: string): string {
            return !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val) ? '请输入正确的身份证号' : '';
        }
    }

    return (emptyKey: IOBJ, showToast?: boolean) => {
        return new CheckVal(emptyKey, showToast);
    };
}

/**
 * 创建检验对象
 * @param emptyKey {[key: string]: string}
 * @param showToast 是否显示提示 默认true
 * @returns 检验对象
 */
export const createdCheckVal: TCheckValFun = checkValFun({toast, zEmpty: empty});


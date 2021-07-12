
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utils = {}));
}(this, (function (exports) { 'use strict';

    /**
     * utils 的配置
     *
     * 可配置项包括： message, moment, modal, modalFun
     *
     */
    var utilsConfig = {
        moment: null,
        message: undefined,
        modal: null,
    };

    // 防抖的中心思想在于：我会等你到底。在某段时间内，不管你触发了多少次回调，我都只认最后一次。
    /**
     * 函数防抖
     * @param fn 函数
     * @param interval 间隔
     * @returns 新函数
     */
    var debounce = function (fn, interval) {
        if (interval === void 0) { interval = 300; }
        var t = null;
        return function () {
            var _this = this;
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            // 获取最后的一个参数，是一个对象，有一个 isForceRun 值
            // 提供个强制执行的入口
            var isForceRun = false;
            if (arg && arg.length && typeof arg[0] === 'object') {
                isForceRun = arg[0].isForceRun;
            }
            if (isForceRun) {
                t && clearTimeout(t);
                t = null;
                fn.apply(this, arg);
                return;
            }
            t && clearTimeout(t);
            t = setTimeout(function () {
                fn.apply(_this, arg);
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

    // throttle 的中心思想在于：在某段时间内，不管你触发了多少次回调，我都只认第一次，并在计时结束时给予响应。
    /**
     * 函数节流
     * @param fn 函数
     * @param interval 间隔
     * @returns 新函数
     */
    var throttle = function (fn, interval) {
        if (interval === void 0) { interval = 300; }
        var time = 0;
        return function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            var now = Date.now();
            if (now - time > interval) {
                time = now;
                fn.apply(this, arg);
            }
        };
    };
    // 两种获取this的方式，这种主要在创建新函数时候得到this
    /* export const throttle: TThrottleAndDebounce = function (this: any, fn, interval = 300) {
        let time = 0;

        return (...arg: any[]) => {
            const now = Date.now();

            if (now - time > interval) {
                time = now;
                fn.apply(this, arg);
            }
        };
    }; */

    // Throttle(节流) 和 Debounce(防抖) 结合
    // 主要思路就是，在 长时间不操作或第一次操作 时立马执行，后续的连续操作使用防抖。
    /**
     * 函数节流，加入防抖的优化
     * @param {*} fn 函数
     * @param {*} interval 间隔
     * @returns 新函数
     */
    var throttleD = function (fn, interval) {
        if (interval === void 0) { interval = 300; }
        var t = null;
        var time = 0;
        return function () {
            var _this = this;
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            var now = Date.now();
            if (now - time > interval) {
                t && clearTimeout(t);
                time = now;
                fn.apply(this, arg);
            }
            else {
                t && clearTimeout(t);
                t = setTimeout(function () {
                    time = now;
                    fn.apply(_this, arg);
                    t = null;
                }, interval);
            }
        };
    };
    // 两种获取this的方式，这种主要在创建新函数时候得到this
    /* export const throttleD: TThrottleAndDebounce = function (this: any, fn, interval = 300) {
        let t: any = null;
        let time = 0;

        return (...arg: any[]) => {
            const now = Date.now();

            if (now - time > interval) {
                t && clearTimeout(t);

                time = now;
                fn.apply(this, arg);
            } else {
                t && clearTimeout(t);

                t = setTimeout(() => {
                    time = now;
                    fn.apply(this, arg);
                    t = null;
                }, interval);
            }
        };
    }; */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }
    function __generator(thisArg, body) {
      var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
          f,
          y,
          t,
          g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;

      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }

      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");

        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];

          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;

            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };

            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;

            case 7:
              op = _.ops.pop();

              _.trys.pop();

              continue;

            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }

              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }

              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }

              if (t && _.label < t[2]) {
                _.label = t[2];

                _.ops.push(op);

                break;
              }

              if (t[2]) _.ops.pop();

              _.trys.pop();

              continue;
          }

          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }

        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    }
    function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || from);
    }

    /**
     * 最大数持续并发
     * @param data (() => Promise<void>)[]
     * @returns 结束函数
     */
    var concurrentAjax = function (data) {
        // 结束标识
        var end = false;
        // 最大并发数
        var concurrentNum = 5;
        // 并发数组，和标识
        var taskMap = {};
        var taskData = [];
        var index = 0;
        // 添加任务
        var pushTask = function () {
            if (!data.length || (taskData.length >= concurrentNum) || end)
                return;
            var item = data.shift();
            var key = "" + index++;
            // 包装起来，并加入对应标识，清空作用
            var promise = (function () { return __awaiter(void 0, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // TODO: 报错在外层处理，不放这里
                            return [4 /*yield*/, item()];
                        case 1:
                            // TODO: 报错在外层处理，不放这里
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error(error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/, key];
                    }
                });
            }); })();
            // 重新生成数组
            taskMap[key] = promise;
            taskData = Object.values(taskMap);
            pushTask();
        };
        // 执行并发
        var run = function () { return __awaiter(void 0, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!taskData.length || end)
                            return [2 /*return*/];
                        return [4 /*yield*/, Promise.race(taskData)];
                    case 1:
                        key = _a.sent();
                        // 重新生成数组
                        delete taskMap[key];
                        taskData = Object.values(taskMap);
                        // console.log(taskData)
                        // 切成多个任务队列执行，如果接口使用缓存，会导致线程卡死
                        setTimeout(function () {
                            pushTask();
                            run();
                        }, 100);
                        return [2 /*return*/];
                }
            });
        }); };
        pushTask();
        run();
        return function () {
            end = true;
        };
    };

    /**
     * 弱提示框
     * @param msg 提示内容
     * @param status 1成功  2警告  3错误
     */
    var toast = function (msg, status) {
        var fn = (utilsConfig.message && utilsConfig.message[status || 1]) || window.alert;
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

    /**
     * 判空
     * @param str 值
     * @returns true | false
     */
    var empty = function (str) {
        if (typeof str === 'undefined' || str === null || str === '') {
            return true;
        }
        return false;
    };

    function checkValFun(utils) {
        var CheckVal = /** @class */ (function () {
            function CheckVal(emptyKey, showToast) {
                if (emptyKey === void 0) { emptyKey = {}; }
                if (showToast === void 0) { showToast = true; }
                this.showToast = false;
                this.checkErrArr = [];
                this.emptyKey = {};
                // super();
                this.emptyKey = emptyKey;
                this.showToast = showToast;
            }
            CheckVal.prototype.getErrorInfo = function () {
                return this.checkErrArr;
            };
            // 获取对应的值
            CheckVal.prototype.getVal = function (data, key) {
                var val = data;
                var arrKey = key.split('.');
                try {
                    arrKey.forEach(function (aKey) {
                        val = val[aKey];
                    });
                }
                catch (error) {
                    console.log(error, '数据结构有问题，找不到指定数据');
                }
                return val;
            };
            CheckVal.prototype.run = function (data) {
                var _this = this;
                var emptyKey = this.emptyKey;
                var arr = [];
                // debugger;
                Object.keys(emptyKey).forEach(function (key) {
                    var val = _this.getVal(data, key);
                    var text = '';
                    if (emptyKey[key] && utils.zEmpty(val)) {
                        text = emptyKey[key];
                    }
                    else if (typeof _this[key] === 'function') {
                        text = _this[key](val, data);
                    }
                    text && arr.push({ key: key, text: text });
                });
                // console.log(arr);
                this.checkErrArr = arr;
                return this.handleInfo(arr);
            };
            CheckVal.prototype.handleInfo = function (arr) {
                var text = (arr[0] || {}).text || '';
                this.showToast && text && utils.toast(text, 2);
                return !!text;
            };
            CheckVal.prototype._addRule = function (key, fn) {
                this[key] = fn;
            };
            CheckVal.prototype.bankCard = function (val) {
                return !/^([1-9]{1})(\d{15}|\d{18})$/.test(val) ? '请输入正确银行卡号' : '';
            };
            CheckVal.prototype.phone = function (val) {
                return !/^1[0-9]{10}$/.test(val) ? '请输入正确手机号' : '';
            };
            CheckVal.prototype.idCard = function (val) {
                return !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val) ? '请输入正确的身份证号' : '';
            };
            return CheckVal;
        }());
        return function (emptyKey, showToast) {
            return new CheckVal(emptyKey, showToast);
        };
    }
    /**
     * 创建检验对象
     * @param emptyKey {[key: string]: string}
     * @param showToast 是否显示提示 默认true
     * @returns 检验对象
     */
    var createdCheckVal = checkValFun({ toast: toast, zEmpty: empty });

    /**
     * 确认窗口
     * @param title 标题 | 对象
     * @param content 内容
     * @param force 强制点确认
     * @param arg 其他参数
     * @returns Promise<void>
     */
    var confirm = function (title, content, force) {
        var arg = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            arg[_i - 3] = arguments[_i];
        }
        var fn = utilsConfig.modalFun;
        var modal = utilsConfig.modal;
        if (typeof fn === 'function') {
            return fn.apply(void 0, __spreadArray([title, content, force], arg));
        }
        if (!modal) {
            throw new Error('需要引入 框架modal 才能使用');
        }
        var data = {
            title: title
        };
        if (typeof title === 'object') {
            data = title;
        }
        else {
            data.title = title;
            data.content = content;
            // 把 强制点击确认 和 type 区别开来，上面使用对象可控性就多了
            data.force = force;
            data.force && (data.type = 'info');
        }
        return new Promise(function (rel, rej) {
            var fn = data.type ? modal[data.type] : modal.confirm;
            fn({
                title: data.title,
                content: data.content,
                maskClosable: !data.force,
                cancelText: '取消',
                okText: '确定',
                onOk: function () { return rel(); },
                onCancel: function () { return rej(); },
            });
        });
    };

    /**
     * 复制文本
     * @param str 复制内容
     * @param showToast 复制后是否提示成功
     * @returns Promise<void>
     */
    var copyText = function (str, showToast) {
        var input = document.createElement('textarea');
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

    /**
     * 时间对象
     * @param dateStr 时间字符串
     * @param format 输出格式，默认 y-m-d
     * @returns IDateData | {text: string; textTime: string}
     */
    var dateData = (function () {
        var WEEK_ARR = ['日', '一', '二', '三', '四', '五', '六'];
        var addZero = function (val) {
            return ("" + val).padStart(2, '0');
        };
        return function (dateStr, format) {
            if (format === void 0) { format = 'y-m-d'; }
            if (empty(dateStr)) {
                return { text: dateStr, textTime: dateStr };
            }
            var date = new Date(dateStr);
            if (typeof utilsConfig.moment === 'function') {
                date = new Date(utilsConfig.moment(dateStr).toString());
            }
            var o = {
                y: date.getFullYear(),
                m: addZero(date.getMonth() + 1),
                d: addZero(date.getDate()),
                h: addZero(date.getHours()),
                mm: addZero(date.getMinutes()),
                s: addZero(date.getSeconds()),
                time: date.getTime(),
                week: WEEK_ARR[date.getDay()],
                text: '',
                textTime: '',
            };
            var text = format.replace(/[ymd]/g, function (str) {
                return o[str || ''];
            });
            o.text = text;
            var textTime = (format + " h:M:s").replace(/[ymdhMs]/g, function (str) {
                str === 'M' && (str = 'mm');
                return o[str || ''];
            });
            o.textTime = textTime;
            return o;
        };
    })();

    /**
     * 清空对象里或数组里的空数据
     *
     * @param data 对象 或 数组
     * @param playSort 是否进行排序
     * @returns 新 对象或数组
     */
    var clearJsonEmpty = function (data, playSort) {
        if (playSort === void 0) { playSort = true; }
        if (typeof data !== 'object')
            return data;
        var obj = Array.isArray(data) ? [] : {};
        var keys = playSort ? Object.keys(data).sort() : Object.keys(data);
        keys.forEach(function (key) {
            if (!empty(data[key])) {
                obj[key] = clearJsonEmpty(data[key]);
            }
        });
        return obj;
    };
    /**
     * 数值长度过15的时候，正则匹配转字符串
     *
     * @param str json 字符串
     * @returns 对象
     */
    var handleJsonNumToObj = function (str) {
        var obj = str.replace(/"\w+":\s*\d{15,}/g, function (longVal) {
            var split = longVal.split(':');
            return split[0] + ':' + '"' + split[1].trim() + '"';
        });
        var result = JSON.parse(obj);
        return result;
    };

    /**
     * params 对象
     *
     * key key值
     *
     * point 小数点 默认true
     *
     * negative 负数 默认false
     *
     * precision 精度 默认2
     */
    var isNum = (function isNum(item, key, point, negative, precision) {
        if (point === void 0) { point = true; }
        if (negative === void 0) { negative = false; }
        if (precision === void 0) { precision = 2; }
        var str = item[key];
        if (empty(str))
            return str;
        str = str + '';
        // 去掉非数值
        str = str.replace(/[^\d.-]+/g, '');
        if (point) {
            // 保留两位
            str = str.replace(/(\.\d+)$/, function (val) { return val.substr(0, precision + 1); });
        }
        else {
            // 去掉小数位
            str = str.replace(/(\.\d+)$/, '');
        }
        // let reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
        // 正浮点数，包括0
        var reg = /^\d+(\.\d+)?$/;
        switch (true) {
            case point && negative:
                reg = /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/;
                break;
            case point && !negative:
                reg = /^\d+(\.\d+)?$/;
                break;
            case !point && negative:
                reg = /^([-]?)[0-9]*$/;
                break;
            case !point && !negative:
                reg = /^[0-9]*$/;
                break;
        }
        // console.log(reg)
        // if (!reg.test(str)) {
        //     this.$set(item, key, '');
        // } else {
        //     this.$set(item, key, str);
        // }
        var nVal = !reg.test(str) ? '' : str;
        this.$set && this.$set(item, key, nVal);
        return nVal;
    });

    var jsCopyObj = function (data, cache) {
        if (cache === void 0) { cache = []; }
        // debugger
        if (data === null || typeof data !== 'object') {
            return data;
        }
        // 循环引用
        var find = cache.find(function (i) { return (i.old === data); });
        if (find) {
            return find.obj;
        }
        var obj = Array.isArray(data) ? [] : {};
        cache.push({
            obj: obj,
            old: data
        });
        Object.keys(data).forEach(function (key) {
            obj[key] = jsCopyObj(data[key], cache);
        });
        return obj;
    };

    var getLoadObj = (function () {
        var style = "\n        .load-fixed {\n            position: fixed;\n            top: 0;\n            left: 0;\n            height: 100%;\n            width: 100%;\n            background-color: rgba(0, 0, 0, .5);\n            display: flex;\n            display: -webkit-flex;\n            align-items: center;\n            -webkit-align-items: center;\n            justify-content: center;\n            -webkit-justify-content: center;\n            z-index: 9999;\n        }\n\n        .ant-spin {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n            color: rgba(0, 0, 0, 0.85);\n            font-size: 14px;\n            font-variant: tabular-nums;\n            line-height: 1.5715;\n            list-style: none;\n            font-feature-settings: 'tnum';\n            position: absolute;\n            display: none;\n            color: #1890ff;\n            text-align: center;\n            vertical-align: middle;\n            opacity: 0;\n            transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);\n        }\n\n        .ant-spin-spinning {\n            position: static;\n            display: inline-block;\n            opacity: 1;\n        }\n\n        .ant-spin-nested-loading {\n            position: relative;\n        }\n\n        .ant-spin-nested-loading>div>.ant-spin {\n            position: absolute;\n            top: 0;\n            left: 0;\n            z-index: 4;\n            display: block;\n            width: 100%;\n            height: 100%;\n            max-height: 400px;\n        }\n\n        .ant-spin-nested-loading>div>.ant-spin .ant-spin-dot {\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            margin: -10px;\n        }\n\n        .ant-spin-nested-loading>div>.ant-spin .ant-spin-text {\n            position: absolute;\n            top: 50%;\n            width: 100%;\n            padding-top: 5px;\n            text-shadow: 0 1px 2px #fff;\n        }\n\n        .ant-spin-nested-loading>div>.ant-spin.ant-spin-show-text .ant-spin-dot {\n            margin-top: -20px;\n        }\n\n        .ant-spin-nested-loading>div>.ant-spin-sm .ant-spin-dot {\n            margin: -7px;\n        }\n\n        .ant-spin-nested-loading>div>.ant-spin-sm .ant-spin-text {\n            padding-top: 2px;\n        }\n\n        .ant-spin-nested-loading>div>.ant-spin-sm.ant-spin-show-text .ant-spin-dot {\n            margin-top: -17px;\n        }\n\n        .ant-spin-nested-loading>div>.ant-spin-lg .ant-spin-dot {\n            margin: -16px;\n        }\n\n        .ant-spin-nested-loading>div>.ant-spin-lg .ant-spin-text {\n            padding-top: 11px;\n        }\n\n        .ant-spin-nested-loading>div>.ant-spin-lg.ant-spin-show-text .ant-spin-dot {\n            margin-top: -26px;\n        }\n\n        .ant-spin-container {\n            position: relative;\n            transition: opacity 0.3s;\n        }\n\n        .ant-spin-container::after {\n            position: absolute;\n            top: 0;\n            right: 0;\n            bottom: 0;\n            left: 0;\n            z-index: 10;\n            display: none \\9;\n            width: 100%;\n            height: 100%;\n            background: #fff;\n            opacity: 0;\n            transition: all 0.3s;\n            content: '';\n            pointer-events: none;\n        }\n\n        .ant-spin-blur {\n            clear: both;\n            overflow: hidden;\n            opacity: 0.5;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            pointer-events: none;\n        }\n\n        .ant-spin-blur::after {\n            opacity: 0.4;\n            pointer-events: auto;\n        }\n\n        .ant-spin-tip {\n            color: rgba(0, 0, 0, 0.45);\n        }\n\n        .ant-spin-dot {\n            position: relative;\n            display: inline-block;\n            font-size: 20px;\n            width: 1em;\n            height: 1em;\n        }\n\n        .ant-spin-dot-item {\n            position: absolute;\n            display: block;\n            width: 9px;\n            height: 9px;\n            background-color: #1890ff;\n            border-radius: 100%;\n            transform: scale(0.75);\n            transform-origin: 50% 50%;\n            opacity: 0.3;\n            -webkit-animation: antSpinMove 1s infinite linear alternate;\n            animation: antSpinMove 1s infinite linear alternate;\n        }\n\n        .ant-spin-dot-item:nth-child(1) {\n            top: 0;\n            left: 0;\n        }\n\n        .ant-spin-dot-item:nth-child(2) {\n            top: 0;\n            right: 0;\n            -webkit-animation-delay: 0.4s;\n            animation-delay: 0.4s;\n        }\n\n        .ant-spin-dot-item:nth-child(3) {\n            right: 0;\n            bottom: 0;\n            -webkit-animation-delay: 0.8s;\n            animation-delay: 0.8s;\n        }\n\n        .ant-spin-dot-item:nth-child(4) {\n            bottom: 0;\n            left: 0;\n            -webkit-animation-delay: 1.2s;\n            animation-delay: 1.2s;\n        }\n\n        .ant-spin-dot-spin {\n            transform: rotate(45deg);\n            -webkit-animation: antRotate 1.2s infinite linear;\n            animation: antRotate 1.2s infinite linear;\n        }\n\n        .ant-spin-sm .ant-spin-dot {\n            font-size: 14px;\n        }\n\n        .ant-spin-sm .ant-spin-dot i {\n            width: 6px;\n            height: 6px;\n        }\n\n        .ant-spin-lg .ant-spin-dot {\n            font-size: 32px;\n        }\n\n        .ant-spin-lg .ant-spin-dot i {\n            width: 14px;\n            height: 14px;\n        }\n\n        .ant-spin.ant-spin-show-text .ant-spin-text {\n            display: block;\n        }\n\n        @media all and (-ms-high-contrast: none),\n        (-ms-high-contrast: active) {\n\n            /* IE10+ */\n            .ant-spin-blur {\n                background: #fff;\n                opacity: 0.5;\n            }\n        }\n\n        @-webkit-keyframes antSpinMove {\n            to {\n                opacity: 1;\n            }\n        }\n\n        @keyframes antSpinMove {\n            to {\n                opacity: 1;\n            }\n        }\n\n        @-webkit-keyframes antRotate {\n            to {\n                transform: rotate(405deg);\n            }\n        }\n\n        @keyframes antRotate {\n            to {\n                transform: rotate(405deg);\n            }\n        }\n\n        .ant-spin-rtl {\n            direction: rtl;\n        }\n\n        .ant-spin-rtl .ant-spin-dot-spin {\n            transform: rotate(-45deg);\n            -webkit-animation-name: antRotateRtl;\n            animation-name: antRotateRtl;\n        }\n\n        @-webkit-keyframes antRotateRtl {\n            to {\n                transform: rotate(-405deg);\n            }\n        }\n\n        @keyframes antRotateRtl {\n            to {\n                transform: rotate(-405deg);\n            }\n        }\n    ";
        var element = "\n        <div class=\"load-fixed\" id=\"loadFixed\">\n            <div class=\"ant-spin ant-spin-lg ant-spin-spinning\">\n                <span class=\"ant-spin-dot ant-spin-dot-spin\">\n                    <i class=\"ant-spin-dot-item\"></i>\n                    <i class=\"ant-spin-dot-item\"></i>\n                    <i class=\"ant-spin-dot-item\"></i>\n                    <i class=\"ant-spin-dot-item\"></i>\n                </span>\n            </div>\n        </div>\n    ";
        // es5 不支持
        // class LoadDom extends HTMLElement {
        //     container: Element | null;
        //     constructor () {
        //         super();
        //         const shadowRoot = this.attachShadow({mode: 'open'});
        //         shadowRoot.innerHTML = `<style>${style}</style> ${element}`;
        //         this.container = shadowRoot.querySelector('#loadFixed');
        //     }
        //     control (open: boolean) {
        //         if (!this.container) return;
        //         (this.container as any).style.display = open ? 'flex' : 'none';
        //     }
        // }
        // ts 要报错
        // const LoadDom2 = function (this: any) {
        //     const domFragment = document.createDocumentFragment();
        //     const s = document.createElement('style');
        //     const d = document.createElement('div');
        //     s.innerHTML = style;
        //     d.innerHTML = element;
        //     domFragment.appendChild(s);
        //     domFragment.appendChild(d);
        //     document.body.appendChild(domFragment);
        //     this.container = d;
        // }
        // LoadDom2.prototype.control = function (open: boolean) {
        //     (this.container as any).style.display = open ? 'flex' : 'none';
        // }
        var LoadDom2 = /** @class */ (function () {
            function LoadDom2() {
                var domFragment = document.createDocumentFragment();
                var s = document.createElement('style');
                var d = document.createElement('div');
                s.innerHTML = style;
                d.innerHTML = element;
                domFragment.appendChild(s);
                domFragment.appendChild(d);
                document.body.appendChild(domFragment);
                this.container = d;
            }
            LoadDom2.prototype.control = function (open) {
                this.container.style.display = open ? 'flex' : 'none';
            };
            return LoadDom2;
        }());
        var dom = null;
        return function () {
            if (dom)
                return dom;
            // customElements.define('load-dom', LoadDom);
            // const El = customElements.get('load-dom');
            // const loadDom = dom = new El();
            // document.body.appendChild(loadDom);
            dom = new LoadDom2();
            return dom;
        };
    })();
    /**
     * 弹出loading
     */
    var showLoad = function () {
        var dom = getLoadObj();
        dom.control(true);
    };
    /**
     * 隐藏loading
     */
    var hideLoad = function () {
        var dom = getLoadObj();
        dom.control(false);
    };

    /**
     * 参数序列化 a=1&b=2&c=3
     * @param data 对象
     * @returns a=1&b=2&c=3
     */
    var serialize = function (data) {
        var arr = [];
        for (var i in data) {
            var str = data[i];
            // item && (item = `${item}`.replace(/ /g, '%20'));
            arr.push(i + "=" + (str || ''));
        }
        return arr.join('&');
    };

    /**
     * async/await 阻断执行，默认500ms
     * @param duration 500
     * @returns Promise<void>
     */
    var sleep = function (duration) {
        if (duration === void 0) { duration = 500; }
        if (!duration)
            return Promise.resolve();
        return new Promise(function (rel) {
            setTimeout(function () {
                rel();
            }, duration);
        });
    };

    /**
     * localeStorage 存储
     * @param key 键
     * @param data 值
     */
    var setStorage = function (key, data) {
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
    var getStorage = function (key, defaultValue) {
        var data = window.localStorage.getItem(key);
        try {
            data && (data = JSON.parse(data));
        }
        catch (error) {
        }
        return data || defaultValue;
    };
    /**
     * localeStorage 删除
     * @param key 键
     */
    var removeStorage = function (key) {
        window.localStorage.removeItem(key);
    };

    /**
     * 保留小数点后两位
     * @param val 需要处理的值
     * @param toNum 是否转换为数字 true
     * @param retain 保留位数 2
     * @returns string | number
     */
    var toFixed = function (val, toNum, retain) {
        if (toNum === void 0) { toNum = true; }
        if (retain === void 0) { retain = 2; }
        if (empty(val) || isNaN(val)) {
            val = 0;
        }
        var newVal = (+val).toFixed(retain);
        return toNum ? +newVal : newVal;
    };

    /**
     * ajax 的配置项
     *
     * 可配置项包括： domain, handleUnauthorized, interceptParams, interceptError, interceptHeaders, loadBefore, loadAfter
     *
     */
    var ajaxConfig = {
        domain: {
            apiUrl: ''
        },
    };

    var fileDownload = function (data, filename, mime, bom) {
      var blobData = typeof bom !== 'undefined' ? [bom, data] : [data];
      var blob = new Blob(blobData, {
        type: mime || 'application/octet-stream'
      });

      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were
        // revoked by closing the blob for which they were created.
        // These URLs will no longer resolve as the data backing
        // the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
      } else {
        var blobURL = window.URL && window.URL.createObjectURL ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename); // Safari thinks _blank anchor are pop ups. We only want to set _blank
        // target if the browser does not support the HTML5 download attribute.
        // This allows you to download files in desktop safari if pop up blocking
        // is enabled.

        if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank');
        }

        document.body.appendChild(tempLink);
        tempLink.click(); // Fixes "webkit blob resource error 1"

        setTimeout(function () {
          document.body.removeChild(tempLink);
          window.URL.revokeObjectURL(blobURL);
        }, 200);
      }
    };

    var CacheAjax = /** @class */ (function () {
        function CacheAjax(promiseAjax, cacheMax) {
            this.promiseAjax = promiseAjax;
            this.cacheMax = cacheMax || 10;
            this.cacheData = { count: 0 };
            // this.clearAllCache();
        }
        // 清空缓存
        CacheAjax.prototype.clearAllCache = function () {
            this.cacheData = { count: 0 };
        };
        // 创建key值
        CacheAjax.prototype.createKey = function (data) {
            return typeof data === 'object' ? JSON.stringify(data) : data;
        };
        // 进行存储
        CacheAjax.prototype.wCache = function (index, data) {
            if (this.cacheData.count > this.cacheMax) {
                this.delHead();
            }
            else {
                this.cacheData.count++;
            }
            this.cacheData[index] = data;
        };
        // 读存储
        CacheAjax.prototype.rCache = function (index) {
            return this.cacheData[index];
        };
        // 删除指定存储
        CacheAjax.prototype.dCache = function (index) {
            delete this.cacheData[index];
        };
        // 删除前面的缓存数据
        CacheAjax.prototype.delHead = function () {
            var arr = Object.entries(this.cacheData);
            arr.splice(0, 1);
            var obj = { count: arr.length };
            arr.forEach(function (item) {
                obj[item[0]] = item[1];
            });
            this.cacheData = obj;
        };
        // 判断数据是否过期
        CacheAjax.prototype.isOver = function (data, validityTime) {
            var s = (Date.now() - data.cacheTime) / 1000;
            if (s > 60 * validityTime) {
                return false;
            }
            else {
                return true;
            }
        };
        // 执行
        CacheAjax.prototype.run = function (params, options) {
            var _this = this;
            return new Promise(function (rel, rej) {
                // debugger;
                var key = _this.createKey(params);
                var item = _this.rCache(key);
                var _a = options.isRCache, isRCache = _a === void 0 ? false : _a, _b = options.validityTime, validityTime = _b === void 0 ? 5 : _b;
                delete options.isRCache;
                delete options.validityTime;
                if (isRCache && item && _this.isOver(item, validityTime)) {
                    var data_1 = jsCopyObj(item);
                    data_1.clearCurCache = function () { return _this.dCache(key); };
                    // 切分任务，避免线程卡顿
                    setTimeout(function () {
                        rel(data_1);
                    }, 100);
                }
                else {
                    _this.promiseAjax(params, options).then(function (res) {
                        var data = jsCopyObj(res);
                        data.cacheTime = Date.now();
                        _this.wCache(key, data);
                        res.clearCurCache = function () { return _this.dCache(key); };
                        rel(res);
                    }).catch(function (err) {
                        rej(err);
                    });
                }
            });
        };
        return CacheAjax;
    }());

    var bind = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);

        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }

        return fn.apply(thisArg, args);
      };
    };

    /*global toString:true*/
    // utils is a library of generic helper functions non-specific to axios


    var toString = Object.prototype.toString;
    /**
     * Determine if a value is an Array
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an Array, otherwise false
     */

    function isArray$4(val) {
      return toString.call(val) === '[object Array]';
    }
    /**
     * Determine if a value is undefined
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if the value is undefined, otherwise false
     */


    function isUndefined(val) {
      return typeof val === 'undefined';
    }
    /**
     * Determine if a value is a Buffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Buffer, otherwise false
     */


    function isBuffer$1(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
    }
    /**
     * Determine if a value is an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */


    function isArrayBuffer(val) {
      return toString.call(val) === '[object ArrayBuffer]';
    }
    /**
     * Determine if a value is a FormData
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an FormData, otherwise false
     */


    function isFormData(val) {
      return typeof FormData !== 'undefined' && val instanceof FormData;
    }
    /**
     * Determine if a value is a view on an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
     */


    function isArrayBufferView(val) {
      var result;

      if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }

      return result;
    }
    /**
     * Determine if a value is a String
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a String, otherwise false
     */


    function isString$1(val) {
      return typeof val === 'string';
    }
    /**
     * Determine if a value is a Number
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Number, otherwise false
     */


    function isNumber$1(val) {
      return typeof val === 'number';
    }
    /**
     * Determine if a value is an Object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an Object, otherwise false
     */


    function isObject(val) {
      return val !== null && typeof val === 'object';
    }
    /**
     * Determine if a value is a plain Object
     *
     * @param {Object} val The value to test
     * @return {boolean} True if value is a plain Object, otherwise false
     */


    function isPlainObject(val) {
      if (toString.call(val) !== '[object Object]') {
        return false;
      }

      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    /**
     * Determine if a value is a Date
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Date, otherwise false
     */


    function isDate$1(val) {
      return toString.call(val) === '[object Date]';
    }
    /**
     * Determine if a value is a File
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a File, otherwise false
     */


    function isFile(val) {
      return toString.call(val) === '[object File]';
    }
    /**
     * Determine if a value is a Blob
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Blob, otherwise false
     */


    function isBlob(val) {
      return toString.call(val) === '[object Blob]';
    }
    /**
     * Determine if a value is a Function
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Function, otherwise false
     */


    function isFunction(val) {
      return toString.call(val) === '[object Function]';
    }
    /**
     * Determine if a value is a Stream
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Stream, otherwise false
     */


    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    /**
     * Determine if a value is a URLSearchParams object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a URLSearchParams object, otherwise false
     */


    function isURLSearchParams(val) {
      return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
    }
    /**
     * Trim excess whitespace off the beginning and end of a string
     *
     * @param {String} str The String to trim
     * @returns {String} The String freed of excess whitespace
     */


    function trim(str) {
      return str.replace(/^\s*/, '').replace(/\s*$/, '');
    }
    /**
     * Determine if we're running in a standard browser environment
     *
     * This allows axios to run in a web worker, and react-native.
     * Both environments support XMLHttpRequest, but not fully standard globals.
     *
     * web workers:
     *  typeof window -> undefined
     *  typeof document -> undefined
     *
     * react-native:
     *  navigator.product -> 'ReactNative'
     * nativescript
     *  navigator.product -> 'NativeScript' or 'NS'
     */


    function isStandardBrowserEnv() {
      if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
        return false;
      }

      return typeof window !== 'undefined' && typeof document !== 'undefined';
    }
    /**
     * Iterate over an Array or an Object invoking a function for each item.
     *
     * If `obj` is an Array callback will be called passing
     * the value, index, and complete array for each item.
     *
     * If 'obj' is an Object callback will be called passing
     * the value, key, and complete object for each property.
     *
     * @param {Object|Array} obj The object to iterate
     * @param {Function} fn The callback to invoke for each item
     */


    function forEach(obj, fn) {
      // Don't bother if no value provided
      if (obj === null || typeof obj === 'undefined') {
        return;
      } // Force an array if not already something iterable


      if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
      }

      if (isArray$4(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        // Iterate over object keys
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    /**
     * Accepts varargs expecting each argument to be an object, then
     * immutably merges the properties of each object and returns result.
     *
     * When multiple objects contain the same key the later object in
     * the arguments list will take precedence.
     *
     * Example:
     *
     * ```js
     * var result = merge({foo: 123}, {foo: 456});
     * console.log(result.foo); // outputs 456
     * ```
     *
     * @param {Object} obj1 Object to merge
     * @returns {Object} Result of all merge properties
     */


    function merge$1()
    /* obj1, obj2, obj3, ... */
    {
      var result = {};

      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge$1(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge$1({}, val);
        } else if (isArray$4(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }

      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }

      return result;
    }
    /**
     * Extends object a by mutably adding to it the properties of object b.
     *
     * @param {Object} a The object to be extended
     * @param {Object} b The object to copy properties from
     * @param {Object} thisArg The object to bind function to
     * @return {Object} The resulting value of object a
     */


    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    /**
     * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
     *
     * @param {string} content with BOM
     * @return {string} content value without BOM
     */


    function stripBOM(content) {
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }

      return content;
    }

    var utils$1 = {
      isArray: isArray$4,
      isArrayBuffer: isArrayBuffer,
      isBuffer: isBuffer$1,
      isFormData: isFormData,
      isArrayBufferView: isArrayBufferView,
      isString: isString$1,
      isNumber: isNumber$1,
      isObject: isObject,
      isPlainObject: isPlainObject,
      isUndefined: isUndefined,
      isDate: isDate$1,
      isFile: isFile,
      isBlob: isBlob,
      isFunction: isFunction,
      isStream: isStream,
      isURLSearchParams: isURLSearchParams,
      isStandardBrowserEnv: isStandardBrowserEnv,
      forEach: forEach,
      merge: merge$1,
      extend: extend,
      trim: trim,
      stripBOM: stripBOM
    };

    function encode$1(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
    }
    /**
     * Build a URL by appending params to the end
     *
     * @param {string} url The base of the url (e.g., http://www.google.com)
     * @param {object} [params] The params to be appended
     * @returns {string} The formatted url
     */


    var buildURL = function buildURL(url, params, paramsSerializer) {
      /*eslint no-param-reassign:0*/
      if (!params) {
        return url;
      }

      var serializedParams;

      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils$1.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils$1.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === 'undefined') {
            return;
          }

          if (utils$1.isArray(val)) {
            key = key + '[]';
          } else {
            val = [val];
          }

          utils$1.forEach(val, function parseValue(v) {
            if (utils$1.isDate(v)) {
              v = v.toISOString();
            } else if (utils$1.isObject(v)) {
              v = JSON.stringify(v);
            }

            parts.push(encode$1(key) + '=' + encode$1(v));
          });
        });
        serializedParams = parts.join('&');
      }

      if (serializedParams) {
        var hashmarkIndex = url.indexOf('#');

        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }

        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
      }

      return url;
    };

    function InterceptorManager() {
      this.handlers = [];
    }
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */


    InterceptorManager.prototype.use = function use(fulfilled, rejected) {
      this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected
      });
      return this.handlers.length - 1;
    };
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     */


    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     */


    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils$1.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };

    var InterceptorManager_1 = InterceptorManager;

    /**
     * Transform the data for a request or a response
     *
     * @param {Object|String} data The data to be transformed
     * @param {Array} headers The headers for the request or response
     * @param {Array|Function} fns A single function or Array of functions
     * @returns {*} The resulting transformed data
     */


    var transformData = function transformData(data, headers, fns) {
      /*eslint no-param-reassign:0*/
      utils$1.forEach(fns, function transform(fn) {
        data = fn(data, headers);
      });
      return data;
    };

    var isCancel = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };

    var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
      utils$1.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };

    /**
     * Update an Error with the specified config, error code, and response.
     *
     * @param {Error} error The error to update.
     * @param {Object} config The config.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The error.
     */

    var enhanceError = function enhanceError(error, config, code, request, response) {
      error.config = config;

      if (code) {
        error.code = code;
      }

      error.request = request;
      error.response = response;
      error.isAxiosError = true;

      error.toJSON = function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: this.config,
          code: this.code
        };
      };

      return error;
    };

    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {Object} config The config.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The created error.
     */


    var createError = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };

    /**
     * Resolve or reject a Promise based on response status.
     *
     * @param {Function} resolve A function that resolves the promise.
     * @param {Function} reject A function that rejects the promise.
     * @param {object} response The response.
     */


    var settle = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;

      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
      }
    };

    var cookies = utils$1.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
    function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils$1.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils$1.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils$1.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    }() : // Non standard browser env (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() {
          return null;
        },
        remove: function remove() {}
      };
    }();

    /**
     * Determines whether the specified URL is absolute
     *
     * @param {string} url The URL to test
     * @returns {boolean} True if the specified URL is absolute, otherwise false
     */

    var isAbsoluteURL = function isAbsoluteURL(url) {
      // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
      // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
      // by any combination of letters, digits, plus, period, or hyphen.
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };

    /**
     * Creates a new URL by combining the specified URLs
     *
     * @param {string} baseURL The base URL
     * @param {string} relativeURL The relative URL
     * @returns {string} The combined URL
     */

    var combineURLs = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
    };

    /**
     * Creates a new URL by combining the baseURL with the requestedURL,
     * only when the requestedURL is not already an absolute URL.
     * If the requestURL is absolute, this function returns the requestedURL untouched.
     *
     * @param {string} baseURL The base URL
     * @param {string} requestedURL Absolute or relative URL to combine
     * @returns {string} The combined full path
     */


    var buildFullPath = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }

      return requestedURL;
    };

    // c.f. https://nodejs.org/api/http.html#http_message_headers


    var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
    /**
     * Parse headers into an object
     *
     * ```
     * Date: Wed, 27 Aug 2014 08:58:49 GMT
     * Content-Type: application/json
     * Connection: keep-alive
     * Transfer-Encoding: chunked
     * ```
     *
     * @param {String} headers Headers needing to be parsed
     * @returns {Object} Headers parsed into an object
     */

    var parseHeaders = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;

      if (!headers) {
        return parsed;
      }

      utils$1.forEach(headers.split('\n'), function parser(line) {
        i = line.indexOf(':');
        key = utils$1.trim(line.substr(0, i)).toLowerCase();
        val = utils$1.trim(line.substr(i + 1));

        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }

          if (key === 'set-cookie') {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
          }
        }
      });
      return parsed;
    };

    var isURLSameOrigin = utils$1.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;
      /**
      * Parse a URL to discover it's components
      *
      * @param {String} url The URL to be parsed
      * @returns {Object}
      */

      function resolveURL(url) {
        var href = url;

        if (msie) {
          // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);
      /**
      * Determine if a URL shares the same origin as the current location
      *
      * @param {String} requestURL The URL to test
      * @returns {boolean} True if URL shares the same origin, otherwise false
      */

      return function isURLSameOrigin(requestURL) {
        var parsed = utils$1.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : // Non standard browser envs (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();

    var xhr = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;

        if (utils$1.isFormData(requestData)) {
          delete requestHeaders['Content-Type']; // Let the browser set it
        }

        var request = new XMLHttpRequest(); // HTTP basic authentication

        if (config.auth) {
          var username = config.auth.username || '';
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
          requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }

        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

        request.timeout = config.timeout; // Listen for ready state

        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          } // The request errored out and we didn't get a response, this will be
          // handled by onerror instead
          // With one exception: request that using file: protocol, most browsers
          // will return status as 0 even though it's a successful request


          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
            return;
          } // Prepare the response


          var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config: config,
            request: request
          };
          settle(resolve, reject, response); // Clean up request

          request = null;
        }; // Handle browser request cancellation (as opposed to a manual cancellation)


        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }

          reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

          request = null;
        }; // Handle low level network errors


        request.onerror = function handleError() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject(createError('Network Error', config, null, request)); // Clean up request

          request = null;
        }; // Handle timeout


        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }

          reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request)); // Clean up request

          request = null;
        }; // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.


        if (utils$1.isStandardBrowserEnv()) {
          // Add xsrf header
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        } // Add headers to the request


        if ('setRequestHeader' in request) {
          utils$1.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
              // Remove Content-Type if data is undefined
              delete requestHeaders[key];
            } else {
              // Otherwise add header to the request
              request.setRequestHeader(key, val);
            }
          });
        } // Add withCredentials to request if needed


        if (!utils$1.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        } // Add responseType to request if needed


        if (config.responseType) {
          try {
            request.responseType = config.responseType;
          } catch (e) {
            // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
            // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
            if (config.responseType !== 'json') {
              throw e;
            }
          }
        } // Handle progress if needed


        if (typeof config.onDownloadProgress === 'function') {
          request.addEventListener('progress', config.onDownloadProgress);
        } // Not all browsers support upload events


        if (typeof config.onUploadProgress === 'function' && request.upload) {
          request.upload.addEventListener('progress', config.onUploadProgress);
        }

        if (config.cancelToken) {
          // Handle cancellation
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
              return;
            }

            request.abort();
            reject(cancel); // Clean up request

            request = null;
          });
        }

        if (!requestData) {
          requestData = null;
        } // Send the request


        request.send(requestData);
      });
    };

    var DEFAULT_CONTENT_TYPE = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    function setContentTypeIfUnset(headers, value) {
      if (!utils$1.isUndefined(headers) && utils$1.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = value;
      }
    }

    function getDefaultAdapter() {
      var adapter;

      if (typeof XMLHttpRequest !== 'undefined') {
        // For browsers use XHR adapter
        adapter = xhr;
      } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
        // For node use HTTP adapter
        adapter = xhr;
      }

      return adapter;
    }

    var defaults$2 = {
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, 'Accept');
        normalizeHeaderName(headers, 'Content-Type');

        if (utils$1.isFormData(data) || utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data)) {
          return data;
        }

        if (utils$1.isArrayBufferView(data)) {
          return data.buffer;
        }

        if (utils$1.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
          return data.toString();
        }

        if (utils$1.isObject(data)) {
          setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
          return JSON.stringify(data);
        }

        return data;
      }],
      transformResponse: [function transformResponse(data) {
        /*eslint no-param-reassign:0*/
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch (e) {
            /* Ignore */
          }
        }

        return data;
      }],

      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      }
    };
    defaults$2.headers = {
      common: {
        'Accept': 'application/json, text/plain, */*'
      }
    };
    utils$1.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
      defaults$2.headers[method] = {};
    });
    utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      defaults$2.headers[method] = utils$1.merge(DEFAULT_CONTENT_TYPE);
    });
    var defaults_1 = defaults$2;

    /**
     * Throws a `Cancel` if cancellation has been requested.
     */


    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
    }
    /**
     * Dispatch a request to the server using the configured adapter.
     *
     * @param {object} config The config that is to be used for the request
     * @returns {Promise} The Promise to be fulfilled
     */


    var dispatchRequest = function dispatchRequest(config) {
      throwIfCancellationRequested(config); // Ensure headers exist

      config.headers = config.headers || {}; // Transform request data

      config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

      config.headers = utils$1.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
      utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });
      var adapter = config.adapter || defaults_1.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config); // Transform response data

        response.data = transformData(response.data, response.headers, config.transformResponse);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config); // Transform response data

          if (reason && reason.response) {
            reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
          }
        }

        return Promise.reject(reason);
      });
    };

    /**
     * Config-specific merge-function which creates a new config-object
     * by merging two configuration objects together.
     *
     * @param {Object} config1
     * @param {Object} config2
     * @returns {Object} New object resulting from merging config2 to config1
     */


    var mergeConfig = function mergeConfig(config1, config2) {
      // eslint-disable-next-line no-param-reassign
      config2 = config2 || {};
      var config = {};
      var valueFromConfig2Keys = ['url', 'method', 'data'];
      var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
      var defaultToConfig2Keys = ['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress', 'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'];
      var directMergeKeys = ['validateStatus'];

      function getMergedValue(target, source) {
        if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
          return utils$1.merge(target, source);
        } else if (utils$1.isPlainObject(source)) {
          return utils$1.merge({}, source);
        } else if (utils$1.isArray(source)) {
          return source.slice();
        }

        return source;
      }

      function mergeDeepProperties(prop) {
        if (!utils$1.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (!utils$1.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(undefined, config1[prop]);
        }
      }

      utils$1.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
        if (!utils$1.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(undefined, config2[prop]);
        }
      });
      utils$1.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
      utils$1.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
        if (!utils$1.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(undefined, config2[prop]);
        } else if (!utils$1.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(undefined, config1[prop]);
        }
      });
      utils$1.forEach(directMergeKeys, function merge(prop) {
        if (prop in config2) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          config[prop] = getMergedValue(undefined, config1[prop]);
        }
      });
      var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
      var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
        return axiosKeys.indexOf(key) === -1;
      });
      utils$1.forEach(otherKeys, mergeDeepProperties);
      return config;
    };

    /**
     * Create a new instance of Axios
     *
     * @param {Object} instanceConfig The default config for the instance
     */


    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager_1(),
        response: new InterceptorManager_1()
      };
    }
    /**
     * Dispatch a request
     *
     * @param {Object} config The config specific for this request (merged with this.defaults)
     */


    Axios.prototype.request = function request(config) {
      /*eslint no-param-reassign:0*/
      // Allow for axios('example/url'[, config]) a la fetch API
      if (typeof config === 'string') {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }

      config = mergeConfig(this.defaults, config); // Set config.method

      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = 'get';
      } // Hook up interceptors middleware


      var chain = [dispatchRequest, undefined];
      var promise = Promise.resolve(config);
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });

      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    };

    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
    }; // Provide aliases for supported request methods


    utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function (url, config) {
        return this.request(mergeConfig(config || {}, {
          method: method,
          url: url,
          data: (config || {}).data
        }));
      };
    });
    utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function (url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method: method,
          url: url,
          data: data
        }));
      };
    });
    var Axios_1 = Axios;

    /**
     * A `Cancel` is an object that is thrown when an operation is canceled.
     *
     * @class
     * @param {string=} message The message.
     */

    function Cancel(message) {
      this.message = message;
    }

    Cancel.prototype.toString = function toString() {
      return 'Cancel' + (this.message ? ': ' + this.message : '');
    };

    Cancel.prototype.__CANCEL__ = true;
    var Cancel_1 = Cancel;

    /**
     * A `CancelToken` is an object that can be used to request cancellation of an operation.
     *
     * @class
     * @param {Function} executor The executor function.
     */


    function CancelToken(executor) {
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
      }

      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      executor(function cancel(message) {
        if (token.reason) {
          // Cancellation has already been requested
          return;
        }

        token.reason = new Cancel_1(message);
        resolvePromise(token.reason);
      });
    }
    /**
     * Throws a `Cancel` if cancellation has been requested.
     */


    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */


    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token: token,
        cancel: cancel
      };
    };

    var CancelToken_1 = CancelToken;

    /**
     * Syntactic sugar for invoking a function and expanding an array for arguments.
     *
     * Common use case would be to use `Function.prototype.apply`.
     *
     *  ```js
     *  function f(x, y, z) {}
     *  var args = [1, 2, 3];
     *  f.apply(null, args);
     *  ```
     *
     * With `spread` this example can be re-written.
     *
     *  ```js
     *  spread(function(x, y, z) {})([1, 2, 3]);
     *  ```
     *
     * @param {Function} callback
     * @returns {Function}
     */

    var spread = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };

    /**
     * Determines whether the payload is an error thrown by Axios
     *
     * @param {*} payload The value to test
     * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
     */

    var isAxiosError = function isAxiosError(payload) {
      return typeof payload === 'object' && payload.isAxiosError === true;
    };

    /**
     * Create an instance of Axios
     *
     * @param {Object} defaultConfig The default config for the instance
     * @return {Axios} A new instance of Axios
     */


    function createInstance(defaultConfig) {
      var context = new Axios_1(defaultConfig);
      var instance = bind(Axios_1.prototype.request, context); // Copy axios.prototype to instance

      utils$1.extend(instance, Axios_1.prototype, context); // Copy context to instance

      utils$1.extend(instance, context);
      return instance;
    } // Create the default instance to be exported


    var axios$1 = createInstance(defaults_1); // Expose Axios class to allow class inheritance

    axios$1.Axios = Axios_1; // Factory for creating new instances

    axios$1.create = function create(instanceConfig) {
      return createInstance(mergeConfig(axios$1.defaults, instanceConfig));
    }; // Expose Cancel & CancelToken


    axios$1.Cancel = Cancel_1;
    axios$1.CancelToken = CancelToken_1;
    axios$1.isCancel = isCancel; // Expose all/spread

    axios$1.all = function all(promises) {
      return Promise.all(promises);
    };

    axios$1.spread = spread; // Expose isAxiosError

    axios$1.isAxiosError = isAxiosError;
    var axios_1 = axios$1; // Allow use of default import syntax in TypeScript

    var default_1 = axios$1;
    axios_1.default = default_1;

    var axios = axios_1;

    /* eslint complexity: [2, 18], max-statements: [2, 33] */

    var shams = function hasSymbols() {
      if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
        return false;
      }

      if (typeof Symbol.iterator === 'symbol') {
        return true;
      }

      var obj = {};
      var sym = Symbol('test');
      var symObj = Object(sym);

      if (typeof sym === 'string') {
        return false;
      }

      if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
        return false;
      }

      if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
        return false;
      } // temp disabled per https://github.com/ljharb/object.assign/issues/17
      // if (sym instanceof Symbol) { return false; }
      // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
      // if (!(symObj instanceof Symbol)) { return false; }
      // if (typeof Symbol.prototype.toString !== 'function') { return false; }
      // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }


      var symVal = 42;
      obj[sym] = symVal;

      for (sym in obj) {
        return false;
      } // eslint-disable-line no-restricted-syntax, no-unreachable-loop


      if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
        return false;
      }

      if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }

      var syms = Object.getOwnPropertySymbols(obj);

      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }

      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }

      if (typeof Object.getOwnPropertyDescriptor === 'function') {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);

        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }

      return true;
    };

    var origSymbol = typeof Symbol !== 'undefined' && Symbol;

    var hasSymbols$1 = function hasNativeSymbols() {
      if (typeof origSymbol !== 'function') {
        return false;
      }

      if (typeof Symbol !== 'function') {
        return false;
      }

      if (typeof origSymbol('foo') !== 'symbol') {
        return false;
      }

      if (typeof Symbol('bar') !== 'symbol') {
        return false;
      }

      return shams();
    };

    /* eslint no-invalid-this: 1 */

    var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
    var slice = Array.prototype.slice;
    var toStr$1 = Object.prototype.toString;
    var funcType = '[object Function]';

    var implementation = function bind(that) {
      var target = this;

      if (typeof target !== 'function' || toStr$1.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }

      var args = slice.call(arguments, 1);
      var bound;

      var binder = function () {
        if (this instanceof bound) {
          var result = target.apply(this, args.concat(slice.call(arguments)));

          if (Object(result) === result) {
            return result;
          }

          return this;
        } else {
          return target.apply(that, args.concat(slice.call(arguments)));
        }
      };

      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];

      for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
      }

      bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

      if (target.prototype) {
        var Empty = function Empty() {};

        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }

      return bound;
    };

    var functionBind = Function.prototype.bind || implementation;

    var src = functionBind.call(Function.call, Object.prototype.hasOwnProperty);

    var undefined$1;
    var $SyntaxError = SyntaxError;
    var $Function = Function;
    var $TypeError$1 = TypeError; // eslint-disable-next-line consistent-return

    var getEvalledConstructor = function (expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
      } catch (e) {}
    };

    var $gOPD = Object.getOwnPropertyDescriptor;

    if ($gOPD) {
      try {
        $gOPD({}, '');
      } catch (e) {
        $gOPD = null; // this is IE 8, which has a broken gOPD
      }
    }

    var throwTypeError = function () {
      throw new $TypeError$1();
    };

    var ThrowTypeError = $gOPD ? function () {
      try {
        // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
        arguments.callee; // IE 8 does not throw here

        return throwTypeError;
      } catch (calleeThrows) {
        try {
          // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
          return $gOPD(arguments, 'callee').get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = hasSymbols$1();

    var getProto = Object.getPrototypeOf || function (x) {
      return x.__proto__;
    }; // eslint-disable-line no-proto


    var needsEval = {};
    var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);
    var INTRINSICS = {
      '%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
      '%Array%': Array,
      '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
      '%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined$1,
      '%AsyncFromSyncIteratorPrototype%': undefined$1,
      '%AsyncFunction%': needsEval,
      '%AsyncGenerator%': needsEval,
      '%AsyncGeneratorFunction%': needsEval,
      '%AsyncIteratorPrototype%': needsEval,
      '%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
      '%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
      '%Boolean%': Boolean,
      '%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
      '%Date%': Date,
      '%decodeURI%': decodeURI,
      '%decodeURIComponent%': decodeURIComponent,
      '%encodeURI%': encodeURI,
      '%encodeURIComponent%': encodeURIComponent,
      '%Error%': Error,
      '%eval%': eval,
      // eslint-disable-line no-eval
      '%EvalError%': EvalError,
      '%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
      '%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
      '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
      '%Function%': $Function,
      '%GeneratorFunction%': needsEval,
      '%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
      '%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
      '%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
      '%isFinite%': isFinite,
      '%isNaN%': isNaN,
      '%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
      '%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
      '%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
      '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
      '%Math%': Math,
      '%Number%': Number,
      '%Object%': Object,
      '%parseFloat%': parseFloat,
      '%parseInt%': parseInt,
      '%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
      '%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
      '%RangeError%': RangeError,
      '%ReferenceError%': ReferenceError,
      '%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
      '%RegExp%': RegExp,
      '%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
      '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
      '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
      '%String%': String,
      '%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined$1,
      '%Symbol%': hasSymbols ? Symbol : undefined$1,
      '%SyntaxError%': $SyntaxError,
      '%ThrowTypeError%': ThrowTypeError,
      '%TypedArray%': TypedArray,
      '%TypeError%': $TypeError$1,
      '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
      '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
      '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
      '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
      '%URIError%': URIError,
      '%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
      '%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
      '%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
    };

    var doEval = function doEval(name) {
      var value;

      if (name === '%AsyncFunction%') {
        value = getEvalledConstructor('async function () {}');
      } else if (name === '%GeneratorFunction%') {
        value = getEvalledConstructor('function* () {}');
      } else if (name === '%AsyncGeneratorFunction%') {
        value = getEvalledConstructor('async function* () {}');
      } else if (name === '%AsyncGenerator%') {
        var fn = doEval('%AsyncGeneratorFunction%');

        if (fn) {
          value = fn.prototype;
        }
      } else if (name === '%AsyncIteratorPrototype%') {
        var gen = doEval('%AsyncGenerator%');

        if (gen) {
          value = getProto(gen.prototype);
        }
      }

      INTRINSICS[name] = value;
      return value;
    };

    var LEGACY_ALIASES = {
      '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
      '%ArrayPrototype%': ['Array', 'prototype'],
      '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
      '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
      '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
      '%ArrayProto_values%': ['Array', 'prototype', 'values'],
      '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
      '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
      '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
      '%BooleanPrototype%': ['Boolean', 'prototype'],
      '%DataViewPrototype%': ['DataView', 'prototype'],
      '%DatePrototype%': ['Date', 'prototype'],
      '%ErrorPrototype%': ['Error', 'prototype'],
      '%EvalErrorPrototype%': ['EvalError', 'prototype'],
      '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
      '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
      '%FunctionPrototype%': ['Function', 'prototype'],
      '%Generator%': ['GeneratorFunction', 'prototype'],
      '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
      '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
      '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
      '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
      '%JSONParse%': ['JSON', 'parse'],
      '%JSONStringify%': ['JSON', 'stringify'],
      '%MapPrototype%': ['Map', 'prototype'],
      '%NumberPrototype%': ['Number', 'prototype'],
      '%ObjectPrototype%': ['Object', 'prototype'],
      '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
      '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
      '%PromisePrototype%': ['Promise', 'prototype'],
      '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
      '%Promise_all%': ['Promise', 'all'],
      '%Promise_reject%': ['Promise', 'reject'],
      '%Promise_resolve%': ['Promise', 'resolve'],
      '%RangeErrorPrototype%': ['RangeError', 'prototype'],
      '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
      '%RegExpPrototype%': ['RegExp', 'prototype'],
      '%SetPrototype%': ['Set', 'prototype'],
      '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
      '%StringPrototype%': ['String', 'prototype'],
      '%SymbolPrototype%': ['Symbol', 'prototype'],
      '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
      '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
      '%TypeErrorPrototype%': ['TypeError', 'prototype'],
      '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
      '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
      '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
      '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
      '%URIErrorPrototype%': ['URIError', 'prototype'],
      '%WeakMapPrototype%': ['WeakMap', 'prototype'],
      '%WeakSetPrototype%': ['WeakSet', 'prototype']
    };
    var $concat = functionBind.call(Function.call, Array.prototype.concat);
    var $spliceApply = functionBind.call(Function.apply, Array.prototype.splice);
    var $replace = functionBind.call(Function.call, String.prototype.replace);
    var $strSlice = functionBind.call(Function.call, String.prototype.slice);
    /* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */

    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    /** Used to match backslashes in property paths. */

    var stringToPath = function stringToPath(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);

      if (first === '%' && last !== '%') {
        throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
      } else if (last === '%' && first !== '%') {
        throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
      }

      var result = [];
      $replace(string, rePropName, function (match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
      });
      return result;
    };
    /* end adaptation */


    var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
      var intrinsicName = name;
      var alias;

      if (src(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = '%' + alias[0] + '%';
      }

      if (src(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];

        if (value === needsEval) {
          value = doEval(intrinsicName);
        }

        if (typeof value === 'undefined' && !allowMissing) {
          throw new $TypeError$1('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
        }

        return {
          alias: alias,
          name: intrinsicName,
          value: value
        };
      }

      throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
    };

    var getIntrinsic = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== 'string' || name.length === 0) {
        throw new $TypeError$1('intrinsic name must be a non-empty string');
      }

      if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
        throw new $TypeError$1('"allowMissing" argument must be a boolean');
      }

      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
      var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;

      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }

      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);

        if ((first === '"' || first === "'" || first === '`' || last === '"' || last === "'" || last === '`') && first !== last) {
          throw new $SyntaxError('property names with quotes must have matching quotes');
        }

        if (part === 'constructor' || !isOwn) {
          skipFurtherCaching = true;
        }

        intrinsicBaseName += '.' + part;
        intrinsicRealName = '%' + intrinsicBaseName + '%';

        if (src(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError$1('base intrinsic for ' + name + ' exists, but the property is not available.');
            }

            return void undefined$1;
          }

          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc; // By convention, when a data property is converted to an accessor
            // property to emulate a data property that does not suffer from
            // the override mistake, that accessor's getter is marked with
            // an `originalValue` property. Here, when we detect this, we
            // uphold the illusion by pretending to see that original data
            // property, i.e., returning the value rather than the getter
            // itself.

            if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = src(value, part);
            value = value[part];
          }

          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }

      return value;
    };

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    function getCjsExportFromNamespace (n) {
    	return n && n['default'] || n;
    }

    var callBind = createCommonjsModule(function (module) {

      var $apply = getIntrinsic('%Function.prototype.apply%');
      var $call = getIntrinsic('%Function.prototype.call%');
      var $reflectApply = getIntrinsic('%Reflect.apply%', true) || functionBind.call($call, $apply);
      var $gOPD = getIntrinsic('%Object.getOwnPropertyDescriptor%', true);
      var $defineProperty = getIntrinsic('%Object.defineProperty%', true);
      var $max = getIntrinsic('%Math.max%');

      if ($defineProperty) {
        try {
          $defineProperty({}, 'a', {
            value: 1
          });
        } catch (e) {
          // IE 8 has a broken defineProperty
          $defineProperty = null;
        }
      }

      module.exports = function callBind(originalFunction) {
        var func = $reflectApply(functionBind, $call, arguments);

        if ($gOPD && $defineProperty) {
          var desc = $gOPD(func, 'length');

          if (desc.configurable) {
            // original length, plus the receiver, minus any additional arguments (after the receiver)
            $defineProperty(func, 'length', {
              value: 1 + $max(0, originalFunction.length - (arguments.length - 1))
            });
          }
        }

        return func;
      };

      var applyBind = function applyBind() {
        return $reflectApply(functionBind, $apply, arguments);
      };

      if ($defineProperty) {
        $defineProperty(module.exports, 'apply', {
          value: applyBind
        });
      } else {
        module.exports.apply = applyBind;
      }
    });
    callBind.apply;

    var $indexOf = callBind(getIntrinsic('String.prototype.indexOf'));

    var callBound = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = getIntrinsic(name, !!allowMissing);

      if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
        return callBind(intrinsic);
      }

      return intrinsic;
    };

    var _nodeResolve_empty = {};

    var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': _nodeResolve_empty
    });

    var require$$0 = getCjsExportFromNamespace(_nodeResolve_empty$1);

    var hasMap = typeof Map === 'function' && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === 'function' && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var match = String.prototype.match;
    var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype // eslint-disable-line no-proto
    ? function (O) {
      return O.__proto__; // eslint-disable-line no-proto
    } : null);
    var inspectCustom = require$$0.custom;
    var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;
    var toStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag !== 'undefined' ? Symbol.toStringTag : null;

    var objectInspect = function inspect_(obj, options, depth, seen) {
      var opts = options || {};

      if (has$3(opts, 'quoteStyle') && opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double') {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }

      if (has$3(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number' ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
      }

      var customInspect = has$3(opts, 'customInspect') ? opts.customInspect : true;

      if (typeof customInspect !== 'boolean') {
        throw new TypeError('option "customInspect", if provided, must be `true` or `false`');
      }

      if (has$3(opts, 'indent') && opts.indent !== null && opts.indent !== '\t' && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
        throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
      }

      if (typeof obj === 'undefined') {
        return 'undefined';
      }

      if (obj === null) {
        return 'null';
      }

      if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
      }

      if (typeof obj === 'string') {
        return inspectString(obj, opts);
      }

      if (typeof obj === 'number') {
        if (obj === 0) {
          return Infinity / obj > 0 ? '0' : '-0';
        }

        return String(obj);
      }

      if (typeof obj === 'bigint') {
        return String(obj) + 'n';
      }

      var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;

      if (typeof depth === 'undefined') {
        depth = 0;
      }

      if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return isArray$3(obj) ? '[Array]' : '[Object]';
      }

      var indent = getIndent(opts, depth);

      if (typeof seen === 'undefined') {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
      }

      function inspect(value, from, noIndent) {
        if (from) {
          seen = seen.slice();
          seen.push(from);
        }

        if (noIndent) {
          var newOpts = {
            depth: opts.depth
          };

          if (has$3(opts, 'quoteStyle')) {
            newOpts.quoteStyle = opts.quoteStyle;
          }

          return inspect_(value, newOpts, depth + 1, seen);
        }

        return inspect_(value, opts, depth + 1, seen);
      }

      if (typeof obj === 'function') {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + keys.join(', ') + ' }' : '');
      }

      if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? String(obj).replace(/^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
      }

      if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];

        for (var i = 0; i < attrs.length; i++) {
          s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }

        s += '>';

        if (obj.childNodes && obj.childNodes.length) {
          s += '...';
        }

        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
      }

      if (isArray$3(obj)) {
        if (obj.length === 0) {
          return '[]';
        }

        var xs = arrObjKeys(obj, inspect);

        if (indent && !singleLineValues(xs)) {
          return '[' + indentedJoin(xs, indent) + ']';
        }

        return '[ ' + xs.join(', ') + ' ]';
      }

      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);

        if (parts.length === 0) {
          return '[' + String(obj) + ']';
        }

        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
      }

      if (typeof obj === 'object' && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
          return obj[inspectSymbol]();
        } else if (typeof obj.inspect === 'function') {
          return obj.inspect();
        }
      }

      if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function (value, key) {
          mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
      }

      if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function (value) {
          setParts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), setParts, indent);
      }

      if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
      }

      if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
      }

      if (isWeakRef(obj)) {
        return weakCollectionOf('WeakRef');
      }

      if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
      }

      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }

      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }

      if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
      }

      if (!isDate(obj) && !isRegExp$1(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? '' : 'null prototype';
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? toStr(obj).slice(8, -1) : protoTag ? 'Object' : '';
        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
        var tag = constructorTag + (stringTag || protoTag ? '[' + [].concat(stringTag || [], protoTag || []).join(': ') + '] ' : '');

        if (ys.length === 0) {
          return tag + '{}';
        }

        if (indent) {
          return tag + '{' + indentedJoin(ys, indent) + '}';
        }

        return tag + '{ ' + ys.join(', ') + ' }';
      }

      return String(obj);
    };

    function wrapQuotes(s, defaultStyle, opts) {
      var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
      return quoteChar + s + quoteChar;
    }

    function quote(s) {
      return String(s).replace(/"/g, '&quot;');
    }

    function isArray$3(obj) {
      return toStr(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj));
    }

    function isDate(obj) {
      return toStr(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj));
    }

    function isRegExp$1(obj) {
      return toStr(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj));
    }

    function isError(obj) {
      return toStr(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj));
    }

    function isString(obj) {
      return toStr(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj));
    }

    function isNumber(obj) {
      return toStr(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj));
    }

    function isBoolean(obj) {
      return toStr(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj));
    } // Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives


    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === 'object' && obj instanceof Symbol;
      }

      if (typeof obj === 'symbol') {
        return true;
      }

      if (!obj || typeof obj !== 'object' || !symToString) {
        return false;
      }

      try {
        symToString.call(obj);
        return true;
      } catch (e) {}

      return false;
    }

    function isBigInt(obj) {
      if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
        return false;
      }

      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e) {}

      return false;
    }

    var hasOwn = Object.prototype.hasOwnProperty || function (key) {
      return key in this;
    };

    function has$3(obj, key) {
      return hasOwn.call(obj, key);
    }

    function toStr(obj) {
      return objectToString.call(obj);
    }

    function nameOf(f) {
      if (f.name) {
        return f.name;
      }

      var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);

      if (m) {
        return m[1];
      }

      return null;
    }

    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }

      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) {
          return i;
        }
      }

      return -1;
    }

    function isMap(x) {
      if (!mapSize || !x || typeof x !== 'object') {
        return false;
      }

      try {
        mapSize.call(x);

        try {
          setSize.call(x);
        } catch (s) {
          return true;
        }

        return x instanceof Map; // core-js workaround, pre-v2.5.0
      } catch (e) {}

      return false;
    }

    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
      }

      try {
        weakMapHas.call(x, weakMapHas);

        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s) {
          return true;
        }

        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
      } catch (e) {}

      return false;
    }

    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== 'object') {
        return false;
      }

      try {
        weakRefDeref.call(x);
        return true;
      } catch (e) {}

      return false;
    }

    function isSet(x) {
      if (!setSize || !x || typeof x !== 'object') {
        return false;
      }

      try {
        setSize.call(x);

        try {
          mapSize.call(x);
        } catch (m) {
          return true;
        }

        return x instanceof Set; // core-js workaround, pre-v2.5.0
      } catch (e) {}

      return false;
    }

    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
      }

      try {
        weakSetHas.call(x, weakSetHas);

        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s) {
          return true;
        }

        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
      } catch (e) {}

      return false;
    }

    function isElement(x) {
      if (!x || typeof x !== 'object') {
        return false;
      }

      if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
      }

      return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
    }

    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
        return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
      } // eslint-disable-next-line no-control-regex


      var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
      return wrapQuotes(s, 'single', opts);
    }

    function lowbyte(c) {
      var n = c.charCodeAt(0);
      var x = {
        8: 'b',
        9: 't',
        10: 'n',
        12: 'f',
        13: 'r'
      }[n];

      if (x) {
        return '\\' + x;
      }

      return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16).toUpperCase();
    }

    function markBoxed(str) {
      return 'Object(' + str + ')';
    }

    function weakCollectionOf(type) {
      return type + ' { ? }';
    }

    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(', ');
      return type + ' (' + size + ') {' + joinedEntries + '}';
    }

    function singleLineValues(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], '\n') >= 0) {
          return false;
        }
      }

      return true;
    }

    function getIndent(opts, depth) {
      var baseIndent;

      if (opts.indent === '\t') {
        baseIndent = '\t';
      } else if (typeof opts.indent === 'number' && opts.indent > 0) {
        baseIndent = Array(opts.indent + 1).join(' ');
      } else {
        return null;
      }

      return {
        base: baseIndent,
        prev: Array(depth + 1).join(baseIndent)
      };
    }

    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return '';
      }

      var lineJoiner = '\n' + indent.prev + indent.base;
      return lineJoiner + xs.join(',' + lineJoiner) + '\n' + indent.prev;
    }

    function arrObjKeys(obj, inspect) {
      var isArr = isArray$3(obj);
      var xs = [];

      if (isArr) {
        xs.length = obj.length;

        for (var i = 0; i < obj.length; i++) {
          xs[i] = has$3(obj, i) ? inspect(obj[i], obj) : '';
        }
      }

      var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
      var symMap;

      if (hasShammedSymbols) {
        symMap = {};

        for (var k = 0; k < syms.length; k++) {
          symMap['$' + syms[k]] = syms[k];
        }
      }

      for (var key in obj) {
        // eslint-disable-line no-restricted-syntax
        if (!has$3(obj, key)) {
          continue;
        } // eslint-disable-line no-restricted-syntax, no-continue


        if (isArr && String(Number(key)) === key && key < obj.length) {
          continue;
        } // eslint-disable-line no-restricted-syntax, no-continue


        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
          // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
          continue; // eslint-disable-line no-restricted-syntax, no-continue
        } else if (/[^\w$]/.test(key)) {
          xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
          xs.push(key + ': ' + inspect(obj[key], obj));
        }
      }

      if (typeof gOPS === 'function') {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
          }
        }
      }

      return xs;
    }

    var $TypeError = getIntrinsic('%TypeError%');
    var $WeakMap = getIntrinsic('%WeakMap%', true);
    var $Map = getIntrinsic('%Map%', true);
    var $weakMapGet = callBound('WeakMap.prototype.get', true);
    var $weakMapSet = callBound('WeakMap.prototype.set', true);
    var $weakMapHas = callBound('WeakMap.prototype.has', true);
    var $mapGet = callBound('Map.prototype.get', true);
    var $mapSet = callBound('Map.prototype.set', true);
    var $mapHas = callBound('Map.prototype.has', true);
    /*
     * This function traverses the list returning the node corresponding to the
     * given key.
     *
     * That node is also moved to the head of the list, so that if it's accessed
     * again we don't need to traverse the whole list. By doing so, all the recently
     * used nodes can be accessed relatively quickly.
     */

    var listGetNode = function (list, key) {
      // eslint-disable-line consistent-return
      for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
        if (curr.key === key) {
          prev.next = curr.next;
          curr.next = list.next;
          list.next = curr; // eslint-disable-line no-param-reassign

          return curr;
        }
      }
    };

    var listGet = function (objects, key) {
      var node = listGetNode(objects, key);
      return node && node.value;
    };

    var listSet = function (objects, key, value) {
      var node = listGetNode(objects, key);

      if (node) {
        node.value = value;
      } else {
        // Prepend the new node to the beginning of the list
        objects.next = {
          // eslint-disable-line no-param-reassign
          key: key,
          next: objects.next,
          value: value
        };
      }
    };

    var listHas = function (objects, key) {
      return !!listGetNode(objects, key);
    };

    var sideChannel = function getSideChannel() {
      var $wm;
      var $m;
      var $o;
      var channel = {
        assert: function (key) {
          if (!channel.has(key)) {
            throw new $TypeError('Side channel does not contain ' + objectInspect(key));
          }
        },
        get: function (key) {
          // eslint-disable-line consistent-return
          if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
            if ($wm) {
              return $weakMapGet($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapGet($m, key);
            }
          } else {
            if ($o) {
              // eslint-disable-line no-lonely-if
              return listGet($o, key);
            }
          }
        },
        has: function (key) {
          if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
            if ($wm) {
              return $weakMapHas($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapHas($m, key);
            }
          } else {
            if ($o) {
              // eslint-disable-line no-lonely-if
              return listHas($o, key);
            }
          }

          return false;
        },
        set: function (key, value) {
          if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
            if (!$wm) {
              $wm = new $WeakMap();
            }

            $weakMapSet($wm, key, value);
          } else if ($Map) {
            if (!$m) {
              $m = new $Map();
            }

            $mapSet($m, key, value);
          } else {
            if (!$o) {
              /*
               * Initialize the linked list as an empty node, so that we don't have
               * to special-case handling of the first node: we can always refer to
               * it as (previous node).next, instead of something like (list).head
               */
              $o = {
                key: {},
                next: null
              };
            }

            listSet($o, key, value);
          }
        }
      };
      return channel;
    };

    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: 'RFC1738',
      RFC3986: 'RFC3986'
    };
    var formats = {
      'default': Format.RFC3986,
      formatters: {
        RFC1738: function (value) {
          return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };

    var has$2 = Object.prototype.hasOwnProperty;
    var isArray$2 = Array.isArray;

    var hexTable = function () {
      var array = [];

      for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
      }

      return array;
    }();

    var compactQueue = function compactQueue(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray$2(obj)) {
          var compacted = [];

          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== 'undefined') {
              compacted.push(obj[j]);
            }
          }

          item.obj[item.prop] = compacted;
        }
      }
    };

    var arrayToObject = function arrayToObject(source, options) {
      var obj = options && options.plainObjects ? Object.create(null) : {};

      for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
          obj[i] = source[i];
        }
      }

      return obj;
    };

    var merge = function merge(target, source, options) {
      /* eslint no-param-reassign: 0 */
      if (!source) {
        return target;
      }

      if (typeof source !== 'object') {
        if (isArray$2(target)) {
          target.push(source);
        } else if (target && typeof target === 'object') {
          if (options && (options.plainObjects || options.allowPrototypes) || !has$2.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }

        return target;
      }

      if (!target || typeof target !== 'object') {
        return [target].concat(source);
      }

      var mergeTarget = target;

      if (isArray$2(target) && !isArray$2(source)) {
        mergeTarget = arrayToObject(target, options);
      }

      if (isArray$2(target) && isArray$2(source)) {
        source.forEach(function (item, i) {
          if (has$2.call(target, i)) {
            var targetItem = target[i];

            if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
              target[i] = merge(targetItem, item, options);
            } else {
              target.push(item);
            }
          } else {
            target[i] = item;
          }
        });
        return target;
      }

      return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has$2.call(acc, key)) {
          acc[key] = merge(acc[key], value, options);
        } else {
          acc[key] = value;
        }

        return acc;
      }, mergeTarget);
    };

    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    };

    var decode = function (str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, ' ');

      if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      } // utf-8


      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    };

    var encode = function encode(str, defaultEncoder, charset, kind, format) {
      // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
      // It has been adapted here for stricter adherence to RFC 3986
      if (str.length === 0) {
        return str;
      }

      var string = str;

      if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== 'string') {
        string = String(str);
      }

      if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
          return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
      }

      var out = '';

      for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (c === 0x2D // -
        || c === 0x2E // .
        || c === 0x5F // _
        || c === 0x7E // ~
        || c >= 0x30 && c <= 0x39 // 0-9
        || c >= 0x41 && c <= 0x5A // a-z
        || c >= 0x61 && c <= 0x7A // A-Z
        || format === formats.RFC1738 && (c === 0x28 || c === 0x29) // ( )
        ) {
            out += string.charAt(i);
            continue;
          }

        if (c < 0x80) {
          out = out + hexTable[c];
          continue;
        }

        if (c < 0x800) {
          out = out + (hexTable[0xC0 | c >> 6] + hexTable[0x80 | c & 0x3F]);
          continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
          out = out + (hexTable[0xE0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F]);
          continue;
        }

        i += 1;
        c = 0x10000 + ((c & 0x3FF) << 10 | string.charCodeAt(i) & 0x3FF);
        out += hexTable[0xF0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3F] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F];
      }

      return out;
    };

    var compact = function compact(value) {
      var queue = [{
        obj: {
          o: value
        },
        prop: 'o'
      }];
      var refs = [];

      for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);

        for (var j = 0; j < keys.length; ++j) {
          var key = keys[j];
          var val = obj[key];

          if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
            queue.push({
              obj: obj,
              prop: key
            });
            refs.push(val);
          }
        }
      }

      compactQueue(queue);
      return value;
    };

    var isRegExp = function isRegExp(obj) {
      return Object.prototype.toString.call(obj) === '[object RegExp]';
    };

    var isBuffer = function isBuffer(obj) {
      if (!obj || typeof obj !== 'object') {
        return false;
      }

      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };

    var combine = function combine(a, b) {
      return [].concat(a, b);
    };

    var maybeMap = function maybeMap(val, fn) {
      if (isArray$2(val)) {
        var mapped = [];

        for (var i = 0; i < val.length; i += 1) {
          mapped.push(fn(val[i]));
        }

        return mapped;
      }

      return fn(val);
    };

    var utils = {
      arrayToObject: arrayToObject,
      assign: assign,
      combine: combine,
      compact: compact,
      decode: decode,
      encode: encode,
      isBuffer: isBuffer,
      isRegExp: isRegExp,
      maybeMap: maybeMap,
      merge: merge
    };

    var has$1 = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + '[]';
      },
      comma: 'comma',
      indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
      },
      repeat: function repeat(prefix) {
        return prefix;
      }
    };
    var isArray$1 = Array.isArray;
    var push = Array.prototype.push;

    var pushToArray = function (arr, valueOrArray) {
      push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
    };

    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats['default'];
    var defaults$1 = {
      addQueryPrefix: false,
      allowDots: false,
      charset: 'utf-8',
      charsetSentinel: false,
      delimiter: '&',
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };

    var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
      return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || typeof v === 'symbol' || typeof v === 'bigint';
    };

    var stringify = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel$1) {
      var obj = object;

      if (sideChannel$1.has(object)) {
        throw new RangeError('Cyclic object value');
      }

      if (typeof filter === 'function') {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
        obj = utils.maybeMap(obj, function (value) {
          if (value instanceof Date) {
            return serializeDate(value);
          }

          return value;
        });
      }

      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly ? encoder(prefix, defaults$1.encoder, charset, 'key', format) : prefix;
        }

        obj = '';
      }

      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$1.encoder, charset, 'key', format);
          return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults$1.encoder, charset, 'value', format))];
        }

        return [formatter(prefix) + '=' + formatter(String(obj))];
      }

      var values = [];

      if (typeof obj === 'undefined') {
        return values;
      }

      var objKeys;

      if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
        // we need to join elements in
        objKeys = [{
          value: obj.length > 0 ? obj.join(',') || null : undefined
        }];
      } else if (isArray$1(filter)) {
        objKeys = filter;
      } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
      }

      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        var value = typeof key === 'object' && key.value !== undefined ? key.value : obj[key];

        if (skipNulls && value === null) {
          continue;
        }

        var keyPrefix = isArray$1(obj) ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix : prefix + (allowDots ? '.' + key : '[' + key + ']');
        sideChannel$1.set(object, true);
        var valueSideChannel = sideChannel();
        pushToArray(values, stringify(value, keyPrefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, valueSideChannel));
      }

      return values;
    };

    var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
      if (!opts) {
        return defaults$1;
      }

      if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
      }

      var charset = opts.charset || defaults$1.charset;

      if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
      }

      var format = formats['default'];

      if (typeof opts.format !== 'undefined') {
        if (!has$1.call(formats.formatters, opts.format)) {
          throw new TypeError('Unknown format option provided.');
        }

        format = opts.format;
      }

      var formatter = formats.formatters[format];
      var filter = defaults$1.filter;

      if (typeof opts.filter === 'function' || isArray$1(opts.filter)) {
        filter = opts.filter;
      }

      return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults$1.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults$1.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults$1.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults$1.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults$1.encodeValuesOnly,
        filter: filter,
        format: format,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults$1.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults$1.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
      };
    };

    var stringify_1 = function (object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;

      if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
      } else if (isArray$1(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }

      var keys = [];

      if (typeof obj !== 'object' || obj === null) {
        return '';
      }

      var arrayFormat;

      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
      } else {
        arrayFormat = 'indices';
      }

      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

      if (!objKeys) {
        objKeys = Object.keys(obj);
      }

      if (options.sort) {
        objKeys.sort(options.sort);
      }

      var sideChannel$1 = sideChannel();

      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
          continue;
        }

        pushToArray(keys, stringify(obj[key], key, generateArrayPrefix, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.format, options.formatter, options.encodeValuesOnly, options.charset, sideChannel$1));
      }

      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? '?' : '';

      if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
          // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
          prefix += 'utf8=%26%2310003%3B&';
        } else {
          // encodeURIComponent('✓')
          prefix += 'utf8=%E2%9C%93&';
        }
      }

      return joined.length > 0 ? prefix + joined : '';
    };

    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowPrototypes: false,
      allowSparse: false,
      arrayLimit: 20,
      charset: 'utf-8',
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: '&',
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1000,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
    };

    var interpretNumericEntities = function (str) {
      return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };

    var parseArrayValue = function (val, options) {
      if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
      }

      return val;
    }; // This is what browsers will submit when the ✓ character occurs in an
    // application/x-www-form-urlencoded body and the encoding of the page containing
    // the form is iso-8859-1, or when the submitted form has an accept-charset
    // attribute of iso-8859-1. Presumably also with other charsets that do not contain
    // the ✓ character, such as us-ascii.


    var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')
    // These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.

    var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

    var parseValues = function parseQueryStringValues(str, options) {
      var obj = {};
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
      var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1; // Keep track of where the utf8 sentinel was found

      var i;
      var charset = options.charset;

      if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
          if (parts[i].indexOf('utf8=') === 0) {
            if (parts[i] === charsetSentinel) {
              charset = 'utf-8';
            } else if (parts[i] === isoSentinel) {
              charset = 'iso-8859-1';
            }

            skipIndex = i;
            i = parts.length; // The eslint settings do not allow break;
          }
        }
      }

      for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
          continue;
        }

        var part = parts[i];
        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;
        var key, val;

        if (pos === -1) {
          key = options.decoder(part, defaults.decoder, charset, 'key');
          val = options.strictNullHandling ? null : '';
        } else {
          key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
          val = utils.maybeMap(parseArrayValue(part.slice(pos + 1), options), function (encodedVal) {
            return options.decoder(encodedVal, defaults.decoder, charset, 'value');
          });
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
          val = interpretNumericEntities(val);
        }

        if (part.indexOf('[]=') > -1) {
          val = isArray(val) ? [val] : val;
        }

        if (has.call(obj, key)) {
          obj[key] = utils.combine(obj[key], val);
        } else {
          obj[key] = val;
        }
      }

      return obj;
    };

    var parseObject = function (chain, val, options, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options);

      for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
          obj = [].concat(leaf);
        } else {
          obj = options.plainObjects ? Object.create(null) : {};
          var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
          var index = parseInt(cleanRoot, 10);

          if (!options.parseArrays && cleanRoot === '') {
            obj = {
              0: leaf
            };
          } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {
            obj = [];
            obj[index] = leaf;
          } else {
            obj[cleanRoot] = leaf;
          }
        }

        leaf = obj;
      }

      return leaf;
    };

    var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
        return;
      } // Transform dot notation to bracket notation


      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey; // The regex chunks

      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g; // Get the parent

      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key; // Stash the parent if it exists

      var keys = [];

      if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }

        keys.push(parent);
      } // Loop through children appending to the array until we hit depth


      var i = 0;

      while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;

        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options.allowPrototypes) {
            return;
          }
        }

        keys.push(segment[1]);
      } // If there's a remainder, just add whatever is left


      if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
      }

      return parseObject(keys, val, options, valuesParsed);
    };

    var normalizeParseOptions = function normalizeParseOptions(opts) {
      if (!opts) {
        return defaults;
      }

      if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
      }

      if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
      }

      var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;
      return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: typeof opts.depth === 'number' || opts.depth === false ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };

    var parse = function (str, opts) {
      var options = normalizeParseOptions(opts);

      if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
      }

      var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
      var obj = options.plainObjects ? Object.create(null) : {}; // Iterate over the keys and setup the new object

      var keys = Object.keys(tempObj);

      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
      }

      if (options.allowSparse === true) {
        return obj;
      }

      return utils.compact(obj);
    };

    var lib = {
      formats: formats,
      parse: parse,
      stringify: stringify_1
    };

    // 执行中的ajax
    var executionAjax = {};
    /**
     * 通过请求接口参数 获取对应的请求头 以及请求参数处理函数
     * @param action 一个标志
     */
    var action = function (action) {
        var contentType = null;
        var handleRequest = null;
        switch (action) {
            case 'form':
                contentType = 'application/x-www-form-urlencoded;charset=UTF-8';
                handleRequest = function (data) {
                    return lib.stringify(data);
                };
                break;
            case 'formData':
                contentType = 'multipart/form-data';
                handleRequest = function (data) {
                    return data;
                };
                break;
            default:
                contentType = 'application/json;charset=UTF-8';
                handleRequest = function (data) {
                    return JSON.stringify(data);
                };
                break;
        }
        return { contentType: contentType, handleRequest: handleRequest };
    };
    /**
     * 初次封装，只处理请求头和参数回调，以及处理是否打断上一次请求
     * @param url 路径
     * @param params 请求参数
     * @param options 其它参数
     */
    var get$1 = function (url, params, options) {
        var method = options.method, _a = options.noCloseBeforeAjax, noCloseBeforeAjax = _a === void 0 ? false : _a, resType = options.resType;
        var _b = action(options.action), contentType = _b.contentType, handleRequest = _b.handleRequest;
        var isBlob = resType === 'blob';
        var interceptHeaders = ajaxConfig.interceptHeaders;
        var headers = {
            'Content-Type': contentType,
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            // 'Content-Type': 'application/json; charset=utf-8',
            // 'Access-Control-Allow-Origin': '*',
        };
        typeof interceptHeaders === 'function' && interceptHeaders(headers, options);
        return new Promise(function (resolve, reject) {
            if (!noCloseBeforeAjax && typeof executionAjax[url] === 'function') {
                // console.warn('打断之前请求');
                executionAjax[url]();
            }
            executionAjax[url] = null;
            var getParams = options.params || (method === 'get' ? params : {});
            var data = {
                headers: headers,
                method: method,
                url: url,
                params: getParams,
                data: params || {},
                timeout: 1000 * 60 * 12,
                transformRequest: [function (data) {
                        return handleRequest(data);
                    }],
                transformResponse: [function (res) {
                        executionAjax[url] = null;
                        try {
                            var str = res;
                            if (typeof res === 'string') {
                                // 把15位数值 转为字符串
                                // str = str.replace(/"\w+":\s*\d{15,}/g, (longVal: string) => {
                                //     const split = longVal.split(':');
                                //     return split[0] + ':' + '"' + split[1].trim() + '"';
                                // });
                                // str = JSON.parse(str);
                                str = handleJsonNumToObj(str);
                            }
                            return str;
                        }
                        catch (error) {
                            return res;
                        }
                    }],
                cancelToken: new axios.CancelToken(function (c) {
                    executionAjax[url] = c;
                })
            };
            if (isBlob) {
                data.responseType = 'blob';
            }
            axios(data).finally(function () {
                executionAjax[url] = null;
            }).then(function (res) {
                var data = res.data;
                // 返回参数
                var returnData = function (resData) {
                    if (resData.status === 'success') {
                        resolve(resData);
                    }
                    else {
                        reject({ type: 'thenError', data: resData, oldRes: res });
                    }
                };
                // console.log(res);
                if (isBlob && data instanceof Blob && data.type === 'application/json') {
                    // 处理返回是 json 的数据
                    // blob 转 json
                    var reader_1 = new FileReader();
                    var errorFun_1 = function () {
                        returnData(data);
                    };
                    reader_1.readAsText(data, 'utf-8');
                    reader_1.onload = function () {
                        // console.log(reader.result);
                        try {
                            var strToObj = JSON.parse(reader_1.result);
                            returnData(strToObj);
                        }
                        catch (error) {
                            errorFun_1();
                        }
                    };
                    reader_1.onerror = errorFun_1;
                }
                else if (isBlob && data instanceof Blob) {
                    // 文件流的时候，从响应头里获取文件名字，然后会把名字挂到 blob对象上
                    var filename = '';
                    try {
                        var str = res.headers['content-disposition'];
                        filename = lib.parse(str.replace(/; /g, '&')).filename;
                        data.filename = filename;
                    }
                    catch (error) {
                        console.log(error);
                    }
                    data = {
                        status: 'success',
                        data: data,
                        message: '',
                        timestamp: 0,
                    };
                    returnData(data);
                }
                else {
                    returnData(data);
                }
            }).catch(function (error) {
                if (!axios.isCancel(error)) {
                    reject({ type: 'catchError', data: error });
                }
            });
        });
    };

    var cacheData = {};
    var ajaxErr = [
        { key: 'timeout of', text: '请求超时，请稍后...' },
        { key: '404', text: '请求地址有误' },
    ];
    var unauthorizedLink = debounce(function (data) {
        // console.log(1, data);
        // store.dispatch('userData/loginLink', data);
        var handleUnauthorized = ajaxConfig.handleUnauthorized;
        typeof handleUnauthorized === 'function' && handleUnauthorized(data);
    }, 600);
    var handleError = function (err) {
        // console.log(err);
        var type = err.type, data = err.data;
        var errorText = '服务器异常';
        var item = null;
        // console.log(data.message);
        switch (true) {
            case type === 'catchError':
                item = ajaxErr.find(function (ii) { return ~(data.message || data.errMsg || '').indexOf(ii.key); });
                item && (errorText = item.text);
                break;
            case type === 'thenError' && data.status === 'unauthorized':
                errorText = 'unauthorized';
                unauthorizedLink(err);
                break;
            case type === 'thenError' && (!!data.resultMsg || !!data.message):
                errorText = data.resultMsg || data.message;
                break;
        }
        return errorText;
    };
    var handleParams = function (params, options) {
        var interceptParams = ajaxConfig.interceptParams;
        if (typeof interceptParams === 'function') {
            params = interceptParams(params, options);
        }
        else {
            params = clearJsonEmpty(params, false);
        }
        return params;
    };
    function ajax1(url, params, options) {
        var closeErrorTips = options.closeErrorTips, resType = options.resType, fileFullName = options.fileFullName, blobNoAutoDownload = options.blobNoAutoDownload;
        var isBlob = resType === 'blob';
        var conveyor = {};
        var loadBefore = ajaxConfig.loadBefore, loadAfter = ajaxConfig.loadAfter, interceptError = ajaxConfig.interceptError;
        params = handleParams(params, options);
        typeof loadBefore === 'function' && loadBefore(options, conveyor);
        return new Promise(function (rel, rej) {
            get$1(url, params, options).finally(function () {
                typeof loadAfter === 'function' && loadAfter(options, conveyor, 'finally');
            }).then(function (res) {
                typeof loadAfter === 'function' && loadAfter(options, conveyor, 'then');
                if (isBlob) {
                    var filename = res.data.filename;
                    !blobNoAutoDownload && fileDownload(res.data, fileFullName || filename || '');
                }
                rel(res);
            }).catch(function (err) {
                typeof loadAfter === 'function' && loadAfter(options, conveyor, 'catch');
                console.error(err);
                if (typeof interceptError === 'function') {
                    interceptError(err, options);
                    return;
                }
                var text = handleError(err);
                if (text === 'unauthorized') {
                    return;
                }
                if (!closeErrorTips) {
                    // 提示
                    text && toast(text, 3);
                }
                rej(err);
            });
        });
    }
    // 加上缓存功能
    function ajax2(url, params, options) {
        var domain = ajaxConfig.domain;
        var targetDomain = options.targetDomain;
        var baseUrl = domain[targetDomain || 'apiUrl'];
        url = baseUrl + url;
        var cacheKey = url;
        // const cacheKey = `${url}${JSON.stringify(params)}`;
        var cacheObj = cacheData[cacheKey];
        if (!cacheObj) {
            cacheObj = new CacheAjax(function (params, options) {
                delete params._URL;
                return ajax1(url, params, options);
            }, 20);
        }
        params._URL = url;
        cacheData[cacheKey] = cacheObj;
        return cacheObj.run(params, options);
    }

    var apiGet = function (url, params, options) {
        params = params || {};
        options = options || {};
        options.method = 'get';
        options.targetDomain = options.targetDomain || '';
        return ajax2(url, params, options);
    };
    var apiPost = function (url, params, options) {
        params = params || {};
        options = options || {};
        options.method = 'post';
        options.targetDomain = options.targetDomain || '';
        return ajax2(url, params, options);
    };
    var apiPut = function (url, params, options) {
        params = params || {};
        options = options || {};
        options.method = 'put';
        options.targetDomain = options.targetDomain || '';
        return ajax2(url, params, options);
    };
    var apiDel = function (url, params, options) {
        params = params || {};
        options = options || {};
        options.method = 'delete';
        options.targetDomain = options.targetDomain || '';
        return ajax2(url, params, options);
    };
    var get = ajax2;

    exports.ajaxConfig = ajaxConfig;
    exports.apiDel = apiDel;
    exports.apiGet = apiGet;
    exports.apiPost = apiPost;
    exports.apiPut = apiPut;
    exports.clearJsonEmpty = clearJsonEmpty;
    exports.concurrentAjax = concurrentAjax;
    exports.confirm = confirm;
    exports.copyText = copyText;
    exports.createdCheckVal = createdCheckVal;
    exports.dateData = dateData;
    exports.debounce = debounce;
    exports.empty = empty;
    exports.get = get;
    exports.getStorage = getStorage;
    exports.handleJsonNumToObj = handleJsonNumToObj;
    exports.hideLoad = hideLoad;
    exports.isNum = isNum;
    exports.jsCopyObj = jsCopyObj;
    exports.removeStorage = removeStorage;
    exports.serialize = serialize;
    exports.setStorage = setStorage;
    exports.showLoad = showLoad;
    exports.sleep = sleep;
    exports.throttle = throttle;
    exports.throttleD = throttleD;
    exports.toFixed = toFixed;
    exports.toast = toast;
    exports.utilsConfig = utilsConfig;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

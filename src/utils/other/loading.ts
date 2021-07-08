
const getLoadObj = (() => {

    const style = `
        .load-fixed {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, .5);
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            justify-content: center;
            -webkit-justify-content: center;
            z-index: 9999;
        }

        .ant-spin {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            color: rgba(0, 0, 0, 0.85);
            font-size: 14px;
            font-variant: tabular-nums;
            line-height: 1.5715;
            list-style: none;
            font-feature-settings: 'tnum';
            position: absolute;
            display: none;
            color: #1890ff;
            text-align: center;
            vertical-align: middle;
            opacity: 0;
            transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        }

        .ant-spin-spinning {
            position: static;
            display: inline-block;
            opacity: 1;
        }

        .ant-spin-nested-loading {
            position: relative;
        }

        .ant-spin-nested-loading>div>.ant-spin {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 4;
            display: block;
            width: 100%;
            height: 100%;
            max-height: 400px;
        }

        .ant-spin-nested-loading>div>.ant-spin .ant-spin-dot {
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -10px;
        }

        .ant-spin-nested-loading>div>.ant-spin .ant-spin-text {
            position: absolute;
            top: 50%;
            width: 100%;
            padding-top: 5px;
            text-shadow: 0 1px 2px #fff;
        }

        .ant-spin-nested-loading>div>.ant-spin.ant-spin-show-text .ant-spin-dot {
            margin-top: -20px;
        }

        .ant-spin-nested-loading>div>.ant-spin-sm .ant-spin-dot {
            margin: -7px;
        }

        .ant-spin-nested-loading>div>.ant-spin-sm .ant-spin-text {
            padding-top: 2px;
        }

        .ant-spin-nested-loading>div>.ant-spin-sm.ant-spin-show-text .ant-spin-dot {
            margin-top: -17px;
        }

        .ant-spin-nested-loading>div>.ant-spin-lg .ant-spin-dot {
            margin: -16px;
        }

        .ant-spin-nested-loading>div>.ant-spin-lg .ant-spin-text {
            padding-top: 11px;
        }

        .ant-spin-nested-loading>div>.ant-spin-lg.ant-spin-show-text .ant-spin-dot {
            margin-top: -26px;
        }

        .ant-spin-container {
            position: relative;
            transition: opacity 0.3s;
        }

        .ant-spin-container::after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 10;
            display: none \\9;
            width: 100%;
            height: 100%;
            background: #fff;
            opacity: 0;
            transition: all 0.3s;
            content: '';
            pointer-events: none;
        }

        .ant-spin-blur {
            clear: both;
            overflow: hidden;
            opacity: 0.5;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            pointer-events: none;
        }

        .ant-spin-blur::after {
            opacity: 0.4;
            pointer-events: auto;
        }

        .ant-spin-tip {
            color: rgba(0, 0, 0, 0.45);
        }

        .ant-spin-dot {
            position: relative;
            display: inline-block;
            font-size: 20px;
            width: 1em;
            height: 1em;
        }

        .ant-spin-dot-item {
            position: absolute;
            display: block;
            width: 9px;
            height: 9px;
            background-color: #1890ff;
            border-radius: 100%;
            transform: scale(0.75);
            transform-origin: 50% 50%;
            opacity: 0.3;
            -webkit-animation: antSpinMove 1s infinite linear alternate;
            animation: antSpinMove 1s infinite linear alternate;
        }

        .ant-spin-dot-item:nth-child(1) {
            top: 0;
            left: 0;
        }

        .ant-spin-dot-item:nth-child(2) {
            top: 0;
            right: 0;
            -webkit-animation-delay: 0.4s;
            animation-delay: 0.4s;
        }

        .ant-spin-dot-item:nth-child(3) {
            right: 0;
            bottom: 0;
            -webkit-animation-delay: 0.8s;
            animation-delay: 0.8s;
        }

        .ant-spin-dot-item:nth-child(4) {
            bottom: 0;
            left: 0;
            -webkit-animation-delay: 1.2s;
            animation-delay: 1.2s;
        }

        .ant-spin-dot-spin {
            transform: rotate(45deg);
            -webkit-animation: antRotate 1.2s infinite linear;
            animation: antRotate 1.2s infinite linear;
        }

        .ant-spin-sm .ant-spin-dot {
            font-size: 14px;
        }

        .ant-spin-sm .ant-spin-dot i {
            width: 6px;
            height: 6px;
        }

        .ant-spin-lg .ant-spin-dot {
            font-size: 32px;
        }

        .ant-spin-lg .ant-spin-dot i {
            width: 14px;
            height: 14px;
        }

        .ant-spin.ant-spin-show-text .ant-spin-text {
            display: block;
        }

        @media all and (-ms-high-contrast: none),
        (-ms-high-contrast: active) {

            /* IE10+ */
            .ant-spin-blur {
                background: #fff;
                opacity: 0.5;
            }
        }

        @-webkit-keyframes antSpinMove {
            to {
                opacity: 1;
            }
        }

        @keyframes antSpinMove {
            to {
                opacity: 1;
            }
        }

        @-webkit-keyframes antRotate {
            to {
                transform: rotate(405deg);
            }
        }

        @keyframes antRotate {
            to {
                transform: rotate(405deg);
            }
        }

        .ant-spin-rtl {
            direction: rtl;
        }

        .ant-spin-rtl .ant-spin-dot-spin {
            transform: rotate(-45deg);
            -webkit-animation-name: antRotateRtl;
            animation-name: antRotateRtl;
        }

        @-webkit-keyframes antRotateRtl {
            to {
                transform: rotate(-405deg);
            }
        }

        @keyframes antRotateRtl {
            to {
                transform: rotate(-405deg);
            }
        }
    `;

    const element = `
        <div class="load-fixed" id="loadFixed">
            <div class="ant-spin ant-spin-lg ant-spin-spinning">
                <span class="ant-spin-dot ant-spin-dot-spin">
                    <i class="ant-spin-dot-item"></i>
                    <i class="ant-spin-dot-item"></i>
                    <i class="ant-spin-dot-item"></i>
                    <i class="ant-spin-dot-item"></i>
                </span>
            </div>
        </div>
    `;

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

    class LoadDom2 {
        container: Element | null;

        constructor () {
            const domFragment = document.createDocumentFragment();
            const s = document.createElement('style');
            const d = document.createElement('div');
            s.innerHTML = style;
            d.innerHTML = element;
            domFragment.appendChild(s);
            domFragment.appendChild(d);
            document.body.appendChild(domFragment);
            this.container = d;
        }

        control (open: boolean) {
            (this.container as any).style.display = open ? 'flex' : 'none';
        }
    }

    let dom: any = null;

    return () => {
        if (dom) return dom;

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
export const showLoad = () => {
    const dom = getLoadObj();
    dom.control(true);
};

/**
 * 隐藏loading
 */
export const hideLoad = () => {
    const dom = getLoadObj();
    dom.control(false);
};


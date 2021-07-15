import path from 'path';

const isBuild = process.env.NODE_ENV === 'production';

export const pageFull = (url) => {
    return path.resolve('./', url);
};

// 需要生成的文件
const inAndOut = () => {
    // 主文件
    const mainFile = pageFull('src/main.ts');
    // 输出文件名
    const fileName = 'common-utils';
    // 输出类型
    const format = ['umd', 'es'];
    // 类型所对应的固定参数
    const map = {
        umd: {
            sourcemap: true,
            format: 'umd',
            name: 'utils',
        },
        es: {
            sourcemap: true,
            format: 'es',
        }
    };
    const arr = [];

    format.forEach((key) => {
        const old = map[key];
        // 一个未压缩，一个压缩
        arr.push(
            {
                input: mainFile,
                output: Object.assign({}, old, {
                    file: pageFull(`dist/${fileName}-${key}.js`),
                    sourcemap: false,
                })
            }
        );

        arr.push({
            input: mainFile,
            output: Object.assign({}, old, {
                file: pageFull(`dist/${fileName}-${key}-min.js`),
            })
        });
    });

    return arr;
};

// 调试用 模板文件
export const templateStr = (() => {
    const devScript = '<script src="http://localhost:35729/livereload.js?snipver=1"></script>';
    return `
        <!DOCTYPE html>
        <html >
            <head>
                <title></title>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                打开控制台调试
                ${isBuild ? '' : devScript}
                <script src="./common-utils-umd.js"></script>
            </body>
        </html>
    `;
})();

export default inAndOut();

import path from 'path';

const isBuild = process.env.NODE_ENV === 'production';

export const pageFull = (url) => {
    return path.resolve('./', url);
};

const inAndOut = () => {
    const mainFile = pageFull('src/main.ts');
    const fileName = 'common-utils';
    const format = ['umd', 'es'];
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
        arr.push(
            {
                input: mainFile,
                output: {
                    ...old,
                    file: pageFull(`dist/${fileName}-${key}.js`),
                    sourcemap: false,
                }
            },
            {
                input: mainFile,
                output: {
                    ...old,
                    file: pageFull(`dist/${fileName}-${key}-min.js`),
                }
            }
        );
    });

    return arr;
};

// 模板文件
export const templateStr = (() => {
    const devScript = '<script src="http://localhost:35729/livereload.js?snipver=1"></script>';
    return `
        <!DOCTYPE html>
        <html >
            <head>
                <title></title>
            </head>
            <body>
                ${isBuild ? '' : devScript}
                <script src="./common-utils-umd.js"></script>
            </body>
        </html>
    `;
})();

export default inAndOut();

// https://rollupjs.org/guide/zh/#faqs
// https://www.cnblogs.com/tugenhua0707/p/8179686.html#_labe5

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import clear from 'rollup-plugin-clear';
import {uglify} from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

// https://github.com/rollup/plugins/tree/master/packages/json
import json from '@rollup/plugin-json';

// https://github.com/rollup/plugins/tree/master/packages/typescript
import typescript from '@rollup/plugin-typescript';

// https://github.com/rollup/plugins/tree/master/packages/html
import html from '@rollup/plugin-html';

// https://github.com/rollup/plugins/tree/master/packages/eslint
// import eslint from '@rollup/plugin-eslint';

// https://github.com/rollup/plugins/tree/master/packages/replace
// import replace from '@rollup/plugin-replace';

// https://github.com/rollup/plugins/tree/master/packages/babel
import {babel} from '@rollup/plugin-babel';

// https://github.com/rollup/plugins/tree/master/packages/run
// import run from '@rollup/plugin-run';

// https://blog.csdn.net/qq_41163341/article/details/108739976
// less

const isBuild = process.env.NODE_ENV === 'production';
// console.log(process);
const envConfig = (() => {
    const devScript = '<script src="http://localhost:35729/livereload.js?snipver=1"></script>';
    const devPlugins = [
        serve({
            open: true, // 是否打开浏览器
            contentBase: './dist', // 入口html的文件位置
            historyApiFallback: true, // Set to true to return index.html instead of 404
            host: 'localhost',
            port: 999
        }),
        livereload(),
    ];

    const plugins = [
        uglify(),
    ];

    return {
        templateScript: isBuild ? '' : devScript,
        plugins: isBuild ? plugins : devPlugins,
    };
})();

export default {
    input: './src/main.ts',
    output: [
        {
            file: './dist/common-utils-umd.js',
            sourcemap: true,
            // format: 'iife',
            format: 'umd',
            name: 'utils',
        },
        {
            file: './dist/common-utils-es.js',
            sourcemap: true,
            // format: 'iife',
            format: 'es',
        },
    ],
    plugins: [
        // eslint({
        //     include: ['src/**/*.ts']
        // }),
        clear({
            targets: ['dist']
        }),
        html({
            publicPath: './',
            template: () => {
                // {attributes, bundle, files, publicPath, title}
                return `
                    <!DOCTYPE html>
                    <html >
                        <head>
                            <title></title>
                        </head>
                        <body>
                            ${envConfig.templateScript}
                            <script src="./common-utils-umd.js"></script>
                        </body>
                    </html>
                `;
            }
        }),
        json(),
        nodeResolve({
            browser: true,
        }),
        commonjs(),
        babel({babelHelpers: 'bundled'}),
        typescript(),
    ].concat(
        envConfig.plugins
    )
};

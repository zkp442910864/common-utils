
import commonArr, {templateStr, pageFull} from './common';

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import clear from 'rollup-plugin-clear';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import html from '@rollup/plugin-html';
import {babel} from '@rollup/plugin-babel';


const exportObj = {
    input: '',
    output: [],
};

// 过滤下数据，以及整合数据
commonArr.forEach((item) => {
    exportObj.input = item.input;

    const fileName = item.output.file;

    // 调试时候只需要 umd 未压缩的文件，所以其他的都过滤了
    if (!~fileName.indexOf('-min.js') && ~fileName.indexOf('-umd')) {
        item.output.file = fileName.replace('dist', 'static');
        item.output.sourcemap = false;
        exportObj.output.push(item.output);
    }
});

exportObj.plugins = [
    // eslint({
    //     include: ['src/**/*.ts']
    // }),
    clear({
        targets: ['static']
    }),
    html({
        publicPath: pageFull(''),
        template: () => templateStr
    }),
    json(),
    nodeResolve({
        browser: true,
    }),
    commonjs(),
    babel({babelHelpers: 'bundled'}),
    typescript(),
    serve({
        open: true, // 是否打开浏览器
        contentBase: pageFull('static'), // 入口html的文件位置
        historyApiFallback: true, // Set to true to return index.html instead of 404
        host: 'localhost',
        port: 999
    }),
    livereload(),
];

export default exportObj;

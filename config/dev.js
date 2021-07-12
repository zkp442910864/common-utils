
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

commonArr.forEach((item) => {
    exportObj.input = item.input;

    if (!~item.output.file.indexOf('-min.js') && ~item.output.file.indexOf('-umd')) {
        item.output.sourcemap = false;
        exportObj.output.push(item.output);
    }
});

exportObj.plugins = [
    // eslint({
    //     include: ['src/**/*.ts']
    // }),
    clear({
        targets: ['dist']
    }),
    html({
        publicPath: pageFull(''),
        template: () => templateStr,
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
        contentBase: pageFull('dist'), // 入口html的文件位置
        historyApiFallback: true, // Set to true to return index.html instead of 404
        host: 'localhost',
        port: 999
    }),
    livereload(),
];

export default exportObj;
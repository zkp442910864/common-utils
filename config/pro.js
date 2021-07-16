
import commonArr, {templateStr, pageFull} from './common';

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import clear from 'rollup-plugin-clear';
import {uglify} from 'rollup-plugin-uglify';

import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
// import html from '@rollup/plugin-html';
import {babel} from '@rollup/plugin-babel';
// import banner from 'rollup-plugin-banner';

const exportArr = [];
// console.log(commonArr);
commonArr.forEach((item) => {
    // 判断是否需要压缩文件
    const isUglify = ~item.output.file.indexOf('-min.js');

    item.plugins = [
        clear({
            targets: ['dist']
        }),
        // html({
        //     publicPath: pageFull(''),
        //     template: () => templateStr,
        // }),
        json(),
        nodeResolve({
            browser: true,
        }),
        commonjs(),
        babel({babelHelpers: 'bundled'}),
        typescript(),
        isUglify ? uglify({
            output: {
                // 保留 eslint-disable 注释
                comments: function (node, comment) {
                    if (comment.type === 'comment2') {
                        // multiline comment
                        return /eslint-disable/.test(comment.value);
                    }
                    return false;
                }
            }
        }) : undefined,
        // banner('/* eslint-disable */'),
    ];

    exportArr.push(item);
});

export default exportArr;

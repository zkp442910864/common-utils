
import commonArr, {templateStr, pageFull} from './common';

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import clear from 'rollup-plugin-clear';
import {uglify} from 'rollup-plugin-uglify';

import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import html from '@rollup/plugin-html';
import {babel} from '@rollup/plugin-babel';


const exportArr = [];
// console.log(commonArr);
commonArr.forEach((item) => {
    const isUglify = ~item.output.file.indexOf('-min.js');

    item.plugins = [
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
        isUglify ? uglify() : undefined
    ];

    exportArr.push(item);
});

export default exportArr;

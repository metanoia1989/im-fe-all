/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Vue.config.js https://uniapp.dcloud.io/collocation/vue-config
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-04-13 01:21:55
 */

const TransfromPages = require('uni-read-pages');
const TFPages = new TransfromPages({
  include: ['path', 'style', 'meta']
});

module.exports = {
  productionSourceMap: false, // 生成环境不打包map文件
  devServer: {
    host: '0.0.0.0',
    port: 8000,
  },
  configureWebpack: config => {
    let devtool = '';
    if (process.env.NODE_ENV !== 'production' && (
        process.env.UNI_PLATFORM === 'mp-baidu' ||
        process.env.UNI_PLATFORM === 'mp-toutiao'
    )) {
      devtool = 'inline-source-map'
    }

    return {
      plugins: [
        new TFPages.webpack.DefinePlugin({
          ROUTES: JSON.stringify(TFPages.routes)
        })
      ],
      devtool,
    }
  },
  // 发布时删除console
  chainWebpack: (config) => {
    // 发行或运行时启用了压缩时会生效
    config.optimization.minimizer('terser').tap((args) => {
        const compress = args[0].terserOptions.compress;
        // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
        compress.drop_console = true;
        compress.pure_funcs = [
            '__f__', // App 平台 vue 移除日志代码
            // 'console.debug' // 可移除指定的 console 方法
        ];
        return args;
    });
  },
  // https://cli.vuejs.org/zh/guide/css.html#css-modules
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/styles/mixin.scss";
          @import "~@/uni.scss";
        `,
      },
    },
  },
  chainWebpack: (config) => {},
};

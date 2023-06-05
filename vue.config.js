const { defineConfig } = require('@vue/cli-service');
const  { resolve } = require('path')

let url = 'http://localhost:8087';  //  后端服务
module.exports = {
  transpileDependencies: true,
  devServer: {
    host: "localhost",
    // disableHostCheck: true,
    port: 8080,
    open: true,
    // 跨域代理
    proxy: {
      '/api': {
        target: url,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
  },
  productionSourceMap: false,
  lintOnSave: false,
  chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  }
};

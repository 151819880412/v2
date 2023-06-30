const { defineConfig } = require('@vue/cli-service');
const { resolve } = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

let url = 'http://localhost:3000';  //  后端服务
module.exports = {
  transpileDependencies: true,
  devServer: {
    historyApiFallback: true,
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
    // monaco-editor 编辑器
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        // Languages are loaded on demand at runtime
        languages: ['json', 'javascript', 'html', 'xml', 'go', 'typescript']
      }
    ]);
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

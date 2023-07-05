const path = require('path');

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    host: "localhost",
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
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
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // 确保使用包含编译器的构建
      }
    },
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['json', 'javascript', 'html', 'xml', 'go', 'typescript']
      })
    ]
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(path.resolve('src/assets/icons'))
      .end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  }
};

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
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['json', 'javascript', 'html', 'xml', 'go', 'typescript']
      })
    ]
  },
  chainWebpack: config => {
    // 添加对Vue文件的处理规则
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end();

    // 添加JavaScript文件的处理规则
    config.module
      .rule('js')
      .test(/\.js$/)
      .exclude.add(/node_modules/)
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .end();

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
  },
};

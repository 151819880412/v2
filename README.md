# 项目结构
```
- src
  - assets        // 存放静态资源，如图片、样式文件等
  - components    // 存放可复用的Vue组件
  - views         // 存放页面级组件
  - router        // 存放路由相关配置文件
  - store         // 存放Vuex状态管理相关文件
  - utils         // 存放工具函数和辅助类
  - plugins       // 存放Vue插件
  - directives    // 存放自定义指令
  - filters       // 存放自定义过滤器
  - mixins        // 存放混入（mixins）
  - constants     // 存放常量或配置文件
  - main.js       // 应用入口文件
- public
  - index.html    // 主HTML文件
  - favicon.ico   // 网站图标
- babel.config.js // Babel配置文件
- package.json    // 项目配置文件
- package-lock    // 项目配置文件的缓存地址
- vue.config.js   // vue配置文件
- README.md       // 项目说明文档

```
# 依赖
```shell
  npm i element-ui -S
  npm install axios
  npm install lodash -S
  npm i svg-sprite-loader -D
  npm install nprogress
```
# 基础知识点
## vue        template/script/style 三大标签
## vue        生命周期
## vue        data中的数据定义
## vue        methdos/watch/computed
## vue        全局组件/局部组件
## vue-router 路由拦截器
## vue-router 路由跳转/传参
## vue-router 路由懒加载
## vuex       全局状态共享/传参/取值
## axios      请求/响应拦截器
## axios      跨域处理
## axios      调用/传参/返回值
## 组件传参   props/$emit / EventBUS($emit/$on) / vuex / localStorage / $attrs/$listeners / provide/inject / $parent/$children/ref
## svg的使用
## 环境变量的使用
## 三方库的注册/使用/按需加载
# 高级知识点
## vue        异步组件
## vue        自定义指令/过滤器/混入
## vue-router 动态路由
## vue-router 单点登录
## axios      重发/取消请求
# 源码分析
## 响应式原理/双向数据绑定
## MVVM简述
## 手写简易版vue

# 开发问题
## 部署缓存
```
  index.html
  <meta http-equiv="pragram" content="no-cache">
  <meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="expires" content="0">
  nginx
  server {
    location = / {
      try_files $uri /index.html;
      add_header Cache-Control 'no-cache, no-store';
    }
  }
  但是如果这样设置后，其实可以理解为每次都需要去咨询服务器是否更新，这样每次刷新页面的时候，会导致加载时间太长。各位酌情加
```
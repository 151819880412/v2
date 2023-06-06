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
## 依赖
```shell
  npm i element-ui -S
  npm install axios
  npm install lodash -S
  npm i svg-sprite-loader -D
  npm install nprogress
```
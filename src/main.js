import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import '@/stylus/index.stylus';
import dialogDrag from './views/com/directives/dialogDrag';


Vue.config.productionTip = false;

// 全局指令
Vue.use(dialogDrag);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
Vue.config.errorHandler = function (error, vm, info) {
  // 处理错误，可以选择忽略或进行其他操作
  // 这里可以根据需要自定义处理方式，比如将错误记录到日志等
  // 注意：在Vue2中，返回值不会阻止错误的传播和显示
  console.error(error);
};

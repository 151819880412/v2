import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 自动检测更新
import '@/utils/autoUpdate'
// 全局组件
import Parser from '@/components/ElForm/Parser.vue';
Vue.component('Parser', Parser)
import DialogMask from '@/components/DialogMask/DialogMask.vue';
Vue.component('DialogMask', DialogMask)
// 将DialogMask组件注册到Vue的原型链上
// Vue.prototype.$DialogMask = DialogMask;
// 将DialogMask组件作为全局方法挂载到Vue原型上
// Vue.prototype.$showDialogMask = (propsData) => {
//   const DialogMaskComponent = Vue.extend(DialogMask);
//   const instance = new DialogMaskComponent({
//     propsData
//   });
//   instance.init(); // 调用组件的init方法
//   instance.$mount();
//   document.body.appendChild(instance.$el);
// };

import Loading from "@/components/Loading/index";



import '@/assets/icons'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../theme/index.css'
Vue.use(ElementUI,{size: 'small'});

import '@/stylus/index.stylus';
import '@/stylus/render.stylus';

import dialogDrag from './views/com/directives/dialogDrag';


Vue.config.productionTip = false;

// 全局指令
Vue.use(dialogDrag);
Vue.use(Loading);

export default new Vue({
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

import Vue from 'vue';
import Loading from './Loading.vue';

export default {
  loading: {},
  install(Vue) {
    if (Object.keys(this.loading).length !== 0) {
      Vue.prototype.$Loading = this.loading;
      return;
    }

    const LoadingComponent = Vue.extend(Loading);
    const instance = new LoadingComponent();
    const div = document.createElement('div');
    const body = document.body;
    body.appendChild(div);
    
    this.loading = instance.$mount(div);
    Vue.prototype.$Loading = this.loading;
  },
};

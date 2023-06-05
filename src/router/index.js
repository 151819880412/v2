import Vue from 'vue';
import VueRouter from 'vue-router';
import { LoginRoute, PAGE_NOT_FOUND_ROUTE, HomeRoute } from './routes';
import store from '@/store/index';
import createRoutes from './createRoutes';

import { PageEnum } from '@/enums/pageEnum';

const LOGIN_PATH = PageEnum.BASE_LOGIN;
const whitePathList = [LOGIN_PATH];
// VueRouter只会匹配符合规则的第一个路由,所以正则匹配的页面需要放在最后面
const basicRoutes = [LoginRoute, HomeRoute, PAGE_NOT_FOUND_ROUTE];

Vue.use(VueRouter);

const router = new VueRouter({
  strict: true,
  mode: 'history',
  routes: basicRoutes
});

// 重写路由跳转的方法,避免重复进入同一个路由报错
const originalReplaces = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplaces.call(this, location).catch(err => err);
};
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

router.beforeEach(async (to, from, next) => {
  if (to.path === from.path) {
    return; // 取消导航
  }

  // 白名单
  if (whitePathList.includes(to.path)) {
    next();
    return;
  }

  const { accessToken } = store.getters.getToken;
  if (!accessToken) {
    // 可以在未经许可的情况下访问。需要设置路由元。ignoreAuth为true
    if (to.meta.ignoreAuth) {
      next();
      return;
    }

    // 重定向到登录页面
    const redirectData = {
      path: LOGIN_PATH,
      replace: true,
    };
    if (to.path) {
      redirectData.query = {
        ...redirectData.query,
        redirect: to.path,
      };
    }
    next(redirectData);
    return;
  }

  // 判断如果是动态路由就跳过，避免死循环
  if (store.getters.getIsDynamicAddedRoute) {
    console.log(to.name, 'PageNotFound', to,);
    next();
    return;
  }

  // 构建路由
  const routes = await createRoutes();
  // 待解决  动态路由添加到了最后面(可能是v2和v3版本导致的)
  // routes.forEach((route) => {
  //   if (router.getRoutes().filter(item2 => item2.name == route.name).length == 0) {
  //     router.addRoute(route);
  //   }
  // });
  const originalRoutes = router.options.routes;
  const newRoutes = routes.concat(originalRoutes);
  router.matcher = new VueRouter({ routes: newRoutes }).matcher;

  store.dispatch('setDynamicAddedRoute', true);
  console.log(to.name, 'PageNotFound', to, router.getRoutes());
  if (to.name === 'PageNotFound') {
    // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
    next({ path: to.fullPath, replace: true, query: to.query });
  } else {
    const redirectPath = (from.query.redirect || to.path);
    const redirect = decodeURIComponent(redirectPath);
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
    next(nextData);
  }

});
export default router;
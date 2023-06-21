const AppLayout = () => import('@/views/layout/AppLayout.vue');
const Home = () => import('@/views/home/home.vue');
const RouterTest = () => import('@/views/router/test/test.vue');
const notFound = () => import('@/views/notFound/notFound.vue');

export const LoginRoute = {
  path: '/login',
  name: 'Login',
  // 路由懒加载
  component: () => import('@/views/login/login.vue'),
  meta: {
    title: '登录',
  },
};

// // 根路由
export const HomeRoute = {
  path: '/',
  name: 'Home',
  redirect: 'home',
  component: AppLayout,
  meta: {
    title: '首页',
    icon: "el-icon-location",
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页',
      },
    }
  ]
};

export const PAGE_NOT_FOUND_ROUTE = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: AppLayout,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'PageNotFound',
      component: notFound,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};
/**
 * 动态创建路由 一般由后端返回
 * 配合权限/菜单/路由使用
 * @author  
 * @date 2023-06-03
 * @returns {any}
 */
const AppLayout = () => import('@/views/layout/AppLayout.vue');
const DynamicRouting = () => import('@/views/router/dynamicRouting/dynamicRouting.vue');
const RoutingJump = () => import('@/views/router/routingJump/routingJump.vue');
const ComProps = () => import('@/views/com/comProps/comProps.vue');

export default () => {
  return new Promise(res => {
    setTimeout(() => {
      res([
        {
          path: '/router',
          name: 'Router',
          component: AppLayout,
          meta: {
            title: '路由',
            // 区分是否动态路由
            dynamic: true,
            icon: "el-icon-location",
          },
          children: [
            {
              path: '/router/dynamicRouting',
              name: 'DynamicRouting',
              component: DynamicRouting,
              meta: {
                title: '动态路由',
                dynamic: true,
                icon: "el-icon-location",
              },
            },
            {
              path: '/router/routingJump',
              name: 'RoutingJump',
              component: RoutingJump,
              meta: {
                title: '路由跳转',
                dynamic: true,
                icon: "el-icon-location",
              },
            },
          ]
        },
        {
          path: '/com',
          name: 'Com',
          component: AppLayout,
          meta: {
            title: '组件',
            // 区分是否动态路由
            dynamic: true,
            icon: "el-icon-location",
          },
          children: [
            {
              path: '/com/comProps',
              name: 'ComProps',
              component: ComProps,
              meta: {
                title: '组件传参',
                dynamic: true,
                icon: "el-icon-location",
              },
            },
          ]
        },
      ]);
    }, 0);
  });
};
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
const ComSlot = () => import('@/views/com/comSlot/comSlot.vue');
const ComMixin = () => import('@/views/com/comMixin/comMixin.vue');
const Directives = () => import('@/views/com/directives/directives.vue');
const WatchComputed = () => import('@/views/base/WatchComputed.vue');

export default () => {
  return new Promise(res => {
    setTimeout(() => {
      res([
        {
          path: '/basisGrammar',
          name: 'BasisGrammar',
          component: AppLayout,
          meta: {
            title: '基础语法',
            // 区分是否动态路由
            dynamic: true,
            icon: "el-icon-location",
          },
          children: [
            {
              path: '/basisGrammar/watch-computed',
              name: 'WatchComputed',
              component: WatchComputed,
              meta: {
                title: '计算属性和侦听器',
                dynamic: true,
                icon: "el-icon-location",
              },
            },
          ]
        },
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
              path: '/com/comSlot',
              name: 'ComSlot',
              component: ComSlot,
              meta: {
                title: '插槽',
                dynamic: true,
                icon: "el-icon-location",
              },
            },
            {
              path: '/com/comMixin',
              name: 'ComMixin',
              component: ComMixin,
              meta: {
                title: '混入',
                dynamic: true,
                icon: "el-icon-location",
              },
            },
            {
              path: '/com/directives',
              name: 'Directives',
              component: Directives,
              meta: {
                title: '指令',
                dynamic: true,
                icon: "el-icon-location",
              },
            },
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
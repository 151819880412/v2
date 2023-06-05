/**
 * 动态创建路由 一般由后端返回
 * @author  
 * @date 2023-06-03
 * @returns {any}
 */
const AppLayout = () => import('@/views/layout/AppLayout.vue');
const DynamicRouting = () => import('@/views/dynamicRouting/dynamicRouting.vue');

export default () => {
  return new Promise(res => {
    setTimeout(()=>{
      res([
        {
          path: '/router',
          name: 'Router',
          component: AppLayout,
          meta: {
            title: '路由',
          },
          children: [
            {
              path: '/router/dynamicRouting',
              name: 'DynamicRouting',
              component: DynamicRouting,
              meta: {
                title: '动态路由',
              },
            }
          ]
        },
      ]);
    },0)
  });
};
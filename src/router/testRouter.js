export const DynamicRoutingTest = {
  path: '/dynamicRoutingTest',
  name: 'DynamicRoutingTest',
  component: () => import('@/views/router/dynamicRouting/dynamicRoutingTest.vue'),
  meta: {
    title: '测试动态路由',
  },
};

export const RoutingJumpTest = {
  path: '/router/routingJumpTest/:id?',
  name: 'RoutingJumpTest',
  component: () => import('@/views/router/routingJump/routingJumpTest.vue'),
  meta: {
    title: '路由跳转/传参测试',
  },
};

export default [DynamicRoutingTest, RoutingJumpTest];
export const RoutingJumpTest = {
  path: '/router/routingJumpTest/:id?',
  name: 'RoutingJumpTest',
  component: () => import('@/views/router/routingJump/routingJumpTest.vue'),
  meta: {
    title: '路由跳转/传参测试',
  },
};

export default [ RoutingJumpTest];
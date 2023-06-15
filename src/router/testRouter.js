export const RoutingJumpTest = {
  path: '/router/routingJumpTest/:id?',
  name: 'RoutingJumpTest',
  component: () => import('@/views/router/routingJump/routingJumpTest.vue'),
  meta: {
    title: '路由跳转/路由传参测试',
  },
  // 将路由上的参数传到组件props上  https://router.vuejs.org/zh/guide/essentials/passing-props.html
  props: true
};

export default [RoutingJumpTest];
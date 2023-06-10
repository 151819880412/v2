<template>
  <div class='dynamicRouting'>
    <el-button @click="addRouter">动态添加子集路由</el-button>
    <el-divider></el-divider>
    <el-button @click="addChildRouter">动态添加子集路由</el-button>
    <el-divider></el-divider>
    <el-button @click="toRouter">无权限路由</el-button>

  </div>
</template>
<script>
import VueRouter from 'vue-router';
const AppLayout = () => import('@/views/layout/AppLayout.vue');
const DynamicRouting = () => import('@/views/router/dynamicRouting/dynamicRouting.vue');
export default {
  name: 'dynamicRouting',
  props: {},
  data() {
    return {
      // 所有动态添加的路由,实际开发中应该不会有这种情况
      routerList: [
        {
          path: '/router',
          name: 'Router',
          component: AppLayout,
          meta: {
            title: '路由',
            // 区分是否动态路由
            dynamic: true,
          },
          children: [
            {
              path: '/router/dynamicRouting',
              name: 'DynamicRouting',
              component: DynamicRouting,
              meta: {
                title: '动态路由',
                dynamic: true,
              },
            },

          ]
        },
      ]
    };
  },
  created() { },
  mounted() { },
  computed: {},
  methods: {
    addRouter() {
      let addList = _.cloneDeep(this.routerList);
      addList.push({
        path: '/router/dynamicRoutingTest',
        name: 'Aaa',
        component: () => import('@/views/router/dynamicRouting/dynamicRoutingTest.vue'),
        meta: {
          title: '测试动态路由',
          dynamic: true,
        },
      });
      const originalRoutes = this.$router.options.routes;
      const newRoutes = addList.concat(originalRoutes);
      this.$router.matcher = new VueRouter({ routes: newRoutes, mode: 'history', }).matcher;
      this.$router.push('/dynamicRoutingTest');
    },
    addChildRouter() {
      // 实际开发中应该不会有这种情况
      let addList = _.cloneDeep(this.routerList);
      addList[0].children.push({
        path: '/router/dynamicRoutingTest',
        name: 'Aaa',
        component: () => import('@/views/router/dynamicRouting/dynamicRoutingTest.vue'),
        meta: {
          title: '测试动态路由',
          dynamic: true,
        },
      });
      const originalRoutes = this.$router.options.routes;
      const newRoutes = addList.concat(originalRoutes);
      this.$router.matcher = new VueRouter({ routes: newRoutes, mode: 'history', }).matcher;
      // this.$router.push('/router/dynamicRoutingTest');
      this.$router.push('./dynamicRoutingTest');
    },
    toRouter() {
      this.$router.push('/bbb');
    },
  },
  watch: {},
  components: {},
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
</style>
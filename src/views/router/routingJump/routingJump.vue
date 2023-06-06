<template>
  <div class='routingJump'>
    <router-link to="/router/test">router-link to path</router-link>
    <router-link :to="{ name: 'Test' }">router-link to Name</router-link>
    <el-button @click="pushRouter('path')">push to path</el-button>
    <el-button @click="pushRouter('name')">push to name</el-button>
    <el-button @click="replaceRouter('path')">replace to path</el-button>
    <el-button @click="replaceRouter('name')">replace to name</el-button>
    <el-button @click="replaceRouter('name')">replace to name</el-button>

    <el-button @click="windowRouter('href')">window.location.href</el-button>
    <el-button @click="windowRouter('replace')">window.location.replace</el-button>
    <el-button @click="windowRouter('assign')">window.location.assign</el-button>
    <el-button @click="windowRouter('open')">window.open</el-button>

  </div>
</template>
<script>
export default {
  name: 'routingJump',
  props: {},
  data() {
    return {};
  },
  created() { },
  mounted() { },
  computed: {},
  methods: {
    pushRouter(type) {
      if (type == 'path') {
        this.$router.push('/router/test');
      } else {
        this.$router.push({ name: 'Test' });
      }
    },
    replaceRouter(type) {
      if (type == 'path') {
        this.$router.replace('/router/test');
      } else {
        this.$router.replace({ name: 'Test' });
      }
    },
    windowRouter(type) {
      const { href } = this.$router.resolve({
        path: "/router/test", // 这里
      });
      switch (type) {
        case 'href':
          // 导航到指定URL
          window.location.href = href;
          break;
        case 'replace':
          // 替换当前页面的URL
          window.location.replace(href);
          break;
        case 'assign':
          // 导航到指定URL
          window.location.assign(href);
          break;
        default:
          // 在新窗口中打开指定URL
          window.open(href, '_blank');
          break;
      }
    }
  },
  watch: {},
  components: {},
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
</style>
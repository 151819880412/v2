<template>
  <div class='routingJump'>
    <h1>
      router-link to path
    </h1>
    <div class="flexDiv">
      <router-link to="/router/routingJumpTest">跳转</router-link>
      <!-- 需要路由后面加一个占位符 /:id 否则跳转路由404 -->
      <router-link to="/router/routingJumpTest/1">占位符传参</router-link>
      <router-link :to="{ path: '/router/routingJumpTest', query: { id: 1 } }">query传参</router-link>
      <!-- 无效 -->
      <router-link :to="{ path: '/router/routingJumpTest', params: { id: 1 } }">params传参</router-link>
      <!-- params传参无效 -->
      <router-link :to="{ path: '/router/routingJumpTest', params: { id: 1 }, query: { id: 1 } }">混合传参</router-link>
    </div>
    <el-divider></el-divider>
    <h1>
      router-link to Name
    </h1>
    <div class="flexDiv">
      <router-link :to="{ name: 'RoutingJumpTest' }">跳转</router-link>
      <router-link :to="{ name: 'RoutingJumpTest', query: { id: 1 } }">query传参</router-link>
      <!-- 需要路由后面加一个占位符 /:id 否则刷新页面丢失参数 -->
      <router-link :to="{ name: 'RoutingJumpTest', params: { id: 1 } }">params传参</router-link>
      <router-link :to="{ name: 'RoutingJumpTest', params: { id: 1 }, query: { id: 1 } }">混合传参</router-link>
    </div>
    <el-divider></el-divider>
    <h1>
      <!-- push可以前进后退 -->
      push to path
    </h1>
    <div class="flexDiv">
      <el-button @click="pushRouter('path')">跳转</el-button>
      <el-button @click="pushRouter('path', 'query')">query传参</el-button>
      <el-button @click="pushRouter('path', 'params')">params传参</el-button>
      <el-button @click="pushRouter('path', 'both')">混合传参</el-button>
    </div>
    <el-divider></el-divider>
    <h1>
      push to name
    </h1>
    <div class="flexDiv">
      <el-button @click="pushRouter('name')">跳转</el-button>
      <el-button @click="pushRouter('name', 'query')">query传参</el-button>
      <el-button @click="pushRouter('name', 'params')">params传参</el-button>
      <el-button @click="pushRouter('name', 'both')">混合传参</el-button>
    </div>
    <el-divider></el-divider>
    <h1>
      <!-- replace不能前进后退 -->
      replace to name
    </h1>
    <div class="flexDiv">
      <el-button @click="replaceRouter('path')">跳转</el-button>
      <el-button @click="replaceRouter('path', 'query')">query传参</el-button>
      <el-button @click="replaceRouter('path', 'params')">params传参</el-button>
      <el-button @click="replaceRouter('path', 'both')">混合传参</el-button>
    </div>
    <el-divider></el-divider>
    <h1>
      replace to name
    </h1>
    <div class="flexDiv">
      <el-button @click="replaceRouter('name')">跳转</el-button>
      <el-button @click="replaceRouter('name', 'query')">query传参</el-button>
      <el-button @click="replaceRouter('name', 'params')">params传参</el-button>
      <el-button @click="replaceRouter('name', 'both')">混合传参</el-button>
    </div>
    <el-divider></el-divider>
    <h1>
      window.location.href
    </h1>
    <div class="flexDiv">
      <el-button @click="windowHref()">跳转</el-button>
      <el-button @click="windowHref('query')">query传参</el-button>
      <el-button @click="windowHref('params')">params传参</el-button>
      <el-button @click="windowHref('both')">混合传参</el-button>
    </div>
    <el-divider></el-divider>
    <h1>
      window.location.replace
    </h1>
    <div class="flexDiv">
      <el-button @click="windowReplace()">跳转</el-button>
      <el-button @click="windowReplace('query')">query传参</el-button>
      <el-button @click="windowReplace('params')">params传参</el-button>
      <el-button @click="windowReplace('both')">混合传参</el-button>
    </div>
    <el-divider></el-divider>
    <h1>
      window.location.assign
    </h1>
    <div class="flexDiv">
      <el-button @click="windowAssign()">跳转</el-button>
      <el-button @click="windowAssign('query')">query传参</el-button>
      <el-button @click="windowAssign('params')">params传参</el-button>
      <el-button @click="windowAssign('both')">混合传参</el-button>
    </div>
    <el-divider></el-divider>
    <h1>
      window.open
    </h1>
    <div class="flexDiv">
      <el-button @click="windowOpen()">跳转</el-button>
      <el-button @click="windowOpen('query')">query传参</el-button>
      <el-button @click="windowOpen('params')">params传参</el-button>
      <el-button @click="windowOpen('both')">混合传参</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'routingJump',
  props: {},
  data() {
    return {
    };
  },
  created() { },
  mounted() { },
  computed: {},
  methods: {
    pushRouter(type1, type2) {
      if (type1 == 'path') {
        if (type2 == 'query') {
          this.$router.push({
            path: '/router/routingJumpTest',
            query: {
              id: 1
            }
          });
        } else if (type2 == 'params') {
          // 无效
          this.$router.push({
            path: '/router/routingJumpTest',
            params: {
              id: 1
            }
          });
        } else if (type2 == 'both') {
          // params无效
          this.$router.push({
            path: '/router/routingJumpTest',
            params: {
              id: 1
            },
            query: {
              id: 1
            }
          });
        } else {
          this.$router.push('/router/routingJumpTest');
        }
      } else {
        if (type2 == 'query') {
          this.$router.push({
            name: 'RoutingJumpTest',
            query: {
              id: 1
            }
          });
        } else if (type2 == 'params') {
          this.$router.push({
            name: 'RoutingJumpTest',
            params: {
              id: 1
            }
          });
        } else if (type2 == 'both') {
          this.$router.push({
            name: 'RoutingJumpTest',
            params: {
              id: 1
            },
            query: {
              id: 1
            }
          });
        } else {
          this.$router.push({ name: 'RoutingJumpTest' });
        }
      }
    },
    replaceRouter(type1, type2) {
      if (type1 == 'path') {
        if (type2 == 'query') {
          this.$router.replace({
            path: '/router/routingJumpTest',
            query: {
              id: 1
            }
          });
        } else if (type2 == 'params') {
          // 无效
          this.$router.replace({
            path: '/router/routingJumpTest',
            params: {
              id: 1
            }
          });
        } else if (type2 == 'both') {
          // params无效
          this.$router.replace({
            path: '/router/routingJumpTest',
            params: {
              id: 1
            },
            query: {
              id: 1
            }
          });
        } else {
          this.$router.replace('/router/routingJumpTest');
        }
      } else {
        if (type2 == 'query') {
          this.$router.replace({
            name: 'RoutingJumpTest',
            query: {
              id: 1
            }
          });
        } else if (type2 == 'params') {
          this.$router.replace({
            name: 'RoutingJumpTest',
            params: {
              id: 1
            }
          });
        } else if (type2 == 'both') {
          this.$router.replace({
            name: 'RoutingJumpTest',
            params: {
              id: 1
            },
            query: {
              id: 1
            }
          });
        } else {
          this.$router.replace({ name: 'RoutingJumpTest' });
        }
      }
    },
    windowHref(type) {
      if (type) {
        if (type == 'query') {
          // 构建查询参数字符串
          const query = new URLSearchParams();
          query.set('id', '1');
          query.set('id2', '2');
          const queryString = query.toString();
          // 构建完整的 URL
          const url = `/router/routingJumpTest?${queryString}`;
          // 通过 window.location.href 进行跳转并传递查询参数
          window.location.href = url;
        } else if (type == 'params') {
          // 构建路径参数字符串
          const params = {
            id: 1,
          };
          const paramsString = Object.keys(params).map(key => encodeURIComponent(params[key])).join('/');
          // 构建完整的 URL
          const url = `/router/routingJumpTest/${paramsString}`;
          // 通过 window.location.href 进行跳转并传递路径参数
          window.location.href = url;
        } else {
          // 构建查询参数字符串
          const query = new URLSearchParams();
          query.set('id', '1');
          const queryString = query.toString();
          // 构建路径参数字符串
          const params = {
            id: 2,
          };
          const paramsString = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
          // 构建完整的 URL
          const url = `/router/routingJumpTest/${params.id}?${queryString}&${paramsString}`;
          // 通过 window.location.href 进行跳转并传递查询参数和路径参数
          window.location.href = url;
        }
      } else {
        window.location.href = '/router/routingJumpTest';
      }
    },
    windowReplace(type) {
      if (type) {
        if (type == 'query') {
          // 构建查询参数字符串
          const query = new URLSearchParams();
          query.set('id', '1');
          query.set('id2', '2');
          const queryString = query.toString();
          const url = `/router/routingJumpTest?${queryString}`;
          window.location.replace(url);
        } else if (type == 'params') {
          // 构建路径参数字符串
          const params = {
            id: 1,
          };
          const paramsString = Object.keys(params).map(key => encodeURIComponent(params[key])).join('/');
          const url = `/router/routingJumpTest/${paramsString}`;
          window.location.replace(url);
        } else {
          const query = new URLSearchParams();
          query.set('id', '1');
          const queryString = query.toString();
          const params = {
            id: 2,
          };
          const paramsString = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
          const url = `/router/routingJumpTest/${params.id}?${queryString}&${paramsString}`;
          window.location.replace(url);
        }
      } else {
        window.location.replace('/router/routingJumpTest');
      }
    },
    windowAssign(type) {
      if (type) {
        if (type == 'query') {
          // 构建查询参数字符串
          const query = new URLSearchParams();
          query.set('id', '1');
          query.set('id2', '2');
          const queryString = query.toString();
          // 构建完整的 URL
          const url = `/router/routingJumpTest?${queryString}`;
          window.location.assign(url);
        } else if (type == 'params') {
          // 构建路径参数字符串
          const params = {
            id: 1,
          };
          const paramsString = Object.keys(params).map(key => encodeURIComponent(params[key])).join('/');
          // 构建完整的 URL
          const url = `/router/routingJumpTest/${paramsString}`;
          window.location.assign(url);
        } else {
          const query = new URLSearchParams();
          query.set('id', '1');
          const queryString = query.toString();
          const params = {
            id: 2,
          };
          const paramsString = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
          const url = `/router/routingJumpTest/${params.id}?${queryString}&${paramsString}`;
          window.location.assign(url);
        }
      } else {
        window.location.assign('/router/routingJumpTest');
      }
    },
    windowOpen(type) {
      if (type) {
        if (type == 'query') {
          // 构建查询参数字符串
          const query = new URLSearchParams();
          query.set('id', '1');
          query.set('id2', '2');
          const queryString = query.toString();
          // 构建完整的 URL
          const url = `/router/routingJumpTest?${queryString}`;
          window.open(url);
        } else if (type == 'params') {
          // 构建路径参数字符串
          const params = {
            id: 1,
          };
          const paramsString = Object.keys(params).map(key => encodeURIComponent(params[key])).join('/');
          // 构建完整的 URL
          const url = `/router/routingJumpTest/${paramsString}`;
          window.open(url);
        } else {
          const query = new URLSearchParams();
          query.set('id', '1');
          const queryString = query.toString();
          const params = {
            id: 2,
          };
          const paramsString = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
          const url = `/router/routingJumpTest/${params.id}?${queryString}&${paramsString}`;
          window.open(url);
        }
      } else {
        window.open('/router/routingJumpTest');
      }
    },
  },
  watch: {},
  components: {},
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
.flexDiv{
  display: flex;
  justify-content: space-around;  
}
</style>
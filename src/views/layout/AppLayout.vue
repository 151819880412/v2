<template>
  <div class="common-layout">
    <el-container class="common-container" v-if="fullScreen">
      <el-aside width="200px">
        <SidebarNav />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-scrollbar ref="scrollbar">
          <el-main>
            <PageLayout />
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
    <PageLayout v-else />
  </div>
</template>

<script>
import PageLayout from './components/PageLayout/PageLayout.vue';
import SidebarNav from "./components/Sidebar/Sidebar.vue";
import Header from "./components/Header/Header.vue";

export default {
  name: 'AppLayout',
  props: {},
  data() {
    return {
      fullScreen: this.$route?.meta?.showMe?.fullScreen || true
    };
  },
  created() { },
  mounted() {
  },
  computed: {},
  methods: {
    // 组件内部的滚动条回到原点
    scrollToTop() {
      this.$nextTick(() => {
        this.$refs.scrollbar.wrap.scrollTop = 0;
      });
    }
  },
  watch: {},
  components: {
    PageLayout,
    SidebarNav,
    Header,
  },
  beforeDestroy() { },
  beforeRouteUpdate(to, from, next) {
    next();
    this.scrollToTop();
  }
};
</script>
<style lang='stylus' scoped>
.common-layout{
  height: 100%
}
.common-container{
  height: 100%
}
</style>
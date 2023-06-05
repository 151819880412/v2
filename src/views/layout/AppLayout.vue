<template>
  <div class="common-layout">
    <el-container class="common-container">
      <el-aside width="200px">
        <SidebarNav />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <PageLayout />
        </el-main>
      </el-container>
    </el-container>
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
    return {};
  },
  created() { },
  mounted() { },
  computed: {},
  methods: {},
  watch: {},
  components: {
    PageLayout,
    SidebarNav,
    Header,
  },
  beforeDestroy() { }
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
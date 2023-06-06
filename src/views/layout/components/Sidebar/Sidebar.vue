<template>
  <div class='sidebar'>
    <el-menu mode="vertical" :collapse="isCollapse" background-color="#304156" text-color="#eee"
      active-text-color="#4dbcff" :default-active="defaultActive" :unique-opened="true">
      <SidebarItem :menuList="menuList"></SidebarItem>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem.vue';
export default {
  name: 'Sidebar',
  props: {},
  data() {
    return {
      isCollapse: false,
      defaultActive: '/home'
    };
  },
  created() { },
  mounted() {
  },
  computed: {
    ...mapGetters({
      menuList: 'getMenu',
    }),

  },
  methods: {},
  watch: {},
  components: {
    SidebarItem
  },
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
.sidebar{
  height: 100%
}
.sidebar ul{
    height: 100%
  }

</style>
<!-- 
  递归组件:用于生成多层级菜单
-->

<template>
  <div class="menu-container">
    <template v-for="item in menuList">
      <el-submenu :index="item.path" v-if="item.children && item.children.length > 0" :key="item.path">
        <template slot="title">
          <i style="font-size: 20px; padding: 0 8px" class="iconfont" :class="item.meta.icon"></i>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item-group>
          <sidebar-item :menuList="item.children"></sidebar-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :key="item.path" :index="item.path" @click="gotoRoute(item)" v-else>
        <i style="font-size: 20px; padding: 0 8px" class="iconfont" :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'sidebar-item',
  props: {
    menuList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {
    gotoRoute(row) {
      this.$router.push(row.path);
    }
  },
  mounted() {
  },
  computed: {

  },
  watch: {

  }
};
</script>

<style lang='stylus'>
.el-menu--collapse {
  width: 100%;
}

.el-menu--collapse .el-submenu__title span {
  display: none;
}

/* 隐藏 > */
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
</style>

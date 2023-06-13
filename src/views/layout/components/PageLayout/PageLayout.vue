<template>
  <div class='PageLayout'>
    <!-- <router-view>
    <template  v-slot:default="{ Component, route }">
      <transition :name="
        getTransitionName({
          route,
          openCache,
          enableTransition: true,
          cacheTabs: [],
          def: 'fade-slide',
        })
      " mode="out-in" appear>
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <div v-else :key="route.fullPath">
          <component :is="Component" :key="route.fullPath" />
        </div>
      </transition>
    </template>
  </router-view> -->

    <!-- 
      fade:淡入淡出
      slide:滑动
      scale:缩放
      rotate:旋转
      custom:自定义过渡
     -->
    <!-- <transition name="slide"> -->
      <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  name: 'PageLayout',
  props: {},
  data() {
    return {};
  },
  created() { },
  mounted() { },
  computed: {},
  methods: {},
  watch: {},
  components: {},
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

// 淡入淡出
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// 滑动
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}

// 缩放
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s;
}
.scale-enter {
  transform: scale(0);
}
.scale-leave-to {
  transform: scale(0);
}

// 旋转
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.5s;
}
.rotate-enter {
  transform: rotate(180deg);
}
.rotate-leave-to {
  transform: rotate(-180deg);
}

// 自定义
.custom-enter-active,
.custom-leave-active {
  transition: all 0.5s;
}
.custom-enter {
  /* 自定义进入过渡效果 */
}
.custom-leave-to {
  /* 自定义离开过渡效果 */
}

</style>
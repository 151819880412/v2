<template>
  <div class='PageLayout'>
    <router-view>
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
  </router-view>
  </div>
</template>
<script>
export default {
  name: 'PageLayout',
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  watch: {},
  components: {},
  beforeDestroy() {}
};
</script>
<style lang='stylus' scoped>
</style>
<template>
  <div>
    <component v-if="component" :is="component"></component>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      component: null,
    };
  },
  created() {
    // 动态加载远程组件
    this.loadRemoteComponent();
  },
  methods: {
    async loadRemoteComponent() {
      try {
        const remoteComponent = await import('D:/aaa.vue');
        this.component = remoteComponent.default;
      } catch (error) {
        console.error('加载远程组件失败', error);
      }
    },
  },
};
</script>

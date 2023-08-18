<template>
  <div id="loading" v-if="visible">
    <div class="circle"></div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Loading",
  setup() {
    // 控制组件的状态
    let visible = ref(false);

    // 显示组件
    let showLoading = () => {
      visible.value = true;
    };
    // 隐藏组件
    let hideLoading = () => {
      visible.value = false;
    };

    return { visible, showLoading, hideLoading };
  },
});
</script>
<style  lang="stylus" scoped>
#loading {
  width: 100%;
  min-height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 9000;

  display: flex;
  align-items: center;
  justify-content: center;
}
@keyframes loading {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(160deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.circle {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 6px solid #788189;
  border-left-color: #ccc;

  animation: loading 1s linear 0.1s infinite;
}
</style>
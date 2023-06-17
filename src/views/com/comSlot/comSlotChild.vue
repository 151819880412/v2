<template>
  <div class='comSlotChild'>
    <!-- 默认插槽 -->
    <slot></slot>
    <!-- 具名插槽 -->
    <slot name="footer"></slot>
    <!-- 作用域插槽 -->
    <slot v-bind:user="user" name="aaa"></slot>
  </div>
</template>
<script>
export default {
  name: 'comSlotChild',
  props: {},
  data() {
    return {
      user: {
        name: "小明",
        age: 18
      }
    };
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
</style>
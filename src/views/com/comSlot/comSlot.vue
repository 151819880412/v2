<template>
  <div class='comSlot'>
    <ComSlotChild>
      <!-- 默认插槽的内容，默认插槽和具名插槽不能同时存在 -->
      <p>默认插槽的内容</p>

      <!-- 具名插槽的内容 -->
      <template v-slot:footer>
        <p>具名插槽的内容</p>
      </template>

      <!-- 作用域插槽的内容 -->
      <template v-slot:aaa="slotProps">
        <p>Name: {{ slotProps.user.name }}</p>
        <p>Age: {{ slotProps.user.age }}</p>
      </template>
    </ComSlotChild>
  </div>
</template>
<script>
import ComSlotChild from './comSlotChild.vue';
export default {
  name: 'comSlot',
  props: {},
  data() {
    return {

    };
  },
  created() { },
  mounted() { },
  computed: {},
  methods: {},
  watch: {},
  components: {
    ComSlotChild
  },
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
</style>
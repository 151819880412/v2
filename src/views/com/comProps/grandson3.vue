<template>
  <div class='grandson3'>
    <h2>grandson3</h2>
    <h3>grandson的值：{{ grandsonProps }}</h3>
    <h3>grandson3的$attrs: {{ $attrs }}</h3>
    <el-button @click="emitCustomEvent">触发grandson3emit事件</el-button>
    <GreatGrandson3 v-bind="$attrs" v-on="$listeners" />
  </div>
</template>
<script>
import GreatGrandson3 from './greatGrandson3.vue';
export default {
  name: 'grandson3',
  props: {
    grandsonProps: String
  },
  data() {
    return {};
  },
  created() {
    console.log('执行顺序grandson3--created');
  },
  mounted() {
    console.log('执行顺序grandson3--mounted');
  },
  computed: {},
  methods: {
    emitCustomEvent() {
      this.$emit('customEvent', '触发grandson3emit事件');
    }
  },
  watch: {},
  components: {
    GreatGrandson3,
  },
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
h2{
  font-size: 2.5rem
}
h3{
  margin:6px 0
}
</style>
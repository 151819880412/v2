<template>
  <div class='children3'>
    <h2>children3</h2>
    <h3>parentProps的值：{{ parentProps }}</h3>
    <h3>grandson3的$attrs: {{ $attrs }}</h3>
    <el-button @click="emitCustomEvent">触发children3emit事件</el-button>
    <Grandson3 v-bind="$attrs" v-on="$listeners" />
  </div>
</template>
<script>
import Grandson3 from './grandson3.vue';
export default {
  name: 'children3',
  props: {
    parentProps: String
  },
  data() {
    return {};
  },
  created() {
    console.log('执行顺序children3--created');
  },
  mounted() { 
    console.log('执行顺序children3--mounted');
  },
  computed: {},
  methods: {
    emitCustomEvent() {
      this.$emit('customEvent', '触发children3emit事件');
    }
  },
  watch: {},
  components: {
    Grandson3
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
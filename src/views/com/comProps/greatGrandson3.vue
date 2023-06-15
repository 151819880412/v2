<template>
  <div class='greatGrandson3'>
    <h2>grandson3</h2>
    <h3>a的值：{{ a }}</h3>
    <h3>b的值：{{ b }}</h3>
    <h3>grandson3Props的值：{{ grandson3Props }}</h3>
    <!-- <h3>c的值：{{ c }}</h3> -->
    <h3>greatGrandson3的$attrs: {{ $attrs }}</h3>
    <el-button @click="emitCustomEvent">触发greatGrandson3事件</el-button>

  </div>
</template>
<script>
export default {
  name: 'greatGrandson3',
  props: ['a', 'b',],
  inject: ['grandson3Props'],
  data() {
    return {};
  },
  created() {
    console.log('执行顺序greatGrandson3--created');
  },
  mounted() {
    console.log('执行顺序greatGrandson3--mounted');
   },
  computed: {},
  methods: {
    emitCustomEvent() {
      this.$emit('customEvent', '触发greatGrandson3事件');
    }
  },
  watch: {},
  components: {},
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
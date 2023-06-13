<template>
  <div class='routingJumpTest'>
    <h1>路由跳转/传参测试</h1>
    <h2>占位符传参:{{ $route.params.id }}</h2>
    <h2>query传参:{{ $route.query.id }}</h2>
    <h2>params传参:{{ $route.params.id }}</h2>
    <h2>props参数{{ id }}</h2>
  </div>

</template>
<script>
export default {
  name: 'routingJumpTest',
  props:  ['id'],
  data() {
    return {};
  },
  created() {},
  mounted() {
    console.log(this)
  },
  computed: {},
  methods: {},
  watch: {},
  components: {},
  beforeDestroy() {}
};
</script>
<style lang='stylus' scoped>
</style>
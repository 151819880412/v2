<template>
  <div class='comMixin2'>
    <el-button @click="getData">get</el-button>
    <el-button @click="setData">set</el-button>
  </div>
</template>
<script>
import mixin from './comMixin';
export default {
  name: 'comMixin2',
  mixins: [mixin],
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
</style>
<template>
  <div class='comMixin'>
    <el-button @click="getData">get</el-button>
    <el-button @click="setData">set</el-button>
    <el-divider></el-divider>
    <ComMixin2 />
  </div>
</template>
<script>
import mixin from './comMixin';
import ComMixin2 from './comMixin2.vue';
export default {
  name: 'comMixin',
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
  components: {
    ComMixin2
  },
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
</style>
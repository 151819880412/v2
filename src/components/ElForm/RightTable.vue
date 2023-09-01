<template>
  <div class='RightTable'>RightTable</div>
</template>
<script>
export default {
  name: 'RightTable',
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  watch: {},
  components: {},
  beforeDestroy() {}
};
</script>
<style lang='stylus' scoped>
.RightTable {
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3px;
  .field-box {
    position: relative;
    height: calc(100vh - 42px);
    box-sizing: border-box;
    overflow: hidden;
  }
  .el-scrollbar {
    height: 100%;
  }
}
</style>
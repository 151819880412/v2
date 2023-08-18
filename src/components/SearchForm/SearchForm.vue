<template>
  <el-row class="container containerTop">
    <el-col>
      <i class="el-icon-search"></i>
      <span> 筛选数据</span>
    </el-col>
    <el-col :style="{ height: isOpen ? '' : '50px' }" style="overflow:hidden">
      <parser :form-conf="formConfig" ref="parser">
      </parser>
    </el-col>
    <el-col>
      <div style="float: right">
        <el-button type="primary" @click="searchSubmit">查询</el-button>
        <el-button type="primary" @click="clear">刷新</el-button>
        <slot name="searchBtn"></slot>
        <el-button type="text" @click="toggleAdvanced">
          <span style="margin-right:6px">{{ isOpen ? '收起' : '展开' }}</span>
          <i class="el-icon-arrow-down rotate" :class="{ 'rotate180': isOpen }"></i>
        </el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import EventBus from '@/utils/EventBus';

export default {
  name: "SearchForm",
  props: {
    formConfig: {
      type: Object,
      default: () => { }
    },
    // formDatas: {
    //   type: Object
    // }
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    async searchSubmit() {
      let data = await this.$refs.parser.submitFormVal()
      EventBus.$emit('searchTableData', data);
    },
    async clear() {
      this.$refs.parser.resetForm()
      let data = await this.$refs.parser.submitFormVal()
      EventBus.$emit('searchTableData', data);
    },
    toggleAdvanced() {
      this.isOpen = !this.isOpen;
    },
  },
  mounted() {
  },
  components: {
  },
};
</script>
<style lang="stylus" scoped>

.container{
  padding:12px
  width:100%
}
.containerTop{
  margin-bottom:12px
}
</style>

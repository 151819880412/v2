<template>
  <el-dialog class='DialogMask' :visible.sync="dialogVisible" v-dialogDrag="fullscreenMode" append-to-body
    destroy-on-close :fullscreen="fullscreenMode" v-bind="dialogMaskData">
    <template #title>
      <div>
        <span>{{ dialogMaskData.title }}</span>
        <i class="el-icon-full-screen" style="float:right;margin-right:22px;cursor: pointer;"
          @click="handleFullscreen"></i>
      </div>
    </template>
    <parser :form-conf="dialogMaskFormData" :form-datas="formDatas" ref="parser" v-if="dialogVisible"></parser>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { isFunction } from '@/utils/is';
import EventBus from '@/utils/EventBus';
import _ from "lodash";

export default {
  name: 'DialogMask',
  props: {
    dialogMaskProps: {
      type: Object,
      required: false,
      default: () => {
        return {
          width: "30%",
          title: "标题",
          // 是否需要对表单数据进行二次处理, 比如 [1,2,3] 转为 1,2,3
          transformData: false,
          axiosMethods: () => { }
        };
      },
    },
    dialogMaskFormProps: {
      type: Object,
      required: false,
      default: () => {
        return {
          fields: []
        };
      },
    },
    formData: {
      type: Object,
      required: false,
      default: () => { }
    },
  },
  data() {
    return {
      // dialogMaskData: _.cloneDeep(this.dialogMaskProps),
      // dialogMaskFormData: _.cloneDeep(this.dialogMaskFormProps),
      // formDatas: _.cloneDeep(this.formData),
      dialogMaskData: {},
      dialogMaskFormData: {},
      formDatas: {},
      dialogVisible: false,
      fullscreenMode: false
    };
  },
  created() { },
  mounted() {
  },
  computed: {},
  methods: {
    init() {
      this.dialogVisible = true;
    },
    initProps(data) {
      this.dialogMaskData = _.cloneDeep(data.dialogMaskProps) || {};
      this.dialogMaskFormData = _.cloneDeep(data.dialogMaskFormProps) || {};
      this.formDatas = _.cloneDeep(data.formData) || {};
      this.dialogVisible = true;
    },
    handleFullscreen() {
      this.fullscreenMode = !this.fullscreenMode;
    },
    async dialogSubmit() {
      let data = await this.$refs.parser.submitFormVal();
      if (this.dialogMaskData.transformData) {
        this.$emit('dialogMaskSubmit', data);
      } else {
        if (this.dialogMaskData.axiosMethods && isFunction(this.dialogMaskData.axiosMethods)) {
          await this.dialogMaskData.axiosMethods(data);
          EventBus.$emit('searchTableData', {});
          this.dialogVisible = false
        }
      }
    }
  },
  watch: {},
  components: {},
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
</style>
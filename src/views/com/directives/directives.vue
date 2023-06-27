<template>
  <div class='directives'>
    <el-col :span="16">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入内容" v-model="value"
        ref="aaa"></el-input>
      <!-- <span ref="aaa">1</span> -->
    </el-col>
    <el-button v-copy="'aaa'"> 单击复制 </el-button>
    <el-divider></el-divider>
    <el-button @click="show">el-dialog拖拽/全屏指令</el-button>
    <el-dialog v-dialogDrag title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-divider></el-divider>
    <!-- 显示 -->
    <el-button v-permission="'1'">权限按钮1</el-button>
    <!-- 不显示 -->
    <el-button v-permission="'10'">权限按钮2</el-button>
    <el-divider></el-divider>
    <div style="height:300px;border:1px solid black;position:relative">
      <div v-draggable style="height:100px;width:100px;border:1px solid black;position:absolute">
        <div class="resizeTag" v-resize />
      </div>
    </div>

  </div>
</template>
<script>
import copy from './copy';
import draggable from './draggable';
import resize from './resize';
import permission from './permission';


export default {
  name: 'directives',
  props: {},
  data() {
    return {
      value: "",
      dialogVisible: false,
    };
  },
  created() { },
  mounted() {
  },
  computed: {},
  methods: {
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
    },
    show() {
      this.dialogVisible = !this.dialogVisible;
    }
  },
  watch: {},
  components: {},
  beforeDestroy() { },
  directives: {
    copy,
    draggable,
    resize,
    permission
  }
};
</script>
<style lang='stylus' scoped>
.fullscreen-container{
  background: #ccc
}
.resizeTag{
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: -5px;
  right: -5px;
  background-color: #49586e;
  z-index: 2600;border-radius: 50%
}
.resizeTag:hover{
  cursor: nwse-resize
}
</style>
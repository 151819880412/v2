<template>
  <div class='comTest'>
    <el-upload ref="upload" :auto-upload="true" :show-file-list="false" :http-request="beforeUpload" action=""
      accept=".xls, .xlsx, .pdf, .doc, .docx .vue" name="files">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-button size="small" type="primary" @click="download">点击下载</el-button>
    <component :is="dynamicComponent"></component>

  </div>
</template>
<script>
import { uploadFiles, getFile } from "@/api/system";
import axios from 'axios';

export default {
  name: 'comTest',
  props: {},
  data() {
    return {
      uploadUrl: '/api/genuine-system/personnelInfo/upload', // 路径
      fileList: [],
      dynamicComponent: null,
    };
  },
  created() { },
  mounted() { },
  computed: {},
  methods: {
    async beforeUpload(file) {

      console.log(file);
      file.filename = file.file.name;
      file.file.filename = file.file.name;
      let data = await uploadFiles(file);
      console.log(data);
      return false;
    },
    async download() {
      let data = await getFile()
      console.log(data)
      let iifeString = data.data;
      this.dynamicComponent = eval(iifeString);
    },
  },
  watch: {},
  components: {},
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
</style>
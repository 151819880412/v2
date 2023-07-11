<template>
  <div class='comTest'>
    <el-upload ref="upload"  :auto-upload="true" :show-file-list="false" :http-request="beforeUpload" action=""
      accept=".xls, .xlsx, .pdf, .doc, .docx .vue" name="files">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>
<script>
import { uploadFiles } from "@/api/system";

export default {
  name: 'comTest',
  props: {},
  data() {
    return {
      uploadUrl: '/api/genuine-system/personnelInfo/upload', // 路径
      fileList: [],

    };
  },
  created() { },
  mounted() { },
  computed: {},
  methods: {
    async beforeUpload(file) {
      
      console.log(file)
      file.filename=file.file.name
      file.file.filename=file.file.name
      let data = await uploadFiles(file)
      console.log(data)
      return false
    },
  },
  watch: {},
  components: {},
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
</style>
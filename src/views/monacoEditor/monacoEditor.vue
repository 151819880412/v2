<template>
  <div class='monacoEditor'>monacoEditor
    <div id="aaa"></div>
    <monaco-editor @onCodeChange="excelTextChanged" types="javascript" :codes="textarea">
    </monaco-editor>
  </div>
</template>
<script>
import MonacoEditor from '@/components/MonacoEditor/MonacoEditor.vue';

export default {
  name: 'test',
  props: {},
  data() {
    return {
      textarea: ""
    };
  },
  created() { },
  mounted() {

  },
  computed: {},
  methods: {
    excelTextChanged(text) {
      // console.log("text", text);
      this.textarea = text;
    },
  },
  watch: {},
  components: {
    MonacoEditor,
  },
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
</style>
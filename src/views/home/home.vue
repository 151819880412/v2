<template>
  <div class='home'>home
    <monaco-editor @onCodeChange="excelTextChanged" types="javascript" :codes="textarea">
    </monaco-editor>
  </div>
</template>
<script>
import MonacoEditor from '@/components/MonacoEditor/MonacoEditor.vue';
import loginVue from '../login/login.vue';
export default {
  name: 'home',
  props: {},
  data() {
    return {
      textarea: ""
    };
  },
  created() { },
  mounted() { },
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
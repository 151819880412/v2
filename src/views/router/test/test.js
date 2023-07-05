import Vue from 'vue';

export default {
  data() {
    return {};
  },
  created() {
  },
  async mounted() {
    // 将字符串保存为临时的.vue文件
    const componentCode = `
    <template>
      <div class='aaa'>aaa</div>
    </template>
    <script>
      export default {
        name: 'aaa',
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
    </style>`;
    const componentPath  = URL.createObjectURL(new Blob([componentCode], { type: 'text/plain' }));

    // 动态注册组件
    // let aa = async () => await import(componentPath);
    // // 动态导入组件
    // Vue.component('aaa',aa);
// aaa.js






    // this.s = true;
  },
  computed: {},
  watch: {},
  components: {},
  beforeDestroy() { }
};

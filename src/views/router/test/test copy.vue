<template>
  <div class='test'>
    路由测试
    <div id="app2" ref="app2"></div>
  </div>
</template>
<script>
import Vue from 'vue';
import homeCopy from '@/views/home/home copy.vue';

let com = {}
export default {
  name: 'test',
  props: {},
  data() {
    return {};
  },
  created() { },
  mounted() {
    let str = `
      {
        components: {
        },
        props: [],
        data() {
          return {
            val:0,
            formData: {
              mobile: undefined,
            },
            rules: {
              mobile: [
                {
                  required: true,
                  message: '请输入手机号',
                  trigger: 'blur',
                },
                {
                  pattern: /^1(3|4|5|7|8|9)\\d{9}$/,
                  message: '手机号格式错误',
                  trigger: 'blur',
                },
              ],
            },
          };
        },
        computed: {},
        watch: {
          val(vl){
            consoel.log(vl)
          }
        },
        created() {},
        mounted() {
          const style = document.createElement('style');
          style.setAttribute('lang', 'css');
          style.setAttribute('scoped', '');
          style.innerHTML = '.aaa{background:yellow}';
          this.$el.appendChild(style);

        },
        methods: {
          submitForm() {
            this.$refs['elForm'].validate((valid) => {
              if (!valid) return;
              console.log(this.formData)
              // TODO 提交表单
            });
          },
          resetForm() {
            this.$refs['elForm'].resetFields();
            this.val+=1
          },
          },
        }
      `;

    let html = `
      <homeCopy/>
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="单行文本" prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号" :maxlength="11" show-word-limit clearable prefix-icon="el-icon-mobile" :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <div class="aaa">111111111</div>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    `;

    const compiled = Vue.compile(`<div class="app2-container">${html}</div>`);
    const App2 = {
      ...eval(`(${str})`),
      components: {
        homeCopy
        },
      render: compiled.render,
      staticRenderFns: compiled.staticRenderFns,
    };

    new Vue({
      render: (h) => h(App2),
    }).$mount(this.$refs.app2);

  },
  computed: {},
  methods: {},
  watch: {},
  components: {
  },
  beforeDestroy() { }
}; 
</script>
<style lang='stylus' scoped>
</style>
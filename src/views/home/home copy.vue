<template>
  <div class='home'>
    homeCopy
    <div id="previewApp"></div>
  </div>
</template>

<script>
import Vue from 'vue';
import homeCopy from '@/views/home/home copy.vue';
import axios from 'axios';
export default {
  name: 'home',
  components: {},
  mounted() {
    // const $previewApp = document.getElementById('previewApp');
    // let str = `
    //   {
    //     components: {
    //       aaa:() => import('@/views/router/test/test.vue')
    //     },
    //     props: [],
    //     data() {
    //       return {
    //         formData: {
    //           mobile: undefined,
    //         },
    //         rules: {
    //           mobile: [
    //             {
    //               required: true,
    //               message: '请输入手机号',
    //               trigger: 'blur',
    //             },
    //             {
    //               pattern: /^1(3|4|5|7|8|9)\\d{9}$/,
    //               message: '手机号格式错误',
    //               trigger: 'blur',
    //             },
    //           ],
    //         },
    //         aaaShow:false
    //       };
    //     },
    //     computed: {},
    //     watch: {},
    //     created() {},
    //     mounted() {
    //       setTimeout(()=>{
    //         this.aaaShow = true
    //       },3333)
    //     },
    //     methods: {
    //       submitForm() {
    //         this.$refs['elForm'].validate((valid) => {
    //           if (!valid) return;
    //           console.log(this.formData)
    //           // TODO 提交表单
    //         });
    //       },
    //       resetForm() {
    //         this.$refs['elForm'].resetFields();
    //       },
    //       },
    //     }
    //   `;

    // let html = `
    //     <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
    //     <el-form-item label="单行文本" prop="mobile">
    //       <el-input v-model="formData.mobile" placeholder="请输入手机号" :maxlength="11" show-word-limit clearable prefix-icon="el-icon-mobile" :style="{width: '100%'}"></el-input>
    //     </el-form-item>
    //     <el-form-item size="large">
    //       <el-button type="primary" @click="submitForm">提交</el-button>
    //       <aaa v-if="aaaShow"/>
    //       <el-button @click="resetForm">重置</el-button>
    //     </el-form-item>
    //   </el-form>
    // `;


    // let css = `
    //   .aaa{
    //     backgrond:red
    //   }
    // `;

    // $previewApp.innerHTML = `<style>${css}</style><div id="app2"></div>`;

    // const compiled = Vue.compile(`<div class="app2-container">${html}</div>`);
    // const App2 = {
    //   ...eval(`(${str})`),
    //   render: compiled.render,
    //   staticRenderFns: compiled.staticRenderFns,
    // };

    // new Vue({
    //   render: (h) => h(App2),
    //   // }).$mount(this.$refs.app2);
    // }).$mount('#app2');

  },
};
</script>

<template>
  <div class='login'>
    <el-form :model="loginFormData" :rules="loginRules" ref="loginForm" label-width="100px" class="demo-loginFormData">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="loginFormData.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginFormData.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toLogin">登录</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-button @click="cancel">取消请求</el-button> -->

  </div>
</template>
<script>
import { login } from '@/api/login';
import { AxiosCanceler } from '@/utils/http/axiosCancel';
import createRoutes from '@/router/createRoutes';
import { HomeRoute } from '@/router/routes';

export default {
  name: 'login',
  props: {},
  data() {
    return {
      loginFormData: {
        userName: "admin",
        password: "123456"
      },
      loginRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  created() { },
  mounted() {
    localStorage.clear();
    this.$store.commit('resetAllStates');
  },
  computed: {},
  methods: {
    cancel() {
      const axiosCanceler = new AxiosCanceler();
      axiosCanceler.removeAllPending();
    },
    async toLogin() {

      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          let { data } = await login({
            userName: this.loginFormData.userName,
            password: this.loginFormData.password
          });
          // 假设这是后端返回的路由
          const menu = await createRoutes();
          // 默认显示主页
          menu.unshift(HomeRoute);
          data.menu = menu;
          this.$store.dispatch('setUserInfo', data);
          this.$router.push('/home');
        }
      });
    },
  },
  watch: {},
  components: {},
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
</style>
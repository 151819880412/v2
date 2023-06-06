<template>
  <div class='login'>
    <el-form :model="loginFormData" :rules="loginRules" ref="loginForm" label-width="100px" class="demo-loginFormData">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginFormData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginFormData.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toLogin">登录</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="queryUser">查询用户</el-button>
    <el-button @click="cancel">取消请求</el-button>

  </div>
</template>
<script>
import { login, queryUserPage } from '@/api/login';
import { AxiosCanceler } from '@/utils/http/axiosCancel';
import createRoutes from '@/router/createRoutes';

export default {
  name: 'login',
  props: {},
  data() {
    return {
      loginFormData: {},
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  created() { },
  mounted() { },
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
            username: this.loginFormData.username,
            password: this.loginFormData.password
          });
          // 假设这是后端返回的路由
          const menu = await createRoutes()
          data.menu = menu
          this.$store.dispatch('setUserInfo', data);
          this.$router.push('/home');
        }
      });
    },
    async queryUser() {
      let data = await queryUserPage(1, 10, {});
    }
  },
  watch: {},
  components: {},
  beforeDestroy() { }
};
</script>
<style lang='stylus' scoped>
</style>
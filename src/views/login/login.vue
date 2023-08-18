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
    transMenu(data) {
      if (!data || data.length === 0) {
        return;
      }
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.children && item.children.length > 0) {
          this.transMenu(item.children);
        }
        const items = JSON.parse(JSON.stringify(item));
        items.children = undefined;
        item.meta = {
          dynamic: true,
          title: item.menuName,
          ...items
        };
        item.path = item.routerPath;
        item.name = item.componentName;
        if (item.componentName == 'AppLayout') {
          item.component = () => import('@/views/layout/AppLayout.vue');
        } else {
          item.component = () => import(`@/views${item.componentPath}`);
        }
      }
    },
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
          // let menu = await createRoutes();
          let menu = [];
          // 默认显示主页
          menu.unshift(HomeRoute);
          // 这是真的路由
          this.transMenu(data.user.menus);
          menu = data.user.menus.concat(menu)
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
const initialState = {
  userInfo: {}
};
// 这是后端返回的菜单路由
// 完整的菜单路由应该是后端返回+前端主页/404/其他。。。
if (JSON.parse(localStorage.getItem('userInfo'))) {
  const transMenu = async (data) => {
    if (!data || data.length === 0) {
      return;
    }
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.children && item.children.length > 0) {
        transMenu(item.children);
      }
      if (item.componentName == 'AppLayout') {
        item.component = () => import('@/views/layout/AppLayout.vue');
      } else {
        item.component = () => import(`@/views${item.componentPath}`);
      }
    }
  };
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  transMenu(userInfo.user.menus);
  initialState.userInfo = userInfo;
}

const user = {
  state: {
    ...initialState
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
    getUserId(state) {
      return state.userInfo?.userId || '';
    },
    getToken(state) {
      return {
        accessToken: state.userInfo?.accessToken,
        refreshToken: state.userInfo?.refreshToken,
      };
    },
    getMenu(state) {
      return state.userInfo?.menu || [];
    },
  },
  // 支持异步函数
  actions: {
    setUserInfo({ commit, state }, data) {
      commit('setUserInfo', data);
    },
    resetState({ commit, state },) {
      commit('resetState',);
    },
    setToken({ commit, state },data){
      commit('setToken',data);
    }
  },
  // 不支持异步函数
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data;
      localStorage.setItem('userInfo', JSON.stringify(data));
    },
    resetState(state) {
      // 重置状态为初始值
      Object.assign(state, initialState);
    },
    setToken(state,data) {
      state.userInfo.accessToken = data.accessToken
      state.userInfo.refreshToken = data.refreshToken
      const userStr = localStorage.getItem('userInfo');
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));

    },
  },

};

export default user;
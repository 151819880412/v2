const user = {
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
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
  },
  // 不支持异步函数
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data;
      localStorage.setItem('userInfo', JSON.stringify(data));
    },
  },

};

export default user;
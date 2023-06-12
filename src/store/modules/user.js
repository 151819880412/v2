const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
};
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
  },

};

export default user;
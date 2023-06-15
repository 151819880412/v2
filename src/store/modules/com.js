const initialState = {
  num:0
};
const com = {
  state: {
    ...initialState
  },
  getters: {
    getComProps(state) {
      return state.num;
    },
  },
  // 支持异步函数
  actions: {
    setComProps({ commit, state }, data) {
      commit('setComProps', data);
    },
    resetState({ commit, state },) {
      commit('resetState',);
    },
  },
  // 不支持异步函数
  mutations: {
    setComProps(state, data) {
      state.num += data;
    },
    resetState(state) {
      // 重置状态为初始值
      Object.assign(state, initialState);
    },
  },

};

export default com;
// import store from '../index';
const initialState = {
  // 路由是否动态添加
  isDynamicAddedRoute: false,
  // 触发菜单更新
  lastBuildMenuTime: 0,
  // 菜单列表
  MenuList: [],
};
const permission = {
  state: {
    ...initialState
  },
  getters: {
    getMenuList(state) {
      return state.MenuList;
    },
    getLastBuildMenuTime(state) {
      return state.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(state) {
      return state.isDynamicAddedRoute;
    },
  },
  // 支持异步函数
  actions: {
    setMenuList({ commit, state }, list) {
      commit('setMenuList', list);
    },
    setLastBuildMenuTime({ commit, state },) {
      commit('setLastBuildMenuTime',);
    },
    setDynamicAddedRoute({ commit, state }, added) {
      commit('setDynamicAddedRoute', added);
    },
    resetState({ commit, state },) {
      commit('resetState',);
    },
    buildRoutesAction({ commit, state },) {
      commit('buildRoutesAction',);
    },
  },
  // 不支持异步函数
  mutations: {
    setMenuList(state, list) {
      state.MenuList = list;
      list?.length > 0 && this.commit('setLastBuildMenuTime',);
    },
    setLastBuildMenuTime(state) {
      state.lastBuildMenuTime = new Date().getTime();
    },
    setDynamicAddedRoute(state, added) {
      state.isDynamicAddedRoute = added;
    },
    resetState(state) {
      // state.isDynamicAddedRoute = false;
      // state.MenuList = [];
      // state.lastBuildMenuTime = 0;
      Object.assign(state, initialState);

    },
    // 构建路由
    async buildRoutesAction(state) {
      let routes = [];
      this.commit('setMenuList', routes);
      return routes;
    },
  },

};


// export function usePermissionStoreWithOut() {
//   // 动态注册模块
//   store.registerModule('permission', permission);
//   return permission;
// }

export default permission;
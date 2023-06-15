import Vue from 'vue'
import Vuex from 'vuex'

import permission from './modules/permission'
import user from './modules/user'
import com from './modules/com'

Vue.use(Vuex)

// 辅助函数，用于重置所有模块的状态
function resetAllModuleStates(store) {
  Object.keys(store).forEach((moduleName) => {
    const module = store[moduleName]
    if (module.mutations && module.mutations.resetState) {
      // 每个模块需要提供resetState方法
      store.commit(`${moduleName}/resetState`)
    }
  })
}

export default new Vuex.Store({
  modules: {
    permission,
    user,
    com,
    // 其他模块...
  },
  mutations: {
    resetAllStates(state) {
      resetAllModuleStates(state)
    }
  },
})
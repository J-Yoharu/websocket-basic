import { createStore } from 'vuex'

export default createStore({
  state: {
    user: JSON.parse(localStorage.user || '{}')
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    user(state, payload) {
      state.user = payload;
      localStorage.user = JSON.stringify(payload);
    }
  },
  actions: {
  },
  modules: {
  }
})

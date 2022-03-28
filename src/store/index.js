import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: [],
  },
  getters: {
    getUser: state => state.user,
  },
  mutations: {
    ADD_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = [];
    },
  },
  actions: {
    addUserToState({ commit }, user) {
      commit('ADD_USER', user);
    },
    clearUserState({ commit }) {
      commit('CLEAR_USER');
    },
  },
  modules: {},
});

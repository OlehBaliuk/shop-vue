import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    cart: {},
    searchProduct: {},
  },

  getters: {
    getUser: state => state.user,

    getCart: state => state.cart,

    getSearchProduct: state => state.searchProduct,
  },

  mutations: {
    ADD_USER(state, user) {
      state.user = user;
    },

    CLEAR_USER(state) {
      state.user = {};
    },

    ADD_PRODUCT_TO_CART(state, product) {
      const productWithCount = { ...product, count: 1 };

      Vue.set(state.cart, [product.id], productWithCount);
    },

    DELETE_PRODUCT_FROM_CART(state, productId) {
      Vue.delete(state.cart, productId);
    },

    CLEARE_CART(state) {
      state.cart = {};
    },

    INCREMENT_PRODUCT(state, productId) {
      state.cart[productId].count += 1;
    },

    DECREMENT_PRODUCT(state, productId) {
      if (state.cart[productId].count > 1) {
        state.cart[productId].count -= 1;
      }
    },

    CHANGE_COUNT_PRODUCT(state, payload) {
      state.cart[payload.productId].count = payload.count;
    },

    ADD_SEARCH_PRODUCT_TO_STATE(state, payload) {
      state.searchProduct = { ...payload };
    },
  },

  actions: {
    addUserToState({ commit }, user) {
      commit('ADD_USER', user);
    },

    clearUserState({ commit }) {
      commit('CLEAR_USER');
    },

    addProductToState({ commit }, product) {
      commit('ADD_PRODUCT_TO_CART', product);
    },

    deleteProductFromCart({ commit }, product) {
      commit('DELETE_PRODUCT_FROM_CART', product);
    },

    cleareCart({ commit }) {
      commit('CLEARE_CART');
    },

    incrementProductInCart({ commit }, productId) {
      commit('INCREMENT_PRODUCT', productId);
    },

    decrementProductInCart({ commit }, productId) {
      commit('DECREMENT_PRODUCT', productId);
    },
    changeCountProduct({ commit }, payload) {
      commit('CHANGE_COUNT_PRODUCT', payload);
    },

    addSearchProductToState({ commit }, payload) {
      commit('ADD_SEARCH_PRODUCT_TO_STATE', payload);
    },
  },

  modules: {},
});

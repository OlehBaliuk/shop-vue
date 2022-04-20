import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    cart: {},
    flags: {},
    filter: {
      page: {
        key: '_page',
        value: 1,
      },
      from: {
        key: 'price_gte',
        value: undefined,
      },
      to: {
        key: 'price_lte',
        value: undefined,
      },
    },
  },

  getters: {
    getUser: state => state.user,

    getCart: state => state.cart,

    filter: state => state.filter,

    flag: state => state.flags,
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

    UPDATE_FILTER_FIELD(state, payload) {
      state.filter[payload.field].value = payload.value;
    },

    UPDATE_PAGE(state, page) {
      state.filter.page.value = page;
    },

    RESET_FILTER(state) {
      state.filter = {
        from: {
          key: 'price_gte',
          value: undefined,
        },
        to: {
          key: 'price_lte',
          value: undefined,
        },
        page: {
          key: '_page',
          value: 1,
        },
      };
    },

    CREATE_FIELD_FILTER(state, payload) {
      state.filter[payload.field] = payload.filterParams;
    },

    CHANGE_FLAG(state, payload) {
      Vue.set(state.flags, [payload.field], payload.value);
    },
  },

  actions: {
    addUserToState({ commit }, user) {
      commit('ADD_USER', user);
    },

    clearUserState({ commit }) {
      commit('CLEAR_USER');
    },

    addProductToStateCart({ commit }, product) {
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

    updateFilterField({ commit }, payload) {
      commit('UPDATE_FILTER_FIELD', payload);
    },

    updatePage({ commit }, page) {
      commit('UPDATE_PAGE', page);
    },

    resetFilter({ commit }) {
      commit('RESET_FILTER');
    },

    createFieldFilter({ commit }, payload) {
      commit('CREATE_FIELD_FILTER', payload);
    },

    changeFlag({ commit }, payload) {
      commit('CHANGE_FLAG', payload);
    },
  },

  modules: {},
});

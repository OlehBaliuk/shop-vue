import Header from '@/components/Header.vue';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import customWrapper from './utils/utils';

describe('Header', () => {
  const getters = {
    getCart: () => ({}),
    getUser: () => ({}),
  };

  Vue.use(Vuex);
  Vue.use(VueRouter);

  const store = new Vuex.Store({
    getters,
  });

  const options = {
    mocks: {
      $store: store,
    },
  };

  it('should be render', () => {
    const wrapper = customWrapper(Header, options);
    expect(wrapper.isVisible()).toBe(true);
  });
});

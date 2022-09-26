import UserMenu from '@/components/sharedComponents/UserMenu.vue';
import Vue from 'vue';
import Vuex from 'vuex';
import customWrapper from './utils/utils';

describe('UserMenu', () => {
  const getters = {
    getUser: () => [],
    admins: () => [],
  };

  Vue.use(Vuex);

  const store = new Vuex.Store({
    getters,
  });

  const options = {
    mocks: {
      $store: store,
    },
  };

  it('should be render', () => {
    const wrapper = customWrapper(UserMenu, options);
    expect(wrapper.isVisible()).toBe(true);
  });
});

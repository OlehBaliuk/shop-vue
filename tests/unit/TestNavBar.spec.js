import NavBar from '@/components/sharedComponents/NavBar.vue';
import Vue from 'vue';
import Vuex from 'vuex';
import customWrapper from './utils/utils';

describe('NavBar', () => {
  const getters = {
    admins: () => [],
  };

  Vue.use(Vuex);

  const store = new Vuex.Store({
    getters,
  });

  const options = {
    computed: {
      isFilter() {
        return true;
      },
    },
    mocks: {
      $store: store,
    },
  };

  it('should be render', () => {
    const wrapper = customWrapper(NavBar, options);
    expect(wrapper.isVisible()).toBe(true);
  });
});

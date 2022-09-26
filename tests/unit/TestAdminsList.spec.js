import AdminsList from '@/components/AdminsList.vue';
import HttpService from '@/services/HttpService';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import customWrapper from './utils/utils';

const mockAdmins = {
  data: [{ email: 'abc@ab.ab' }],
};

jest.spyOn(HttpService, 'get').mockResolvedValue(mockAdmins);

describe('AdminsList', () => {
  const getters = {
    admins: () => [
      [
        {
          email: 'abc@ab.ab',
        },
      ],
    ],
    getUser: () => ({
      email: 'abc@ab.ab',
    }),
  };

  const actions = {
    addAdminsToState: jest.fn(),
  };

  Vue.use(Vuex);
  Vue.use(VueRouter);

  const store = new Vuex.Store({
    getters,
    actions,
  });

  const options = {
    mocks: {
      $store: store,
    },
  };

  it('should be render', () => {
    const wrapper = customWrapper(AdminsList, options);
    expect(wrapper.isVisible()).toBe(true);
  });

  it('should be call setAdminsToState', () => {
    const setAdminsToState = jest.spyOn(AdminsList.options.methods, 'setAdminsToState');
    customWrapper(AdminsList, options);
    expect(setAdminsToState).toHaveBeenCalledTimes(1);
  });
});

import App from '@/App.vue';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuex from 'vuex';
import HttpService from '@/services/HttpService';
import customWrapper from './utils/utils';

const admins = {
  data: [{}],
};

jest.spyOn(HttpService, 'get').mockResolvedValue(admins);

describe('App', () => {
  const actions = {
    addAdminsToState: jest.fn(),
  };

  Vue.use(Vuex);
  Vue.use(VueRouter);

  const store = new Vuex.Store({
    actions,
  });

  const options = {
    mocks: {
      $store: store,
    },
  };

  it('should be render', () => {
    const wrapper = customWrapper(App, options);
    expect(wrapper.isVisible()).toBe(true);
  });
});

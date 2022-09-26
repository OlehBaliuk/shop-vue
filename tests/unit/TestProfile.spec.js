import Profile from '@/components/Profile.vue';
import HttpService from '@/services/HttpService';
import Vue from 'vue';
import Vuex from 'vuex';
import customWrapper from './utils/utils';

const mockUsers = {
  data: [
    {
      email: 'milan@ab.ab',
      first: 'Milan',
      last: 'Badel',
      age: 18,
      birthDay: '',
      phone: '',
      country: '',
      city: '',
      gender: '',
      avatar: '',
      contactType: '',
      id: 80,
    },
  ],
};

jest.spyOn(HttpService, 'get').mockResolvedValue(mockUsers);

describe('Profile', () => {
  const getters = {
    getUser: () => ({ sub: 74 }),
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

  it('should be exists', () => {
    const wrapper = customWrapper(Profile, options);
    expect(wrapper.exists()).toBe(true);
  });
});

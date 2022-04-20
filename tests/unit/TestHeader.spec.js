import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Header from '@/components/Header.vue';
import Vuex from 'vuex';
import Vue from 'vue';
import VueRouter from 'vue-router';

describe('Header', () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  let vuetify;
  let getters;
  let store;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();

    getters = {
      getCart: () => ({
        image: '',
        name: 'T-shirt',
        description: 'bla-bla-bla',
        price: 1300,
        id: 3,
        rating: 5,
      }),
      getUser: () => ({
        email: 'abc@ab.ab',
      }),
    };

    Vue.use(Vuex);

    store = new Vuex.Store({
      getters,
    });
  });

  it('should be render', () => {
    const wrapper = shallowMount(Header, {
      localVue,
      vuetify,
      store,
      router,
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});

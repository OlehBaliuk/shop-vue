import Catalog from '@/components/Catalog.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import HttpService from '@/services/HttpService';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Vue from 'vue';
import VueObserveVisibility from 'vue-observe-visibility';

require('intersection-observer');

const mockProduct = {
  data: [{ id: 1, title: 'title' }],
  headers: {
    'x-total-count': 1,
  },
};

jest.spyOn(HttpService, 'get').mockResolvedValue(mockProduct);

describe('Catalog', () => {
  const localVue = createLocalVue();
  let vuetify;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();

    getters = {
      filter: () => ({
        page: {
          key: '_page',
          value: 1,
        },
      }),
      flag: () => ({
        searchByName: true,
        searchByPrice: true,
      }),
    };

    actions = {
      updateFilter: jest.fn(),
      updatePage: jest.fn(),
      resetFilter: jest.fn(),
    };

    Vue.use(Vuex);
    Vue.use(VueObserveVisibility);

    store = new Vuex.Store({
      getters,
      actions,
    });
  });

  it('should be render', async () => {
    const wrapper = shallowMount(Catalog, {
      localVue,
      vuetify,
      store,
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should be call deleteProduct', async () => {
    const wrapper = shallowMount(Catalog, {
      localVue,
      vuetify,
      store,
    });

    wrapper.vm.deleteProduct = jest.fn();
    wrapper.vm.deleteProduct();
    expect(wrapper.vm.deleteProduct).toHaveBeenCalledTimes(1);
  });

  it('should be call getProductFromDB', async () => {
    const getProductFromDB = jest.spyOn(Catalog.methods, 'getProductFromDB');

    shallowMount(Catalog, {
      localVue,
      vuetify,
      store,
    });

    expect(getProductFromDB).toHaveBeenCalledTimes(1);
  });
});

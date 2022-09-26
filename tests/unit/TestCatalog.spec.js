import Catalog from '@/components/Catalog.vue';
import HttpService from '@/services/HttpService';
import VueObserveVisibility from 'vue-observe-visibility';
import Vue from 'vue';
import Vuex from 'vuex';
import customWrapper from './utils/utils';

require('intersection-observer');

const mockProduct = {
  data: [{}],
  headers: {
    'x-total-count': 1,
  },
};

jest.spyOn(Catalog.methods, 'updatePage');
jest.spyOn(HttpService, 'get').mockResolvedValue(mockProduct);

describe('Catalog', () => {
  const getters = {
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

  const actions = {
    updatePage: jest.fn(),
    resetFilter: jest.fn(),
  };

  Vue.use(Vuex);
  Vue.use(VueObserveVisibility);

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
    const wrapper = customWrapper(Catalog, options);
    expect(wrapper.isVisible()).toBe(true);
  });

  it('should be call deleteProduct', async () => {
    const wrapper = customWrapper(Catalog, options);

    wrapper.vm.deleteProduct = jest.fn();
    wrapper.vm.deleteProduct();
    expect(wrapper.vm.deleteProduct).toHaveBeenCalledTimes(1);
  });

  it('should be call getProductFromDB', async () => {
    const getProductFromDB = jest.spyOn(Catalog.options.methods, 'getProductFromDB');

    customWrapper(Catalog, options);

    expect(getProductFromDB).toHaveBeenCalledTimes(1);
  });
});

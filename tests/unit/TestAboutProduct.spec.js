import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import AboutProduct from '@/components/AboutProduct.vue';
import VueRouter from 'vue-router';
import HttpService from '@/services/HttpService';
import Vuex from 'vuex';
import Vue from 'vue';

const mockProduct = {
  data: [
    {
      image: '3.jpg',
      name: 'T-shirt',
      description: 'bla-bla-bla',
      price: 1300,
      id: 3,
      rating: 5,
    },
  ],
};

jest.spyOn(HttpService, 'get').mockResolvedValue(mockProduct);

describe('AboutProduct', () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  let vuetify;
  let router;
  let getters;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();

    const app = document.createElement('div');
    app.setAttribute('data-app', true);
    document.body.append(app);

    getters = {
      getCart: () => ({
        image: '3.jpg',
        name: 'T-shirt',
        description: 'bla-bla-bla',
        price: 1300,
        id: 3,
        rating: 5,
      }),
    };

    Vue.use(Vuex);

    store = new Vuex.Store({
      getters,
    });
  });

  it('should be render', () => {
    const wrapper = mount(AboutProduct, {
      localVue,
      vuetify,
      store,
      router,
      computed: {
        getProductImage() {
          return '1.jpg';
        },
      },
      global: {
        mocks: {
          $route: { params: { id: '' } },
        },
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should be call getProduct', () => {
    const getProduct = jest.spyOn(AboutProduct.methods, 'getProduct');
    mount(AboutProduct, {
      localVue,
      vuetify,
      store,
      router,
      computed: {
        getProductImage() {
          return '1.jpg';
        },
      },
      global: {
        mocks: {
          $route: { params: { id: '' } },
        },
      },
    });

    expect(getProduct).toHaveBeenCalledTimes(1);
  });
});

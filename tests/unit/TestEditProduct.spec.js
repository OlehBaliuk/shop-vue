import EditProduct from '@/components/EditProduct.vue';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import HttpService from '@/services/HttpService';

const mockProduct = {
  data: { id: 1, title: 'title' },
};

jest.spyOn(HttpService, 'get').mockResolvedValue(mockProduct);

describe('EditProduct', () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  let vuetify;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  it('should be render', () => {
    const wrapper = mount(EditProduct, {
      localVue,
      vuetify,
      router,
      global: {
        mocks: {
          $route: { params: { id: '' } },
        },
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});

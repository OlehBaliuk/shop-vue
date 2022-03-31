import AddNewProduct from '@/components/AddNewProduct.vue';
import { mount, createLocalVue } from '@vue/test-utils';
import HttpService from '@/services/HttpService';
import Vuetify from 'vuetify';

jest.mock('@/services/HttpService');

describe('AddNewProduct', () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('should be render', () => {
    const wrapper = mount(AddNewProduct, {
      localVue,
      vuetify,
    });
    expect(wrapper.isVisible()).toBe(true);
  });

  it('handle onSubmit', async () => {
    const wrapper = mount(AddNewProduct, {
      localVue,
      vuetify,
    });

    const newProduct = {
      name: 'abc',
      description: 'abc',
      price: '123',
      image: '',
    };

    wrapper.vm.submit(newProduct);

    expect(HttpService.post).toHaveBeenCalledTimes(1);

    expect(HttpService.post).toBeCalledWith('/products', newProduct);
  });
});

import AddNewProduct from '@/components/AddNewProduct.vue';
import HttpService from '@/services/HttpService';
import route from '@/constants/routes';
import customWrapper from './utils/utils';

jest.mock('@/services/HttpService');

describe('AddNewProduct', () => {
  it('should be render', () => {
    const wrapper = customWrapper(AddNewProduct);
    expect(wrapper.isVisible()).toBe(true);
  });

  it('handle onSubmit', async () => {
    const wrapper = customWrapper(AddNewProduct);

    const newProduct = {
      name: 'abc',
      description: 'abc',
      price: '123',
      image: '',
    };

    wrapper.vm.submit(newProduct);

    expect(HttpService.post).toHaveBeenCalledTimes(1);

    expect(HttpService.post).toBeCalledWith(`${route.products}`, newProduct);
  });
});

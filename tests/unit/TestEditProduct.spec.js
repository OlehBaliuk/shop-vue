import EditProduct from '@/components/EditProduct.vue';
import HttpService from '@/services/HttpService';
import customWrapper from './utils/utils';

const mockProduct = {
  data: {},
};

jest.spyOn(HttpService, 'get').mockResolvedValue(mockProduct);

describe('EditProduct', () => {
  const options = {
    mocks: {
      $route: { params: { id: '' } },
    },
  };

  it('should be render', () => {
    const wrapper = customWrapper(EditProduct, options);
    expect(wrapper.isVisible()).toBe(true);
  });
});

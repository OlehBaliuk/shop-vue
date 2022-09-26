import AboutProduct from '@/components/AboutProduct.vue';
import HttpService from '@/services/HttpService';
import customWrapper from './utils/utils';

const mockProduct = {
  data: [{}],
};

jest.spyOn(HttpService, 'get').mockResolvedValue(mockProduct);

describe('About Product', () => {
  const store = {
    getters: {
      getCart: {},
    },
  };

  const options = {
    mocks: {
      $store: store,
      $route: { params: { id: '' } },
    },
    computed: {
      productImage() {
        return '1.jpg';
      },
    },
  };

  it('should be render', () => {
    const wrapper = customWrapper(AboutProduct, options);
    expect(wrapper.isVisible()).toBe(true);
  });

  it('should be call getProduct', () => {
    const getProduct = jest.spyOn(AboutProduct.options.methods, 'getProduct');
    customWrapper(AboutProduct, options);
    expect(getProduct).toHaveBeenCalledTimes(1);
  });
});

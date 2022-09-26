import Cart from '@/components/Cart.vue';
import customWrapper from './utils/utils';

jest.spyOn(Cart.methods, 'getProductImage').mockReturnValue('1.jpg');

describe('Cart', () => {
  const store = {
    getters: {
      getCart: { name: 'T-shirt' },
    },
  };

  const options = {
    mocks: {
      $store: store,
    },
  };

  it('should be render', () => {
    const wrapper = customWrapper(Cart, options);
    expect(wrapper.isVisible()).toBe(true);
  });

  it('should be call onChangeCountProduct', async () => {
    const wrapper = customWrapper(Cart, options);

    wrapper.vm.onChangeCountProduct = jest.fn();

    await wrapper.find('[data-test="input"]').trigger('change');
    expect(wrapper.vm.onChangeCountProduct).toHaveBeenCalledTimes(1);
  });
});

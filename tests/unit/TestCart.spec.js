import Cart from '@/components/Cart.vue';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import Vuetify from 'vuetify';

describe('Cart', () => {
  const localVue = createLocalVue();
  let vuetify;
  let getters;
  let store;

  beforeEach(() => {
    jest.spyOn(Cart.methods, 'getProductImage').mockReturnValue('1.jpg');

    vuetify = new Vuetify();

    getters = {
      getCart: () => ({
        image: '',
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
    const wrapper = mount(Cart, {
      localVue,
      vuetify,
      store,
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should be call onChangeCountProduct', async () => {
    const wrapper = mount(Cart, {
      localVue,
      vuetify,
      store,
    });

    wrapper.vm.onChangeCountProduct = jest.fn();

    await wrapper.find('[data-test="input"]').trigger('change');
    expect(wrapper.vm.onChangeCountProduct).toHaveBeenCalledTimes(1);
  });
});

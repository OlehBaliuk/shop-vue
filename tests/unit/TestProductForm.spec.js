import ProductForm from '@/components/sharedComponents/ProductForm.vue';
import { createLocalVue } from '@vue/test-utils';
import customWrapper from './utils/utils';

describe('ProductForm', () => {
  const localVue = createLocalVue();

  const options = {
    localVue,
  };
  it('should be render', () => {
    const wrapper = customWrapper(ProductForm, options);
    expect(wrapper.isVisible()).toBe(true);
  });
});

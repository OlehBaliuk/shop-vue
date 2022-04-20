import RegistrationForm from '@/components/RegistrationForm.vue';
import { shallowMount } from '@vue/test-utils';

describe('RegistrationForm', () => {
  it('should be render', () => {
    const wrapper = shallowMount(RegistrationForm);

    expect(wrapper.isVisible()).toBe(true);
  });
});

import LoginForm from '@/components/LoginForm.vue';
import { shallowMount } from '@vue/test-utils';

describe('LoginForm', () => {
  it('should be render', () => {
    const wrapper = shallowMount(LoginForm);
    expect(wrapper.isVisible()).toBe(true);
  });
});

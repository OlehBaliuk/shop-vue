import LoginForm from '@/components/LoginForm.vue';
import customWrapper from './utils/utils';

describe('LoginForm', () => {
  it('should be render', () => {
    const wrapper = customWrapper(LoginForm);
    expect(wrapper.isVisible()).toBe(true);
  });
});

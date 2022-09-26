import RegistrationForm from '@/components/RegistrationForm.vue';
import customWrapper from './utils/utils';

describe('RegistrationForm', () => {
  it('should be render', () => {
    const wrapper = customWrapper(RegistrationForm);
    expect(wrapper.isVisible()).toBe(true);
  });
});

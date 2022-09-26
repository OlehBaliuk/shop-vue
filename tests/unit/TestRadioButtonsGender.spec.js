import RadioButtonsGender from '@/components/sharedComponents/RadioButtonsGender.vue';
import customWrapper from './utils/utils';

describe('RadioButtonsGender', () => {
  it('should be render', () => {
    const wrapper = customWrapper(RadioButtonsGender);
    expect(wrapper.isVisible()).toBe(true);
  });
});

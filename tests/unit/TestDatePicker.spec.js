import DatePicker from '@/components/sharedComponents/DatePicker.vue';
import customWrapper from './utils/utils';

describe('DatePicker', () => {
  it('should be render', () => {
    const wrapper = customWrapper(DatePicker);
    expect(wrapper.isVisible()).toBe(true);
  });
});

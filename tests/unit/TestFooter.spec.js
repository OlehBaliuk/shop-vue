import Footer from '@/components/Footer.vue';
import customWrapper from './utils/utils';

describe('Footer', () => {
  it('should be render', () => {
    const wrapper = customWrapper(Footer);
    expect(wrapper.isVisible()).toBe(true);
  });
});

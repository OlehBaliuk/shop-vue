import NavBar from '@/components/sharedComponents/NavBar.vue';
import customWrapper from './utils/utils';

describe('NavBar', () => {
  const options = {
    computed: {
      isFilter() {
        return true;
      },
    },
  };

  it('should be render', () => {
    const wrapper = customWrapper(NavBar, options);
    expect(wrapper.isVisible()).toBe(true);
  });
});

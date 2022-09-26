import DialogAreYouSure from '@/components/sharedComponents/DialogAreYouSure.vue';
import customWrapper from './utils/utils';

describe('DialogAreYouSure', () => {
  const opts = {
    title: 'Delete product',
  };

  it('should be render', () => {
    const wrapper = customWrapper(DialogAreYouSure);
    expect(wrapper.isVisible()).toBe(true);
  });

  it('should be call show', () => {
    const wrapper = customWrapper(DialogAreYouSure);
    wrapper.vm.show = jest.spyOn(DialogAreYouSure.options.methods, 'show');
    wrapper.vm.show(opts);
    expect(wrapper.vm.show).toHaveBeenCalled();
  });
});

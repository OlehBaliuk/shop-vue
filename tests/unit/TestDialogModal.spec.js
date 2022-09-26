import DialogModal from '@/components/sharedComponents/DialogModal.vue';
import customWrapper from './utils/utils';

describe('DialogModal', () => {
  const propsDialog = {
    title: 'error',
    isFlag: true,
    content: 'message',
  };

  const options = {
    propsData: propsDialog,
  };

  it('should be render', () => {
    const wrapper = customWrapper(DialogModal);
    expect(wrapper.isVisible()).toBe(true);
  });

  it('props transfer', () => {
    const wrapper = customWrapper(DialogModal, options);

    expect(wrapper.props()).toStrictEqual(propsDialog);
  });
});

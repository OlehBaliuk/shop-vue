import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import DialogModal from '@/components/sharedComponents/DialogModal.vue';

describe('DialogModal', () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();

    const app = document.createElement('div');
    app.setAttribute('data-app', true);
    document.body.append(app);
  });

  it('should be render', () => {
    const wrapper = mount(DialogModal, {
      localVue,
      vuetify,
    });
    expect(wrapper.isVisible()).toBe(true);
  });

  it('props transfer', () => {
    const propsDialog = {
      title: 'error',
      isFlag: true,
      content: 'message',
    };
    const wrapper = mount(DialogModal, {
      propsData: propsDialog,
      localVue,
      vuetify,
    });

    expect(wrapper.props()).toStrictEqual(propsDialog);
  });
});

import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Footer from '@/components/Footer.vue';

describe('Footer', () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('should be render', () => {
    const wrapper = mount(Footer, {
      localVue,
      vuetify,
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});

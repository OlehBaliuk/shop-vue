import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import NavBar from '@/components/sharedComponents/NavBar.vue';
import VueRouter from 'vue-router';

describe('NavBar', () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  let vuetify;
  let router;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  it('should be render', () => {
    const wrapper = mount(NavBar, {
      localVue,
      vuetify,
      router,
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});

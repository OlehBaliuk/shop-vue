import App from '@/App.vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

describe('App', () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  let router;

  beforeEach(() => {
    router = new VueRouter();
  });

  it('should be render', () => {
    const wrapper = shallowMount(App, { localVue, router });
    expect(wrapper.isVisible()).toBe(true);
  });
});

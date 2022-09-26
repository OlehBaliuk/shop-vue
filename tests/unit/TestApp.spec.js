import App from '@/App.vue';
import VueRouter from 'vue-router';
import Vue from 'vue';
import customWrapper from './utils/utils';

describe('App', () => {
  Vue.use(VueRouter);

  it('should be render', () => {
    const wrapper = customWrapper(App);
    expect(wrapper.isVisible()).toBe(true);
  });
});

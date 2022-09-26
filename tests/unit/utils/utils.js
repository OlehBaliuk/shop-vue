import { shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';

const customWrapper = (component, options) => {
  Vue.use(Vuetify);

  const root = document.createElement('div');
  root.setAttribute('data-app', 'true');
  root.id = 'root';
  document.body.appendChild(root);

  const wrapper = shallowMount(component, {
    attachTo: root,
    vuetify: new Vuetify(),
    ...options,
    mocks: {
      ...options?.mocks,
    },
  });
  return wrapper;
};

export default customWrapper;

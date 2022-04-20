import FilterForm from '@/components/sharedComponents/FilterForm.vue';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import vueDebounce from 'vue-debounce';
import Vuetify from 'vuetify';

describe('FilterForm', () => {
  const localVue = createLocalVue();
  let vuetify;
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();

    getters = {
      filter: () => ({
        from: {
          value: 0,
        },
        to: {
          value: 100,
        },
      }),
    };

    actions = {
      updateFilterField: jest.fn(),
    };

    Vue.use(Vuex);

    Vue.use(vueDebounce);

    store = new Vuex.Store({
      getters,
      actions,
    });
  });

  it('should be render', () => {
    const wrapper = mount(FilterForm, { store });
    expect(wrapper.isVisible()).toBe(true);
  });

  it('submit a form', async () => {
    const filterFrom = 0;
    const filterTo = 100;
    const wrapper = mount(FilterForm, { store });

    wrapper.vm.submit = jest.fn();

    await wrapper.find('[data-test="from"]').setValue(filterFrom);
    await wrapper.find('[data-test="to"]').setValue(filterTo);
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.vm.submit).toHaveBeenCalledTimes(1);
  });

  it('click to the clear button', async () => {
    const wrapper = mount(FilterForm, { store, localVue, vuetify });

    wrapper.vm.clearFilterState = jest.fn();

    await wrapper.find('[data-test="button-clear"]').trigger('click');

    expect(wrapper.emitted('onClearFilterState')).toHaveLength(1);
  });

  it('event onInput', async () => {
    const wrapper = mount(FilterForm, { store });
    const filterTo = 100;

    wrapper.vm.onChangeFilter = jest.fn();

    await wrapper.find('[data-test="to"]').setValue(filterTo);

    expect(wrapper.vm.onChangeFilter).toHaveBeenCalledTimes(1);
  });

  it('send data to store', async () => {
    const wrapper = mount(FilterForm, { store });
    const filterTo = 100;

    wrapper.vm.updateFilterField = jest.fn();

    await wrapper.find('[data-test="to"]').setValue(filterTo);

    expect(wrapper.vm.updateFilterField).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.updateFilterField).toBeCalledWith({ field: 'to', value: 100 });
  });
});

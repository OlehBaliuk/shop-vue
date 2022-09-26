import FilterForm from '@/components/sharedComponents/FilterForm.vue';
import vueDebounce from 'vue-debounce';
import Vue from 'vue';
import Vuex from 'vuex';
import customWrapper from './utils/utils';

describe('FilterForm', () => {
  const getters = {
    filter: () => ({
      from: {
        value: 0,
      },
      to: {
        value: 100,
      },
    }),
  };

  const actions = {
    updateFilterField: jest.fn(),
  };

  Vue.use(Vuex);
  Vue.use(vueDebounce);

  const store = new Vuex.Store({
    getters,
    actions,
  });

  const options = {
    mocks: {
      $store: store,
    },
  };

  it('should be render', () => {
    const wrapper = customWrapper(FilterForm, options);
    expect(wrapper.isVisible()).toBe(true);
  });

  it('submit a form', async () => {
    const filterFrom = 0;
    const filterTo = 100;
    const wrapper = customWrapper(FilterForm, options);

    wrapper.vm.submit = jest.fn();

    await wrapper.find('[data-test="from"]').setValue(filterFrom);
    await wrapper.find('[data-test="to"]').setValue(filterTo);
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.vm.submit).toHaveBeenCalledTimes(1);
  });

  it('send data to store', async () => {
    const wrapper = customWrapper(FilterForm, options);
    const filterTo = 100;

    wrapper.vm.updateFilterField = jest.fn();

    await wrapper.find('[data-test="to"]').setValue(filterTo);

    expect(wrapper.vm.updateFilterField).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.updateFilterField).toBeCalledWith({ field: 'to', value: 100 });
  });
});

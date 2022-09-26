import SearchInput from '@/components/sharedComponents/SearchInput.vue';
import vueDebounce from 'vue-debounce';
import Vue from 'vue';
import Vuex from 'vuex';
import customWrapper from './utils/utils';

describe('SearchInput', () => {
  const getters = {
    filter: () => ({}),
  };

  const actions = {
    createFieldFilter: jest.fn(),
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
    const wrapper = customWrapper(SearchInput, options);
    expect(wrapper.isVisible()).toBe(true);
  });

  it('submit a form', async () => {
    const searchName = 'name';
    const wrapper = customWrapper(SearchInput, options);

    wrapper.vm.submit = jest.fn();

    await wrapper.find('[ data-test="searchField"]').setValue(searchName);
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.vm.submit).toHaveBeenCalledTimes(1);
  });

  it('send data to store', async () => {
    const searchName = 'name';
    const params = {
      field: 'search',
      filterParams: { value: 'name', key: 'name_like' },
    };
    const wrapper = customWrapper(SearchInput, options);

    wrapper.vm.createFieldFilter = jest.fn();

    await wrapper.find('[data-test="searchField"]').setValue(searchName);

    expect(wrapper.vm.createFieldFilter).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.createFieldFilter).toBeCalledWith(params);
  });
});

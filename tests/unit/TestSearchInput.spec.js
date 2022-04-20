import SearchInput from '@/components/sharedComponents/SearchInput.vue';
import { mount } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import vueDebounce from 'vue-debounce';

describe('SearchInput', () => {
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      filter: () => ({
        search: {
          key: null,
          value: null,
        },
      }),
    };

    actions = {
      createFieldFilter: jest.fn(),
    };

    Vue.use(Vuex);

    Vue.use(vueDebounce);

    store = new Vuex.Store({
      getters,
      actions,
    });
  });

  it('should be render', () => {
    const wrapper = mount(SearchInput, { store });
    expect(wrapper.isVisible()).toBe(true);
  });

  it('submit a form', async () => {
    const searchName = 'name';
    const wrapper = mount(SearchInput, { store });

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
    const wrapper = mount(SearchInput, { store });

    wrapper.vm.createFieldFilter = jest.fn();

    await wrapper.find('[data-test="searchField"]').setValue(searchName);

    expect(wrapper.vm.createFieldFilter).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.createFieldFilter).toBeCalledWith(params);
  });
});

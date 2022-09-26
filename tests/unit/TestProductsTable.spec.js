import ProductsTable from '@/components/ProductsTable.vue';
import HttpService from '@/services/HttpService';
import customWrapper from './utils/utils';

const mockProduct = {
  data: [{}],
};

jest.spyOn(HttpService, 'get').mockResolvedValue(mockProduct);

describe('ProductsTable', () => {
  it('should be render', () => {
    const wrapper = customWrapper(ProductsTable);
    expect(wrapper.isVisible()).toBe(true);
  });

  it('should be call initialize', () => {
    const initialize = jest.spyOn(ProductsTable.options.methods, 'initialize');
    customWrapper(ProductsTable);
    expect(initialize).toHaveBeenCalledTimes(1);
  });
});

import AutocompleteAddress from '@/components/sharedComponents/AutocompleteAddress.vue';
import customWrapper from './utils/utils';

jest.spyOn(AutocompleteAddress.options.methods, 'searchCountry').mockReturnValue([{}]);
jest.spyOn(AutocompleteAddress.options.methods, 'searchCity').mockReturnValue([{}]);

describe('AutocompleteAddress', () => {
  it('should be call searchCountry', () => {
    const searchCountry = jest.spyOn(AutocompleteAddress.options.methods, 'searchCountry');
    customWrapper(AutocompleteAddress);
    expect(searchCountry).toHaveBeenCalledTimes(1);
  });
});

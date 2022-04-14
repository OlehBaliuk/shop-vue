import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import FormProduct from '@/components/sharedComponents/ProductForm.vue';

describe('FormProduct', () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('submits a form', async () => {
    const wrapper = mount(FormProduct, {
      localVue,
      vuetify,
    });

    const name = 'name';
    const description = 'description';
    const price = 100;

    await wrapper.find('[data-test="nameText"]').setValue(name);

    await wrapper.find('[data-test="descriptionText"]').setValue(description);

    await wrapper.find('[data-test="price"]').setValue(price);

    await wrapper.find('[data-test="checkbox"]').setChecked();

    await wrapper.find('form').trigger('submit.prevent');

    const dataProduct = wrapper.emitted('onSubmit')[0][0];

    expect(dataProduct).toEqual({
      name,
      description,
      price,
    });
  });
});

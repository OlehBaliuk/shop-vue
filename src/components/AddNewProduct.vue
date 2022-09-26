<template>
  <div>
    <h1 class="my-5">Add new Product</h1>
    <FormProduct @onSubmit="submit" :product="dataProduct" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import HttpService from '@/services/HttpService';
import route from '@/constants/routes';
import FormProduct from './sharedComponents/ProductForm.vue';
import { IProduct } from './interfaces/interfaces';

@Component({
  components: {
    FormProduct,
  },
})
export default class AddNewProduct extends Vue {
  dataProduct: IProduct = {
    name: '',
    description: '',
    price: '',
    image: '',
    quantity: 5,
    rating: 3,
  };

  async submit(newProduct: IProduct) {
    const data = await HttpService.post(`${route.products}`, newProduct);
    if (data) {
      this.$router.push({ name: 'catalog', params: { locale: this.$i18n.locale } });
    }
  }
}
</script>

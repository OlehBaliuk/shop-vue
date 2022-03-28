<template>
  <div>
    <h1 class="my-5">Add new Product</h1>
    <FormProduct @onSubmit="submit" :product="dataProduct" />
  </div>
</template>

<script>
import FormProduct from './sharedComponents/FormProduct.vue';
import HttpService from '../services/HttpService';

export default {
  name: 'AddNewProduct',

  data() {
    return {
      dataProduct: {
        name: '',
        description: '',
        price: '',
        image: '',
      },
    };
  },

  components: {
    FormProduct,
  },

  methods: {
    submit(newProduct) {
      HttpService.post('/products', newProduct);
    },
  },
};
</script>

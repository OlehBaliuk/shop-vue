<template>
  <div>
    <h1 class="my-5">Add new Product</h1>
    <FormProduct @onSubmit="submit" :product="dataProduct" />
  </div>
</template>

<script>
import route from '@/constants/routes';
import HttpService from '@/services/HttpService';
import FormProduct from './sharedComponents/ProductForm.vue';

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
    async submit(newProduct) {
      const data = await HttpService.post(`${route.products}`, newProduct);
      if (data) {
        this.$router.push({ path: route.catalog });
      }
    },
  },
};
</script>

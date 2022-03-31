<template>
  <div>
    <h1 class="my-5">Add new Product</h1>
    <FormProduct @onSubmit="submit" :product="dataProduct" />
  </div>
</template>

<script>
import routes from '@/constants/routes';
import HttpService from '@/services/HttpService';
import FormProduct from './sharedComponents/FormProduct.vue';

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
      const response = await HttpService.post(`${routes.products}`, newProduct);
      if (response) {
        this.$router.push({ path: routes.catalog });
      }
    },
  },
};
</script>

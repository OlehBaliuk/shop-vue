<template>
  <div>
    <h1 class="my-5">Edit Product</h1>
    <FormProduct v-if="!loading" @onSubmit="submit" :product="editData" />
  </div>
</template>

<script>
import FormProduct from './sharedComponents/FormProduct.vue';
import HttpService from '../services/HttpService';

export default {
  name: 'EditProduct',

  components: {
    FormProduct,
  },

  data() {
    return {
      editData: {},
      loading: true,
    };
  },

  methods: {
    submit(newProduct) {
      HttpService.put(`/products/${this.$route.params.id}`, newProduct);
    },

    async getProductFromDB() {
      const result = await HttpService.get(`/products/${this.$route.params.id}`);
      return result;
    },
  },
  async mounted() {
    this.editData = await this.getProductFromDB();
    this.loading = false;
  },
};
</script>

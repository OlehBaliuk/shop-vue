<template>
  <div>
    <h1 class="my-5">Edit Product</h1>
    <FormProduct v-if="!loading" @onSubmit="submit" :product="editData" />
  </div>
</template>

<script>
import HttpService from '@/services/HttpService';
import routes from '@/constants/routes';
import FormProduct from './sharedComponents/FormProduct.vue';

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
    async submit(newProduct) {
      const response = await HttpService.put(`${routes.products}/${this.$route.params.id}`, newProduct);
      if (response) {
        this.$router.push({ path: routes.catalog });
      }
    },

    async getProductFromDB() {
      const result = await HttpService.get(`${routes.products}/${this.$route.params.id}`);
      return result;
    },
  },
  async mounted() {
    this.editData = await this.getProductFromDB();
    this.loading = false;
  },
};
</script>

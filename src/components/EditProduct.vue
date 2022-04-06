<template>
  <div>
    <h1 class="my-5">Edit Product</h1>
    <FormProduct v-if="!loading" @onSubmit="submit" :product="editData" />
  </div>
</template>

<script>
import HttpService from '@/services/HttpService';
import route from '@/constants/routes';
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
      const { data } = await HttpService.put(`${route.products}/${this.$route.params.id}`, newProduct);
      if (data) {
        this.$router.push({ path: route.catalog });
      }
    },

    async getProductFromDB() {
      const { data } = await HttpService.get(`${route.products}/${this.$route.params.id}`);
      return data;
    },
  },
  async mounted() {
    this.editData = await this.getProductFromDB();
    this.loading = false;
  },
};
</script>

<template>
  <div>
    <h1 class="my-5">Edit Product</h1>
    <FormProduct v-if="!loading" @onSubmit="submit" :product="editData" />
  </div>
</template>

<script lang="ts">
import HttpService from '@/services/HttpService';
import route from '@/constants/routes';
import { Vue, Component } from 'vue-property-decorator';
import FormProduct from './sharedComponents/ProductForm.vue';

@Component({
  components: {
    FormProduct,
  },
})
export default class EditProduct extends Vue {
  editData = {};

  loading: boolean = true;

  async submit(newProduct: any) {
    const { data } = await HttpService.put(`${route.products}/${this.$route.params.id}`, newProduct);
    if (data) {
      this.$router.back();
    }
  }

  async getProductFromDB() {
    const { data } = await HttpService.get(`${route.products}/${this.$route.params.id}`);
    return data;
  }

  async mounted() {
    this.editData = await this.getProductFromDB();
    this.loading = false;
  }
}
</script>

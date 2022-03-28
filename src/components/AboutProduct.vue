<template>
  <div>
    <div v-if="isLoader">loading..</div>
    <div v-else>
      <v-card class="mx-4 my-4" width="400">
        <v-img
          class="white--text align-end"
          object-fit="cover"
          height="400"
          :src="require('../assets/images/' + product.image)"
        >
          <v-card-title class="black--text"></v-card-title>
        </v-img>
        <v-card-subtitle class="pb-0"> price:{{ product.price }} </v-card-subtitle>
        <v-card-subtitle class="pb-0"> description: {{ product.description }} </v-card-subtitle>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="teal lighten-1" text> Add to cart </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import HttpService from '@/services/HttpService';

export default {
  name: 'AboutProduct',

  data() {
    return {
      product: null,
      isLoader: true,
    };
  },

  async mounted() {
    const data = await HttpService.get(`/products/${this.$route.params.id}`);

    this.product = data;
    this.isLoader = !this.isLoader;
  },
};
</script>

<style scoped lang="scss"></style>

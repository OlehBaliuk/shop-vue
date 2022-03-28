<template>
  <v-card class="mx-4 my-4" width="300">
    <v-img
      class="white--text align-end"
      object-fit="cover"
      height="200"
      :src="require('../assets/images/' + product.image)"
    >
      <v-card-title class="black--text">{{ product.name }}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0"> price:{{ product.price }} </v-card-subtitle>
    <v-card-actions class="d-flex justify-center">
      <v-btn :disabled="isDisable" @click="addProduct(product)" color="teal lighten-1" text
        >{{ changeTitleButton }}
      </v-btn>
      <v-btn color="teal lighten-1" text router-link :to="'/catalog/' + product.id"> About product </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Product',

  props: {
    product: {
      type: Object,
    },
  },
  methods: {
    ...mapActions(['addProductToState']),

    addProduct(product) {
      this.addProductToState(product);
    },
  },

  computed: {
    ...mapGetters(['getCart']),

    isDisable() {
      return Object.keys(this.getCart).includes(String(this.product.id));
    },
    changeTitleButton() {
      if (Object.keys(this.getCart).includes(String(this.product.id))) {
        return 'In a cart';
      }
      return 'Add to cart';
    },
  },
};
</script>

<style scoped lang="scss">
.product-item {
  font-size: 1.5rem;
  border: 1px solid black;
  margin: 2rem;

  .product-item__image {
    height: 20rem;
    width: 15rem;
    object-fit: cover;
  }
}
</style>

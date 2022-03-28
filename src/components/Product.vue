<template>
  <v-card class="mx-4 my-4" max-width="400">
    <v-img
      class="white--text align-end"
      object-fit="cover"
      height="200"
      :src="require('../assets/images/' + product.image)"
    >
      <v-card-title class="black--text">{{ product.name }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0"> price:{{ product.price }} </v-card-subtitle>

    <v-card-actions>
      <v-btn color="teal lighten-1" text> Add to cart </v-btn>

      <v-btn color="teal lighten-1" text> About product </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
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

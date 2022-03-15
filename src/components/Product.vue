<template>
  <div class="product-item">
    <img class="product-item__image" :src="require('../assets/images/' + product.image)" alt="" />
    <p class="product-item__name">{{ product.name }}</p>
    <p class="product-item__price">price:{{ product.price }}</p>
    <p class="product-item__description">description:{{ product.description }}</p>
    <Button title="add to cart" class="product-item__button" />
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
    },
  },
  components: {
    Button,
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

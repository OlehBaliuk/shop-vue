<template>
  <div class="catalog">
    <h1>Search result</h1>
    <h2 v-if="isProduct">not found</h2>
    <div class="product-wrapper">
      <Product v-for="product in getSearchProduct" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Product from './Product.vue';

export default {
  name: 'SearchProducts',

  components: {
    Product,
  },

  computed: {
    ...mapGetters(['getSearchProduct']),

    isProduct() {
      return Object.entries(this.getSearchProduct).length === 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>

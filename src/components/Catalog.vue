<template>
  <div class="catalog">
    <h1>Catalog</h1>
    <div class="product-wrapper">
      <Product v-for="product in productsList" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import ProductService from '../services/productService';
import Product from './Product.vue';

export default {
  name: 'Catalog',
  data() {
    return {
      productsList: [],
    };
  },

  components: {
    Product,
  },
  async created() {
    const data = await ProductService.get();
    this.productsList = data;
  },
};
</script>

<style scoped lang="scss">
.product-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>

<template>
  <div class="catalog">
    <h1>Catalog</h1>
    <div class="product-wrapper">
      <Product @onDelete="deleteProduct" v-for="product in productsList" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import HttpService from '@/services/HttpService';
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

  methods: {
    async getProductFromDB() {
      const data = await HttpService.get('/products');

      this.productsList = data;
    },

    deleteProduct(productId) {
      this.productsList = this.productsList.filter(product => product.id !== productId);
    },
  },

  created() {
    this.getProductFromDB();
  },
};
</script>

<style scoped lang="scss">
.product-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>

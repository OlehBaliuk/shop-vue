<template>
  <div class="catalog">
    <h1>Catalog</h1>
    <div class="product-wrapper">
      <Product @onDelete="deleteProduct" v-for="product in productsList" :key="product.id" :product="product" />
      <div v-if="productsList.length" v-observe-visibility="handleScroll"></div>
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
      page: 1,
      totalPosts: null,
    };
  },

  components: {
    Product,
  },

  methods: {
    async getProductFromDB() {
      const data = await HttpService.get(`/products?_page=${this.page}`);

      const newProductList = [...this.productsList, ...data.data];

      this.totalPosts = data.headers['x-total-count'];

      this.productsList = newProductList;
    },

    deleteProduct(productId) {
      this.productsList = this.productsList.filter(product => product.id !== productId);
    },

    handleScroll(isVisible) {
      if (!isVisible || this.totalPosts <= this.productsList.length) {
        return;
      }

      this.page += 1;

      this.getProductFromDB();
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

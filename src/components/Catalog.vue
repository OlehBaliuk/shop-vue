<template>
  <div class="catalog">
    <h1>Catalog</h1>
    <div class="form-wrapper">
      <InputSearch @onSubmit="onSubmitSearch" />
      <FilterForm @onSubmit="onSubmitFilter" @onClearFilterState="clearFilterState" />
    </div>
    <div class="product-wrapper">
      <Product @onDelete="deleteProduct" v-for="product in productsList" :key="product.id" :product="product" />
      <h1 v-if="!productsList.length">no result</h1>
      <div v-if="productsList.length" v-observe-visibility="handleScroll"></div>
    </div>
  </div>
</template>

<script>
import HttpService from '@/services/HttpService';
import { mapGetters, mapActions } from 'vuex';
import FilterForm from '@/components/sharedComponents/FilterForm.vue';
import route from '@/constants/routes';
import InputSearch from './sharedComponents/SearchInput.vue';
import Product from './Product.vue';

export default {
  name: 'Catalog',
  data() {
    return {
      productsList: [],
      totalPosts: null,
    };
  },

  components: {
    Product,
    FilterForm,
    InputSearch,
  },

  methods: {
    ...mapActions(['updateFilter', 'updatePage', 'resetFilter']),

    async getProductFromDB() {
      const query = this.createQuery(this.filter);

      const data = await HttpService.get(`${route.products}?${query}`);

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
      this.updatePage(this.filter.page.value + 1);
      this.getProductFromDB();
    },

    onSubmitFilter() {
      this.productsList = [];
      this.updatePage(1);
      this.getProductFromDB();
    },

    clearFilterState() {
      this.resetFilter();
      this.productsList = [];
      this.getProductFromDB();
    },

    async onSubmitSearch() {
      this.productsList = [];
      this.updatePage(1);
      this.getProductFromDB();
    },

    createQuery(filterData) {
      return Object.keys(filterData).reduce((acc, key) => {
        if (filterData[key]?.value === undefined) return acc;
        return `${acc}&${filterData[key].key}=${filterData[key].value}`;
      }, '');
    },
  },

  computed: {
    ...mapGetters(['filter']),
  },

  created() {
    this.updatePage(1);
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

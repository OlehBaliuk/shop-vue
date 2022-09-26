<template>
  <div class="catalog">
    <div class="form-wrapper">
      <InputSearch v-if="$store.getters.flag.searchByName" @onSubmit="onSubmitSearch" />
      <FilterForm
        v-if="$store.getters.flag.searchByPrice"
        @onSubmit="onSubmitFilter"
        @onClearFilterState="clearFilterState"
      />
    </div>
    <v-btn
      v-if="$store.getters.flag.searchByName || $store.getters.flag.searchByPrice"
      @click="clearFilterState"
      data-test="button-clear"
      text
      color="primary"
      >clear filter</v-btn
    >
    <DialogAreYouSure ref="DialogAreYouSure" :isDialog="isDialog" />
    <div class="product-wrapper">
      <Product
        @onDelete="deleteProduct"
        data-test="product"
        v-for="product in productsList"
        :key="product.id"
        :product="product"
      />
      <div v-if="productsList.length" v-observe-visibility="handleScroll"></div>
    </div>
  </div>
</template>

<script lang="ts">
import HttpService from '@/services/HttpService';
import FilterForm from '@/components/sharedComponents/FilterForm.vue';
import route from '@/constants/routes';
import { Vue, Component } from 'vue-property-decorator';
import { AxiosResponse } from 'axios';
import InputSearch from './sharedComponents/SearchInput.vue';
import DialogAreYouSure from './sharedComponents/DialogAreYouSure.vue';
import Product from './Product.vue';
import { IfilterData } from './interfaces/interfaces';

@Component({
  components: {
    Product,
    FilterForm,
    InputSearch,
    DialogAreYouSure,
  },
})
export default class Catalog extends Vue {
  productsList: any = [];

  totalPosts: null | string = null;

  isDialog: boolean = false;

  async getProductFromDB() {
    try {
      const query = this.createQuery(this.$store.getters.filter);

      const data: AxiosResponse = await HttpService.get(`${route.products}?${query}`);

      const newProductList = [...this.productsList, ...data.data];

      this.totalPosts = data.headers['x-total-count'];

      this.productsList = newProductList;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteProduct(productId: number) {
    this.isDialog = true;

    (this.$refs as any).DialogAreYouSure.show({
      title: 'Delete product',
    }).then(async (isOk: string) => {
      if (isOk) {
        const { data }: AxiosResponse = await HttpService.delete(`${route.products}/${productId}`);
        if (data) {
          this.productsList = this.productsList.filter((product: any) => product.id !== productId);
          this.isDialog = false;
        }
      } else {
        this.isDialog = false;
      }
    });
  }

  handleScroll(isVisible: boolean) {
    if (!isVisible || (this.totalPosts as any) <= this.productsList.length) {
      return;
    }
    this.$store.dispatch('updatePage', this.$store.getters.filter.page.value + 1);
    this.getProductFromDB();
  }

  onSubmitFilter() {
    this.productsList = [];
    this.$store.dispatch('updatePage', 1);
    this.getProductFromDB();
  }

  clearFilterState() {
    this.$store.dispatch('resetFilter');
    this.productsList = [];
    this.getProductFromDB();
  }

  async onSubmitSearch() {
    this.productsList = [];
    this.$store.dispatch('updatePage', 1);
    this.getProductFromDB();
  }

  createQuery = (filterData: IfilterData) =>
    Object.keys(filterData).reduce((acc, key) => {
      if (filterData[key]?.value === undefined) return acc;
      return `${acc}&${filterData[key].key}=${filterData[key].value}`;
    }, '');

  created() {
    this.$store.dispatch('updatePage', 1);
    this.getProductFromDB();
  }
}
</script>

<style scoped lang="scss">
.product-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.form-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 0.3rem;
}
</style>

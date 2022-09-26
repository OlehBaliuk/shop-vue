<template>
  <div>
    <h2 class="my-5">About product</h2>
    <v-progress-linear v-if="isLoader" indeterminate color="cyan"></v-progress-linear>
    <div class="wrapper d-flex flex-wrap" v-else>
      <div>
        <div class="d-flex flex-column justify-space-between align-center mx-5 my-5">
          <v-slider v-model="widthSlider" class="align-self-stretch" min="200" max="400" step="1"></v-slider>
          <v-img :width="widthSlider" :src="require('../../public/images/' + getProductImage)"></v-img>
          <v-btn data-test="btn-rating" @click="changeRating" width="100%">
            <v-rating v-model="product.rating" icon-label="custom icon label text {0} of {1}"></v-rating>
          </v-btn>
        </div>
      </div>
      <div>
        <v-card class="mx-5 my-5" width="300" elevation="2" outlined
          ><v-card-text>
            <p class="text-h5 text--primary mb-3">{{ product.name }}</p>
            <div class="text-subtitle-2">Price: {{ product.price }}</div>
            <div class="text--primary">
              {{ product.description }}
            </div>
          </v-card-text>
          <v-btn :disabled="isDisable" @click="addProductToStateCart(product)" color="teal lighten-1" text
            >{{ changeTitleButton }}
          </v-btn>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import HttpService from '@/services/HttpService';
import { mapActions, mapGetters } from 'vuex';
import route from '@/constants/routes';

export default {
  name: 'AboutProduct',

  data() {
    return {
      product: null,
      isLoader: true,
      widthSlider: 250,
    };
  },

  methods: {
    changeRating() {
      HttpService.put(`${route.products}/${this.$route.params.id}`, this.product);
    },

    async getProduct() {
      const { data } = await HttpService.get(`${route.products}/${this.$route.params.id}`);

      this.product = data;
      this.isLoader = !this.isLoader;
    },

    ...mapActions(['addProductToStateCart']),
  },

  computed: {
    ...mapGetters(['getCart']),

    getProductImage() {
      return this.product.image === '' ? '1.jpg' : this.product.image;
    },

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

  async mounted() {
    this.getProduct();
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
}
</style>

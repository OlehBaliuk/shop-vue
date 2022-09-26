<template>
  <div>
    <h2 class="my-5">About product</h2>
    <v-progress-linear v-if="isLoader" indeterminate color="cyan"></v-progress-linear>
    <div class="wrapper d-flex flex-wrap" v-else>
      <div>
        <div class="d-flex flex-column justify-space-between align-center mx-5 my-5">
          <v-slider
            v-model="widthSlider"
            class="align-self-stretch"
            min="200"
            max="400"
            step="1"
          ></v-slider>
          <v-img :width="widthSlider" :src="require('../../public/images/' + productImage)"></v-img>
          <v-btn data-test="btn-rating" @click="changeRating" width="100%">
            <v-rating

              v-model="product.rating"

              icon-label="custom icon label text {0} of {1}"

            ></v-rating>
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
          <v-btn
            :disabled="isDisableButtonAddToCart"
            @click="$store.dispatch('addProductToStateCart', product)"
            color="teal lighten-1"
            text
            >{{ changeTitleButton }}
          </v-btn>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import HttpService from '@/services/HttpService';
import route from '@/constants/routes';
import { AxiosResponse } from 'axios';
import { IProduct } from './interfaces/interfaces';

@Component
export default class AboutProduct extends Vue {
  product: null | IProduct = null;

  isLoader: boolean = true;

  widthSlider: number = 250;

  changeRating() {
    HttpService.put(`${route.products}/${this.$route.params.id}`, this.product);
  }

  async getProduct() {
    const { data }: AxiosResponse = await HttpService.get(
      `${route.products}/${this.$route.params.id}`,
    );

    this.product = data;
    this.isLoader = !this.isLoader;
  }

  get productImage() {
    return (this.product as IProduct).image === '' ? '1.jpg' : (this.product as IProduct).image;
  }

  get isDisableButtonAddToCart() {
    return Object.keys(this.$store.getters.getCart).includes(String((this.product as IProduct).id));
  }

  get changeTitleButton() {
    return Object.keys(this.$store.getters.getCart).includes(String((this.product as IProduct).id))
      ? 'In a cart'
      : 'Add to cart';
  }

  mounted() {
    this.getProduct();
  }
}
</script>

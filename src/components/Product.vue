<template>
  <v-card class="mx-4 my-4 xs-" width="300">
    <v-img
      class="main-image white--text align-end"
      object-fit="cover"
      height="200"
      :src="require('/public/images/' + getProductImage())"
    >
      <v-btn router-link :to="'/edit-product/' + product.id" class="icon-edit"
        ><v-icon color="black">mdi-pencil-outline</v-icon>
      </v-btn>
      <v-btn @click="deleteProductFromDB(product.id)" class="icon-delete">
        <v-icon color="black">mdi-delete-forever</v-icon>
      </v-btn>

      <v-card-title class="black--text">{{ product.name }}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0"> price:{{ product.price }} </v-card-subtitle>
    <v-card-actions class="d-flex justify-center">
      <v-btn :disabled="isDisable" @click="addProductToStateCart(product)" color="teal lighten-1" text
        >{{ changeTitleButton }}
      </v-btn>
      <v-btn color="teal lighten-1" text router-link :to="'/catalog/' + product.id"> About product </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import HttpService from '@/services/HttpService';
import route from '@/constants/routes';

export default {
  name: 'Product',

  props: {
    product: {
      type: Object,
    },
  },
  methods: {
    ...mapActions(['addProductToStateCart']),

    getProductImage() {
      return this.product.image === '' ? '1.jpg' : this.product.image;
    },

    async deleteProductFromDB(productId) {
      const { data } = await HttpService.delete(`${route.products}/${productId}`);
      if (data) {
        this.$emit('onDelete', this.product.id);
      }
    },
  },

  computed: {
    ...mapGetters(['getCart']),

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
};
</script>

<style scoped lang="scss">
.icon-edit,
.icon-delete {
  display: none;
  position: absolute;
  top: 0;
}

.main-image:hover {
  .icon-edit {
    display: flex;
    background-color: rgba(192, 188, 188, 0.5);
  }
  .icon-delete {
    display: flex;
    background-color: rgba(192, 188, 188, 0.5);
    right: 0;
  }
}
</style>

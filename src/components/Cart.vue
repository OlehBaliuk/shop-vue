<template>
  <div class="cart-wrapper">
    <h1>Cart</h1>
    <div v-if="isEmpty">Cart is empty</div>
    <div
      v-else
      v-for="product in $store.getters.getCart"
      data-test="product"
      :key="product.id"
      class="product-wrapper"
    >
      <v-col class="py-0" cols="12">
        <div class="product-wrapper__info">
          <div class="d-flex align-center">
            <img
              class="product-wrapper__img"
              :src="require('../../public/images/' + getProductImage(product))"
              alt="img"
            />
            <div class="product-wrapper__text">
              <p>name: {{ product.name }}</p>
            </div>
          </div>
          <div></div>
          <div class="product-wrapper__quantity">
            <v-icon
              @click="$store.dispatch('decrementProductInCart', product.id)"
              data-test="decrement"
              slot="prepend"
              color="green"
              >mdi-minus</v-icon
            >
            <label for="countProduct">
              <input
                min="1"
                data-test="input"
                type="number"
                id="countProduct"
                :value="product.count"
                @change="onChangeCountProduct(product.id, $event)"
                @input="onInput"
                @blur="onBlur(product.id, $event)"
              />
            </label>
            <v-icon
              @click="$store.dispatch('incrementProductInCart', product.id)"
              data-test="increment"
              slot="append"
              color="red"
              >mdi-plus</v-icon
            >
          </div>
          <div class="price-wrapper">
            <p>{{ product.price }} UAH</p>
            <v-btn
              @click="$store.dispatch('deleteProductFromCart', product.id)"
              data-test="delete"
              x-small
              color="cyan lighten-4 black--text"
              depressed
              >delete</v-btn
            >
          </div>
        </div>
      </v-col>
    </div>
    <div v-if="!isEmpty" class="cart-wrapper__total-field">
      <h2>Total: {{ countTotalCost }} UAH</h2>
      <v-btn
        @click="$store.dispatch('cleareCart')"
        data-test="clear"
        color="cyan lighten-4 black--text"
        depressed
        >clear cart</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { IProduct } from './interfaces/interfaces';

@Component
export default class Cart extends Vue {
  product: null | IProduct = null;

  isLoader: boolean = false;

  get isEmpty(): boolean {
    return !Object.keys(this.$store.getters.getCart).length;
  }

  get countTotalCost(): number {
    const total = Object.values(this.$store.getters.getCart).reduce(
      (acc: number, item: any) => acc + item.price * item.count,
      0,
    );

    return total;
  }

  onChangeCountProduct(productId: number, e: any): void {
    this.$store.dispatch('changeCountProduct', { productId, count: Number(e.target.value) });
  }

  onBlur(productId: number, e: any): void {
    if (e.target.value === '' || e.target.value === '0') {
      this.$store.dispatch('changeCountProduct', { productId, count: 1 });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getProductImage(product: IProduct): string {
    return product.image === '' ? '1.jpg' : product.image;
  }

  onInput = (e: any): void => {
    if (e.target.value === '0') e.target.value = 1;
  };
}
</script>

<style scoped lang="scss">
.cart-wrapper {
  width: 60%;

  .product-wrapper__info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgb(179, 170, 170);
    padding: 0.5rem;
    margin: 0.5rem;

    .product-wrapper__img {
      height: 4rem;
      width: 4rem;
      object-fit: cover;
    }

    .product-wrapper__input {
      width: 3rem;
      border: 1px solid black;
      border-radius: 5px;
    }

    .product-wrapper__count {
      font-size: 1.2rem;
    }

    .product-wrapper__text {
      width: 10rem;
      text-align: start;
      margin-left: 1rem;
    }

    .price-wrapper {
      width: 7rem;
    }
  }
}

#countProduct {
  border: 1px solid black;
  border-radius: 3px;
  width: 4rem;
  text-align: center;
}
</style>

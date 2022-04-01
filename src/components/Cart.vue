<template>
  <div class="cart-wrapper">
    <h1>Cart</h1>
    <div v-if="isEmpty">Cart is empty</div>

    <div v-else v-for="product in getCart" :key="product.id" class="product-wrapper">
      <v-col class="py-0" cols="12">
        <div class="product-wrapper__info">
          <div class="d-flex align-center">
            <img
              class="product-wrapper__img"
              :src="require('/public/images/' + (product.image === '' ? '1.jpg' : product.image))"
              alt="img"
            />
            <div class="product-wrapper__text">
              <p>name: {{ product.name }}</p>
            </div>
          </div>
          <div></div>
          <div class="product-wrapper__quantity">
            <v-icon @click="decrementProductInCart(product.id)" slot="prepend" color="green">mdi-minus</v-icon>
            <label for="countProduct">
              <input
                min="1"
                type="number"
                id="countProduct"
                :value="product.count"
                @change="onChangeCountProduct(product.id, $event)"
                @input="onInput"
                @blur="onBlur(product.id, $event)"
              />
            </label>
            <v-icon @click="incrementProductInCart(product.id)" slot="append" color="red">mdi-plus</v-icon>
          </div>
          <div class="price-wrapper">
            <p>{{ product.price }} UAH</p>
            <v-btn @click="deleteProductFromCart(product.id)" x-small color="teal lighten-1" text>delete</v-btn>
          </div>
        </div>
      </v-col>
    </div>
    <div v-if="!isEmpty" class="cart-wrapper__total-field">
      <h2>Total: {{ countTotalCost }}</h2>
      <v-btn @click="cleareCart" color="teal lighten-1" text>clear cart</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Cart',

  data() {
    return {
      product: null,
      isLoader: false,
    };
  },

  computed: {
    ...mapGetters(['getCart']),

    isEmpty() {
      return !Object.keys(this.getCart).length;
    },

    countTotalCost() {
      const total = Object.values(this.getCart).reduce((acc, item) => acc + item.price * item.count, 0);

      return total;
    },
  },

  methods: {
    ...mapActions([
      'deleteProductFromCart',
      'cleareCart',
      'incrementProductInCart',
      'decrementProductInCart',
      'changeCountProduct',
    ]),

    onChangeCountProduct(productId, e) {
      this.changeCountProduct({ productId, count: Number(e.target.value) });
    },
    onInput(e) {
      if (e.target.value === '0') e.target.value = 1;
    },

    onBlur(productId, e) {
      if (e.target.value === '' || e.target.value === '0') {
        this.changeCountProduct({ productId, count: 1 });
      }
    },
  },
};
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
      width: 20rem;
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

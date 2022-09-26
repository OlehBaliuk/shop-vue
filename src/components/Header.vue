<template>
  <div>
    <v-navigation-drawer mobile-breakpoint="0" v-if="drawer" mobile-breakpoint="0" v-if="drawer" app class="teal lighten-2">
      <NavBar />
    </v-navigation-drawer>
    <v-app-bar app color="teal lighten-1" dense dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn data-test="cart" data-test="cart" icon router-link to="/cart">
        <v-icon color="white">mdi-cart</v-icon>
        <span data-test="cart-count" v-if="changeCounterCart > 0">{{ changeCounterCart }}</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title
        ><router-link class="catalog" to="/catalog">Catalog</router-link></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <div v-if="!getUser.email" class="auth-wrapper">
        <router-link class="mx-2" to="/registration">Registration</router-link>
        <router-link class="mx-2" to="/login">Login</router-link>
      </div>
      <UserMenu v-else :user="getUser.email" />
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from './sharedComponents/NavBar.vue';
import UserMenu from './sharedComponents/UserMenu.vue';
import UserMenu from './sharedComponents/UserMenu.vue';

export default {
  name: 'Header',

  data: () => ({
    drawer: true,
  }),

  data: () => ({
    drawer: true,
  }),

  components: {
    NavBar,
    UserMenu,
    UserMenu,
  },

  computed: {
    ...mapGetters(['getUser', 'getCart']),

    changeCounterCart() {
      const countEachProduct = Object.values(this.getCart).map(product => product.count);
      const totalCount = countEachProduct.reduce((acc, count) => acc + count, 0);
      return totalCount;
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  font-size: 2rem;
  background-color: rgb(202, 44, 202);
  margin: 0;
  padding: 0.5rem;

  .link-wrapper {
    padding: 0.5rem;

    .link-wrapper__title {
      font-size: 2rem;
      padding: 0.5rem;
    }
  }
  .v-list-item--link:before {
    background-color: inherit;
  }
}

.auth-wrapper {
  a {
    color: white;
  }
}

.catalog {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}

.v-list-item--link:before {
  background-color: inherit;
}
</style>

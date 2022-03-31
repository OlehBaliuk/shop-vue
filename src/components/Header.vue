<template>
  <div>
    <v-navigation-drawer app v-model="drawer" class="teal lighten-2">
      <v-list>
        <v-list-item v-for="link in linksNavigator" :key="link.title" router-link :to="link.route">
          <v-icon color="white">{{ link.icon }}</v-icon>
          <v-list-item-title class="white--text">{{ link.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="teal lighten-1" dense dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon router-link to="/cart">
        <v-icon color="white">mdi-cart</v-icon>
        <span>{{ getCart.length }}</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title> <v-btn icon router-link to="/">shop</v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="!getUser.email" class="auth-wrapper">
        <router-link class="mx-2" to="/registration">Registration</router-link>
        <router-link class="mx-2" to="/login">Login</router-link>
      </div>
      <p class="my-0 font-weight-medium" v-else>Hey {{ getUser.email }}</p>
      <v-btn icon @click="clearUserState">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Header',
  data: () => ({
    drawer: false,
    linksNavigator: [
      {
        title: 'Catalog',
        route: '/catalog',
        icon: 'mdi-format-list-bulleted-square',
      },
      {
        title: 'Add new product',
        route: '/add-new-product',
        icon: 'mdi-plus-box-multiple',
      },
    ],
  }),
  computed: {
    ...mapGetters(['getUser', 'getCart']),
  },
  methods: {
    ...mapActions(['clearUserState']),
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
</style>

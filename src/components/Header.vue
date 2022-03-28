<template>
  <div>
    <v-navigation-drawer app v-model="drawer" class="teal lighten-1">
      <v-list>
        <v-list-item v-for="link in linksNavigator" :key="link.title" router-link :to="link.route">
          <v-icon color="white"> {{ link.icon }} </v-icon>
          <v-list-item-title class="white--text"> {{ link.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="teal lighten-1" dense dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-btn icon router-link to="/cart">
        <v-icon> mdi-cart </v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-toolbar-title> <v-btn icon router-link to="/"> shop </v-btn></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon router-link to="/authorization" v-if="!getUser.email">
        <v-icon> mdi-login</v-icon>
      </v-btn>

      <p class="my-0 font-weight-medium" v-else>Hey {{ getUser.email }}</p>

      <v-btn icon @click="clearUserState">
        <v-icon> mdi-logout</v-icon>
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
    ],
  }),
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    ...mapActions(['clearUserState']),
  },
};
</script>

<style scoped lang="scss">
.v-list-item--link:before {
  background-color: inherit;
}
</style>

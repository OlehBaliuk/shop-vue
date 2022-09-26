<template>
  <v-menu left bottom>
    <template v-slot:activator="{ on, attrs }">
      <p link v-bind="attrs" v-on="on">Hey {{ user }}</p>
    </template>
    <v-list>
      <v-list-item v-for="(link, i) in links" :key="i" router-link :to="link.route">
        <v-icon>{{ link.icon }}</v-icon>
        <p>{{ link.title }}</p>
      </v-list-item>
      <v-list-item @click="onLogOut">
        <v-icon>mdi-logout</v-icon>
        <p>Log Out</p>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from 'vuex';
import route from '../../constants/routes';

export default {
  name: 'UserMenu',

  data() {
    return {
      links: {
        Profile: {
          icon: 'mdi-account',
          route: route.profile,
          title: 'Profile',
        },
      },
    };
  },

  props: {
    user: {
      type: String,
    },
  },

  methods: {
    ...mapActions(['clearUserState']),

    onLogOut() {
      localStorage.removeItem('authToken');
      this.clearUserState();
      if (this.$route.path !== route.catalog) {
        this.$router.push({ path: route.catalog });
      }
    },
  },
};
</script>

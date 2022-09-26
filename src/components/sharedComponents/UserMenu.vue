<template>
  <v-menu left bottom>
    <template v-slot:activator="{ on, attrs }">
      <p link v-bind="attrs" v-on="on">Hey {{ user }}</p>
    </template>
    <v-list>
      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        router-link
        :to="link.route"
        v-show="link.show()"
      >
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
import { mapActions, mapGetters } from 'vuex';
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
          show: () => true,
        },

        Admins: {
          icon: 'mdi-account-wrench',
          route: route.admins,
          title: 'Admins',
          show: () => {
            const isVisible = this.admins?.some(admin => admin.email === this.getUser.email);
            return isVisible;
          },
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
    ...mapActions(['clearUserState', 'removeAdminsFromState']),

    onLogOut() {
      localStorage.removeItem('authToken');
      this.clearUserState();
      this.removeAdminsFromState();
      if (this.$route.path !== route.catalog) {
        this.$router.push({ path: route.catalog });
      }
    },
  },

  computed: {
    ...mapGetters(['getUser', 'admins']),
  },
};
</script>

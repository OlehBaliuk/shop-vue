<template>
  <v-menu left bottom>
    <template v-slot:activator="{ on, attrs }">
      <p link v-bind="attrs" v-on="on">Hey {{ userEmail }}</p>
    </template>
    <v-list>
      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        router-link
        :to="{ name: link.route, params: { locale: $i18n.locale } }"
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

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { IAdmin } from '../interfaces/interfaces';

@Component
export default class UserMenu extends Vue {
  links = {
    Profile: {
      icon: 'mdi-account',
      route: 'profile',
      title: 'Profile',
      show: () => true,
    },

    Admins: {
      icon: 'mdi-account-wrench',
      route: 'admins-list',
      title: 'Admins',
      show: () => {
        const isVisible = this.admins?.some((admin: IAdmin) => admin.email === this.user.email);
        return isVisible;
      },
    },

    ProductsTable: {
      icon: 'mdi-table',
      route: 'products-table',
      title: 'Products table',
      show: () => {
        const isVisible = this.admins?.some((admin: IAdmin) => admin.email === this.user.email);
        return isVisible;
      },
    },
    DragAndDrop: {
      icon: 'mdi-vector-intersection',
      route: 'drag-and-drop',
      title: 'Drag-and-drop',
      show: () => true,
    },
  };

  @Prop(String) userEmail: string;

  onLogOut() {
    localStorage.removeItem('authToken');
    this.$store.dispatch('clearUserState');
    this.$store.dispatch('removeAdminsFromState');
    if (this.$route.path !== `/${this.$i18n.locale}/`) {
      this.$router.push({ name: 'catalog', params: { locale: this.$i18n.locale } });
    }
  }

  get user() {
    return this.$store.getters.getUser;
  }

  get admins() {
    return this.$store.getters.admins;
  }
}
</script>

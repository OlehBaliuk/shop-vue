<template>
  <v-list>
    <v-list-group class="white--text" :value="false">
      <template v-slot:activator>
        <v-icon>mdi-circle-small</v-icon>
        <v-list-item-title data-test="products">{{ $t('navBar.products') }}</v-list-item-title>
      </template>
      <template>
        <v-list-item router-link :to="{ name: 'catalog', params: { locale: $i18n.locale } }">
          <v-list-item-title>{{ $t('navBar.catalog') }}</v-list-item-title>
          <v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-list-item>
      </template>
      <v-list-group v-if="isAdmin" no-action sub-group>
        <template v-slot:activator>
          <v-list-item>
            <v-list-item-title data-test="actions">{{ $t('navBar.actions') }}</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item router-link :to="{ name: 'add-new-product', params: { locale: $i18n.locale } }">
          <v-list-item-title data-test="create">{{ $t('navBar.create') }}</v-list-item-title>
          <v-icon>mdi-plus-outline</v-icon>
        </v-list-item>
      </v-list-group>
    </v-list-group>

    <v-list-group v-if="isFilter" class="white--text" :value="false">
      <template v-slot:activator>
        <v-icon>mdi-circle-small</v-icon>
        <v-list-item-title data-test="filter">{{ $t('navBar.filter') }}</v-list-item-title>
      </template>
      <template>
        <v-container fluid>
          <v-checkbox
            data-test="searchByName"
            @click="onChecked('searchByName', name)"
            v-model="name"
            :label="$t('navBar.searchByName')"
          ></v-checkbox>
          <v-checkbox
            data-test="searchByPrice"
            @click="onChecked('searchByPrice', price)"
            v-model="price"
            :label="$t('navBar.searchByPrice')"
          ></v-checkbox>
        </v-container>
      </template>
    </v-list-group>
  </v-list>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { IAdmin } from '../interfaces/interfaces';

@Component
export default class NavBar extends Vue {
  name: boolean = false;

  price: boolean = false;

  onChecked(field: string, value: boolean) {
    this.$store.dispatch('changeFlag', { field, value });
  }

  get isFilter() {
    return this.$route.path === `/${this.$i18n.locale}/`;
  }

  get isAdmin() {
    const isVisible = this.$store.getters.admins.some(
      (admin: IAdmin) => admin.email === this.$store.getters.getUser.email,
    );
    return isVisible;
  }
}
</script>

<style lang="scss" scoped>
::after,
::before,
.v-list-item__title {
  color: white;
  font-size: 1.1em;
}
</style>

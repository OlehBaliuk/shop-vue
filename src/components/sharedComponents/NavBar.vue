<template>
  <v-list>
    <v-list-group class="white--text" :value="false">
      <template v-slot:activator>
        <v-icon>mdi-circle-small</v-icon>
        <v-list-item-title data-test="products">Products</v-list-item-title>
      </template>
      <template>
        <v-list-item router-link :to="'/catalog'">
          <v-list-item-title>Catalog</v-list-item-title>
          <v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-list-item>
      </template>
      <v-list-group no-action sub-group>
        <template v-slot:activator>
          <v-list-item>
            <v-list-item-title data-test="actions">Actions</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item router-link :to="'/add-new-product'">
          <v-list-item-title data-test="create">Create</v-list-item-title>
          <v-icon>mdi-plus-outline</v-icon>
        </v-list-item>
      </v-list-group>
    </v-list-group>

    <v-list-group v-if="isFilter" class="white--text" :value="false">
      <template v-slot:activator>
        <v-icon>mdi-circle-small</v-icon>
        <v-list-item-title>Filter</v-list-item-title>
      </template>
      <template>
        <v-container fluid>
          <v-checkbox
            data-test="checkbox"
            @click="onChecked('searchByName', name)"
            v-model="name"
            label="Search by name"
          ></v-checkbox>
          <v-checkbox @click="onChecked('searchByPrice', price)" v-model="price" label="Search by price"></v-checkbox>
        </v-container>
      </template>
    </v-list-group>
  </v-list>
</template>

<script>
import { mapActions } from 'vuex';
import route from '@/constants/routes';

export default {
  name: 'NavBar',

  data() {
    return {
      name: false,
      price: false,
    };
  },

  methods: {
    ...mapActions(['changeFlag']),

    onChecked(field, value) {
      this.changeFlag({ field, value });
    },
  },

  computed: {
    isFilter() {
      return this.$route.path === route.catalog || this.$route.path === route.main;
    },
  },
};
</script>

<style lang="scss" scoped>
::after,
::before,
.v-list-item__title {
  color: white;
  font-size: 1.1em;
}
</style>

<template>
  <form @submit.prevent="submit">
    <label for="input-search">
      <input v-debounce="submit" v-model="searchProduct" id="input-search" type="text" placeholder="search.."
    /></label>
    <v-btn icon type="submit">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </form>
</template>

<script>
export default {
  name: 'InputSearch',

  data() {
    return {
      searchProduct: '',
    };
  },

  methods: {
    submit() {
      if (this.searchProduct) {
        this.$emit('onSubmit', this.searchProduct);
      }
    },
  },
};
</script>

<style scoped lang="scss">
#input-search {
  border: 1px solid white;
  border-radius: 0.3rem;
  outline: 0;
  outline-offset: 0;
  color: white;
  width: 10rem;
  margin-left: 1rem;

  &::placeholder {
    color: white;
  }
}
</style>

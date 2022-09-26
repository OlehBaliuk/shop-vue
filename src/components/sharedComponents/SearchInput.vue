<template>
  <form @submit.prevent="submit">
    <label for="input-search">
      Search
      <input
        v-debounce="submit"
        :value="inputValue"
        data-test="searchField"
        @input="({ target: { value } }) => onChangeFilter('search', value)"
        id="input-search"
        type="text"
        placeholder="search.."
    /></label>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'InputSearch',

  methods: {
    ...mapActions(['createFieldFilter']),

    submit() {
      this.$emit('onSubmit');
    },

    onChangeFilter(field, value) {
      this.createFieldFilter({ field, filterParams: { value, key: 'name_like' } });
    },
  },

  computed: {
    ...mapGetters(['filter']),

    inputValue() {
      if (this.filter.search?.value) {
        return this.filter.search.value;
      }
      return '';
    },
  },
};
</script>

<style scoped lang="scss">
#input-search {
  border: 1px solid rgb(0, 0, 0);
  border-radius: 0.3rem;
  outline: 0;
  outline-offset: 0;
  color: rgb(0, 0, 0);
  width: 10rem;
  margin: 0.2rem;

  &::placeholder {
    color: #000000;
  }
}
</style>

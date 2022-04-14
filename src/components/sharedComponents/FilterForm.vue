<template>
  <div class="filter-wrapper">
    <h3>Price</h3>
    <form @submit.prevent="submit">
      <div class="input-wrapper">
        <label for="input-gte">
          <input
            v-debounce="submit"
            id="input-gte"
            :value="filter.from.value"
            @input="({ target: { value } }) => onChangeFilter('from', value)"
            min="0"
            max="99999"
            type="number"
            placeholder="from"
          />
        </label>
        <span>-</span>
        <label for="input-lte">
          <input
            v-debounce="submit"
            id="input-lte"
            min="0"
            max="99999"
            :value="filter.to.value"
            @input="({ target: { value } }) => onChangeFilter('to', value)"
            type="number"
            placeholder="to"
          />
        </label>
      </div>
      <v-btn text color="primary" type="submit">search</v-btn>
      <v-btn @click="clearFilterState" text color="primary">clear filter</v-btn>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'FilterForm',

  methods: {
    ...mapActions(['updateFilterField']),

    submit() {
      this.$emit('onSubmit');
    },

    onChangeFilter(field, value) {
      this.updateFilterField({ field, value: Number(value) });
    },

    clearFilterState() {
      this.$emit('onClearFilterState');
    },
  },

  computed: {
    ...mapGetters(['filter']),
  },
};
</script>

<style lang="scss" scoped>
#input-lte,
#input-gte {
  border: 1px solid black;
  width: 5rem;
  margin: 0.2rem;
  border-radius: 0.2rem;
  text-align: center;
}
</style>

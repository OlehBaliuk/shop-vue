<template>
  <div class="filter-wrapper">
    <form @submit.prevent="submit">
      <div class="input-wrapper">
        <label for="input-gte">
          Price
          <input
            v-debounce="submit"
            data-test="from"
            id="input-gte"
            :value="filter.from.value"
            @input="onChangeFilter('from', $event)"
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
            data-test="to"
            id="input-lte"
            min="0"
            max="99999"
            :value="filter.to.value"
            @input="onChangeFilter('to', $event)"
            type="number"
            placeholder="to"
          />
        </label>
      </div>
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

    onChangeFilter(field, event) {
      this.updateFilterField({ field, value: Number(event.target.value) });
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

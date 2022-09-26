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
            :value="filterValue.from.value"
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
            :value="filterValue.to.value"
            @input="onChangeFilter('to', $event)"
            type="number"
            placeholder="to"
          />
        </label>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class FilterForm extends Vue {
  submit() {
    this.$emit('onSubmit');
  }

  onChangeFilter(field: string, event: any) {
    this.$store.dispatch('updateFilterField', { field, value: Number(event.target.value) });
  }

  get filterValue() {
    return this.$store.getters.filter;
  }
}
</script>

<style lang="scss" scoped>
#input-lte,
#input-gte {
  border: 1px solid black;
  width: 5rem;
  margin: 0.2rem;
  border-radius: 0.2rem;
  text-align: center;

  &::placeholder {
    color: #000000;
  }
}
</style>

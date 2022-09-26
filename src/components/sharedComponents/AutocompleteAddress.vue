<template>
  <v-card-text v-if="isVisibleFields === 'country and city'">
    <v-autocomplete
      :search-input.sync="countryInput"
      v-model="selectedCountry"
      :loading="isLoadingCountry"
      :items="countries"
      :error-messages="errors.country"
      hide-no-data
      hide-selected
      label="Country*"
      placeholder="Select..."
      :disabled="!isDisable"
      color="teal lighten-2"
      @blur="validate('country')"
      @input="handleInput('country')"
    ></v-autocomplete>
    <v-autocomplete
      :search-input.sync="cityInput"
      v-model="selectedCity"
      :loading="isLoadingCity"
      :error-messages="errors.city"
      :items="cities"
      hide-no-data
      hide-selected
      label="City*"
      placeholder="Select..."
      :disabled="!isDisable"
      color="teal lighten-2"
      @blur="validate('city')"
      @input="handleInput('city')"
    ></v-autocomplete>
  </v-card-text>
</template>

<script>
export default {
  name: 'AutocompleteAddress',

  data: () => ({
    countryInput: null,
    cityInput: null,
    selectedCountry: null,
    selectedCity: null,
    isLoadingCountry: false,
    isLoadingCity: false,
    isVisibleFields: '',
    countries: [],
    cities: [],
    isDisable: false,
  }),

  props: {
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    isEditing: {
      type: Boolean,
    },
    selectUserInfo: {
      type: String,
    },
    validate: {
      type: Function,
    },
    errors: {
      type: Object,
    },
  },

  methods: {
    async searchCountry() {
      const url = 'https://countriesnow.space/api/v0.1/countries';
      this.isLoadingCountry = true;

      try {
        const response = await fetch(url);
        const json = await response.json();
        json.data.map(item => this.countries.push(item.country));
        this.cities = [];
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoadingCountry = false;
      }
    },

    async searchCity() {
      const url = 'https://countriesnow.space/api/v0.1/countries/cities';
      const data = { country: this.selectedCountry };
      this.isLoadingCity = true;
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        this.cities = json.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoadingCity = false;
      }
    },

    handleInput(field) {
      this.$nextTick(() => {
        this.validate(field);
      });
    },
  },

  watch: {
    countryInput() {
      this.searchCountry();
    },

    cityInput() {
      if (!this.selectedCountry) return;
      this.searchCity();
    },

    selectedCountry() {
      this.$emit('selectedCountry', this.selectedCountry);
    },

    selectedCity() {
      this.$emit('selectedCity', this.selectedCity);
    },
    country() {
      this.selectedCountry = this.country;
    },
    city() {
      this.selectedCity = this.city;
    },
    isEditing() {
      this.isDisable = this.isEditing;
    },

    selectUserInfo() {
      this.isVisibleFields = this.selectUserInfo;
    },
  },

  async mounted() {
    await this.searchCountry();
    if (this.selectedCountry) {
      await this.searchCity();
    }
  },
};
</script>

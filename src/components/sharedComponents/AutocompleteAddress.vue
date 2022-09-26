<template>
  <v-card-text v-if="isVisibleFields === 'country and city'">
    <v-autocomplete
      v-model="selectedCountry"
      :search-input.sync="countryInput"
      :loading="isLoadingCountry"
      :items="countries"
      :error-messages="errors.country"
      hide-no-data
      hide-selected
      :label="$t('profile.country')"
      placeholder="Select..."
      :disabled="!isEditing"
      color="teal lighten-2"
      @change="onSelectedCountry"
      @blur="validate('country')"
      @input="handleInput('country')"
    />
    <v-autocomplete
      v-model="selectedCity"
      :search-input.sync="cityInput"
      :loading="isLoadingCity"
      :error-messages="errors.city"
      :items="cities"
      hide-no-data
      hide-selected
      :label="$t('profile.city')"
      placeholder="Select..."
      :disabled="!isEditing"
      color="teal lighten-2"
      @change="onSelectedCity"
      @blur="validate('city')"
      @input="handleInput('city')"
    />
  </v-card-text>
</template>

<script lang="ts">
import HttpService from '@/services/HttpService';
import { AxiosResponse } from 'axios';
import { Vue, Prop, Component, Watch, Emit } from 'vue-property-decorator';
import { ICountries } from '../interfaces/interfaces';

@Component
export default class AutocompleteAddress extends Vue {
  countryInput: null | string = null;

  cityInput: null | string = null;

  selectedCountry: string | undefined = this.country;

  selectedCity: string | undefined = this.city;

  isLoadingCountry: boolean = false;

  isLoadingCity: boolean = false;

  isVisibleFields: string | undefined = this.selectUserInfo;

  countries: Array<string> = [];

  cities: Array<string> = [];

  @Prop(String) country?: string;

  @Prop(Boolean) isEditing: boolean;

  @Prop(String) city?: string;

  @Prop(String) selectUserInfo?: string;

  @Prop(Function) validate: any;

  @Prop(Object) errors: object;

  async searchCountry() {
    const url: string = 'https://countriesnow.space/api/v0.1/countries';
    this.isLoadingCountry = true;

    try {
      const { data }: AxiosResponse = await HttpService.get(url);

      this.countries = data.data.map((item: ICountries) => item.country);
      this.cities = [];
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoadingCountry = false;
    }
  }

  async searchCity() {
    const url = 'https://countriesnow.space/api/v0.1/countries/cities';
    const country = { country: this.selectedCountry };
    this.isLoadingCity = true;
    try {
      const { data }: AxiosResponse = await HttpService.post(url, country);

      this.cities = data.data;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoadingCity = false;
    }
  }

  handleInput(field: string) {
    this.$nextTick(() => {
      this.validate(field);
    });
  }

  @Emit('selectedCountry')
  onSelectedCountry() {
    return this.selectedCountry;
  }

  @Emit('selectedCity')
  onSelectedCity() {
    return this.selectedCity;
  }

  async mounted() {
    await this.searchCountry();
    if (this.selectedCountry) {
      await this.searchCity();
    }
  }

  @Watch('countryInput')
  countrySearch() {
    this.searchCountry();
  }

  @Watch('cityInput')
  citySearch() {
    if (!this.selectedCountry) return;
    this.searchCity();
  }

  @Watch('selectUserInfo')
  selectInfo() {
    this.isVisibleFields = this.selectUserInfo;
  }
}
</script>

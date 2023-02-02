<template>
  <v-card width="50%" class="my-5" v-if="!loading">
    <div class="tf"><div>123</div></div>
    <v-toolbar flat color="teal lighten-2">
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">User Profile</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn data-test="editPencil" color="white" fab small @click="isEditing = !isEditing">
        <v-icon v-if="isEditing">mdi-close</v-icon>
        <v-icon v-else>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>
    <v-form @submit.prevent="submit" data-test="profileForm">
      <v-card-text>
        <v-text-field
          v-model="userData.first"
          :disabled="!isEditing"
          color="teal lighten-2"
          :error-messages="errors.first"
          label="Name*"
          @blur="validate('first')"
          @input="validate('first')"
        ></v-text-field>
      </v-card-text>
      <v-card-text>
        <v-text-field
          v-model="userData.last"
          :disabled="!isEditing"
          color="teal lighten-2"
          label="Surname*"
          :error-messages="errors.last"
          @blur="validate('last')"
          @input="validate('last')"
        ></v-text-field>
      </v-card-text>
      <DatePicker
        @onChangeDate="saveDateBirthDay"
        :dateBirthDay="userData.birthDay"
        :isEditing="isEditing"
      />
      <AvatarUpload @handleAvatar="saveAvatar" :avatar="userData.avatar" :isEditing="isEditing" />
      <RadioButtonsGender
        @update:gender="newValue => (userData.gender = newValue)"
        :gender="userData.gender"
        :isEditing="isEditing"
      />
      <v-card-text>
        <v-select
          :disabled="!isEditing"
          v-model="userData.contactType"
          color="teal lighten-2"
          :items="userInfoFields"
          label="Contact*"
          :error-messages="errors.contactType"
          @blur="validate('contactType')"
          @input="validate('contactType')"
        ></v-select>
      </v-card-text>
      <v-card-text v-if="userData.contactType === 'email'">
        <v-text-field
          key="email"
          v-model="userData.email"
          :disabled="!isEditing"
          color="teal lighten-2"
          label="email*"
          @blur="validate('email')"
          @input="validate('email')"
          :error-messages="errors.email"
        ></v-text-field>
      </v-card-text>
      <v-card-text v-else-if="userData.contactType === 'phone'">
        <v-text-field
          key="phone"
          data-test="phoneInput"
          :disabled="!isEditing"
          v-mask="'+38(0##)###-##-##'"
          v-model="userData.phone"
          color="teal lighten-2"
          placeholder="+38(0XX) XXX-XX-XX"
          label="phone*"
          :error-messages="errors.phone"
          @blur="validate('phone')"
          @input="validate('phone')"
        ></v-text-field>
      </v-card-text>
      <AutocompleteAddress
        @selectedCity="selectedCity"
        @selectedCountry="selectedCountry"
        :country="userData.country"
        :city="userData.city"
        :validate="validate"
        :errors="errors"
        :isEditing="isEditing"
        :selectUserInfo="userData.contactType"
      />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!isEditing"
          color="teal  lighten-2"
          class="mr-4"
          data-test="submit"
          type="submit"
          >submit</v-btn
        >
      </v-card-actions>
    </v-form>
    <v-snackbar data-test="success" v-model="hasSaved" :timeout="2000" absolute bottom left>
      Your profile has been updated
    </v-snackbar>
  </v-card>
</template>

<style lang="scss">
.tf {
  display: flex;
  justify-content: center;
}
</style>

<script lang="ts">
import route from '@/constants/routes';
import HttpService from '@/services/HttpService';
import DatePicker from '@/components/sharedComponents/DatePicker.vue';
import AvatarUpload from '@/components/sharedComponents/AvatarUpload.vue';
import RadioButtonsGender from '@/components/sharedComponents/RadioButtonsGender.vue';
import AutocompleteAddress from '@/components/sharedComponents/AutocompleteAddress.vue';
import UserProfileSchema from '@/shema/shema';

import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    DatePicker,
    AutocompleteAddress,
    RadioButtonsGender,
    AvatarUpload,
  },
})
export default class Profile extends Vue {
  loading: boolean = true;

  userData: any = {};

  hasSaved: boolean = false;

  isEditing: boolean = false;

  userInfoFields: string[] = ['email', 'phone', 'country and city'];

  errors: any = {
    first: '',
    last: '',
    phone: '',
    email: '',
    contactType: '',
    city: '',
    country: '',
  };

  async submit() {
    try {
      await UserProfileSchema.validate(this.userData, { abortEarly: false });
      HttpService.patch(`${route.users}/${this.$store.getters.getUser.sub}`, {
        ...this.userData,
        birthDay: Math.floor(new Date(this.userData.birthDay) as any),
      });
      this.isEditing = !this.isEditing;
      this.hasSaved = true;
    } catch (err: any) {
      err.inner.forEach((error: any) => {
        this.errors = { ...this.errors, [error.path]: error.message };
      });
    }
  }

  async validate(field: string) {
    try {
      await UserProfileSchema.validateAt(field, this.userData);
      this.errors[field] = '';
    } catch (err: any) {
      this.errors[err.path] = err.message;
    }
  }

  saveDateBirthDay(birthDay: string) {
    this.userData.birthDay = birthDay;
  }

  selectedCountry(country: string) {
    this.userData.country = country;
  }

  selectedCity(city: string) {
    this.userData.city = city;
  }

  saveAvatar(avatar: string) {
    this.userData.avatar = avatar;
  }

  toSringDateBirthDay = (dateBirthDay: string) => {
    if (!dateBirthDay) return null;
    return new Date(dateBirthDay).toISOString().substr(0, 10);
  };

  async getUserProfileInfo() {
    const { data }: any = await HttpService.get(
      `${route.users}/${this.$store.getters.getUser.sub}`,
    );
    this.userData = data;
    this.userData.contactType = '';
    this.userData.birthDay = this.toSringDateBirthDay(this.userData.birthDay);
    delete this.userData.password;
    this.loading = false;
  }

  created() {
    this.getUserProfileInfo();
  }
}
</script>

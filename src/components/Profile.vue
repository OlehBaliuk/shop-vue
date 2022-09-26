<template>
  <v-card width="50%" class="my-5">
    <v-toolbar flat color="teal lighten-2">
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">User Profile</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="white" fab small @click="isEditing = !isEditing">
        <v-icon v-if="isEditing">mdi-close</v-icon>
        <v-icon v-else>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>
    <v-form @submit.prevent="submit">
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
        @choseGender="choseGender"
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
          class="input"
          :disabled="!isEditing"
          v-mask="'+38(0##)###-##-##'"
          :value="userData.phone"
          color="teal lighten-2"
          placeholder="+38(0XX) XXX-XX-XX"
          label="phone*"
          :error-messages="errors.phone"
          @blur="validate('phone')"
          @input="handlePhone($event)"
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
    <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
      Your profile has been updated
    </v-snackbar>
  </v-card>
</template>

<script>
import route from '@/constants/routes';
import HttpService from '@/services/HttpService';
import DatePicker from '@/components/sharedComponents/DatePicker.vue';
import AvatarUpload from '@/components/sharedComponents/AvatarUpload.vue';
import RadioButtonsGender from '@/components/sharedComponents/RadioButtonsGender.vue';
import AutocompleteAddress from '@/components/sharedComponents/AutocompleteAddress.vue';
import { mapGetters } from 'vuex';
import * as yup from 'yup';

const UserProfileSchema = yup.object().shape({
  contactType: yup.string().required('one contact must be required'),

  first: yup.string().required('First name is required').max(25, 'max length 25 characters'),

  last: yup.string().required('Last name is required').max(25, 'max length 25 characters'),

  phone: yup.string().when('contactType', {
    is: value => value === 'phone',
    then: yup.string().required('Phone is required').length(17, 'incorrect phone number'),
  }),

  email: yup
    .string()
    .email()
    .when('contactType', {
      is: value => value === 'email',
      then: yup.string().required('Must enter email address'),
    }),

  city: yup
    .string()
    .nullable()
    .when('contactType', {
      is: value => value === 'country and city',
      then: yup.string().required('Country is required').nullable(),
    }),

  country: yup
    .string()
    .nullable()
    .when('contactType', {
      is: value => value === 'country and city',
      then: yup.string().required('Country is required').nullable(),
    }),
});

export default {
  name: 'Profile',

  data() {
    return {
      userData: {},
      hasSaved: false,
      isEditing: false,
      userInfoFields: ['email', 'phone', 'country and city'],
      errors: {
        first: '',
        last: '',
        phone: '',
        email: '',
        contactType: '',
        city: '',
        country: '',
      },
    };
  },

  components: {
    DatePicker,
    AutocompleteAddress,
    RadioButtonsGender,
    AvatarUpload,
  },

  methods: {
    async submit() {
      try {
        await UserProfileSchema.validate(this.userData, { abortEarly: false });
        HttpService.patch(`${route.users}/${this.getUser.sub}`, {
          ...this.userData,
          birthDay: Math.floor(new Date(this.userData.birthDay)),
        });
        this.isEditing = !this.isEditing;
        this.hasSaved = true;
      } catch (err) {
        err.inner.forEach(error => {
          this.errors = { ...this.errors, [error.path]: error.message };
        });
      }
    },

    async validate(field) {
      try {
        await UserProfileSchema.validateAt(field, this.userData);
        this.errors[field] = '';
      } catch (err) {
        this.errors[err.path] = err.message;
      }
    },

    saveDateBirthDay(birthDay) {
      this.userData.birthDay = birthDay;
    },

    selectedCountry(country) {
      this.userData.country = country;
    },

    selectedCity(city) {
      this.userData.city = city;
    },

    choseGender(gender) {
      this.userData.gender = gender;
    },

    saveAvatar(avatar) {
      this.userData.avatar = avatar;
    },

    handlePhone(value) {
      this.$nextTick(() => {
        this.userData.phone = value;
        this.validate('phone');
      });
    },
  },

  computed: {
    ...mapGetters(['getUser']),
  },

  async mounted() {
    const { data } = await HttpService.get(`${route.users}/${this.getUser.sub}`);
    this.userData = data;
    this.userData.contactType = '';
    delete this.userData.password;
  },
};
</script>

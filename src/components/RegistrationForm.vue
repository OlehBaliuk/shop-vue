<template>
  <div class="registration-form">
    <h1>Registration</h1>
    <DialogModal
      :isFlag="isErrorRegistration"
      @onChangeStatus="onChangeStatusError"
      title="Error"
      content="something went wrong.."
    />
    <validation-observer ref="observer" v-slot="{ invalid }">
      <v-form @submit.prevent="submit(form)">
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6">
              <validation-provider v-slot="{ errors }" name="first name" rules="required|max:20">
                <v-text-field
                  v-model="form.first"
                  data-test="firstName"
                  :counter="20"
                  :error-messages="errors"
                  label="First name"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6">
              <validation-provider v-slot="{ errors }" name="last name" rules="required|max:20">
                <v-text-field
                  v-model="form.last"
                  data-test="secondName"
                  :counter="20"
                  :error-messages="errors"
                  label="Last name"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ errors }"
                name="Email"
                :rules="{
                  required: true,
                  email: true,
                }"
              >
                <v-text-field
                  v-model="form.email"
                  data-test="email"
                  :error-messages="errors"
                  label="Email"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6">
              <validation-provider v-slot="{ errors }" name="password" rules="required|min:8">
                <v-text-field
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  :error-messages="errors"
                  label="Password"
                  v-model="form.password"
                  data-test="password"
                  class="input-group--focused"
                  required
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6">
              <validation-provider v-slot="{ errors }" name="age" rules="required">
                <v-slider
                  v-model="form.age"
                  :error-messages="errors"
                  label="Age"
                  hint="Be honest"
                  min="18"
                  max="100"
                  thumb-label
                ></v-slider>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="checkbox" rules="required">
                <v-col cols="12">
                  <v-checkbox
                    v-model="checkBoxTerms"
                    data-test="checkbox"
                    :error-messages="errors"
                    color="green"
                    value="true"
                    type="checkbox"
                    required
                  >
                    <template v-slot:label>
                      <div @click.stop="">
                        Do you accept the
                        <a href="#" @click.prevent="onChangeStatusTerms">terms</a>
                        and
                        <a href="#" @click.prevent="onChangeStatusConditions">conditions?</a>
                      </div>
                    </template>
                  </v-checkbox>
                </v-col>
              </validation-provider>
            </v-col>
          </v-row>
        </v-container>
        <v-btn class="mr-4" data-test="submit" type="submit" :disabled="invalid">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
      <DialogModal :isFlag="terms" @onChangeStatus="onChangeStatusTerms" title="Terms" :content="content" />
      <DialogModal
        :isFlag="conditions"
        @onChangeStatus="onChangeStatusConditions"
        title="Conditions"
        :content="content"
      />
    </validation-observer>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
import { mapActions } from 'vuex';
import { required, max, min, email } from 'vee-validate/dist/rules';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import route from '@/constants/routes';
import HttpService from '@/services/HttpService';
import DialogModal from './sharedComponents/DialogModal.vue';

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
});

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
});

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters',
});

extend('email', {
  ...email,
  message: '{_field_} not correct',
});

export default {
  name: 'RegistrationForm',

  components: {
    ValidationProvider,
    ValidationObserver,
    DialogModal,
  },

  data() {
    const defaultForm = Object.freeze({
      first: '',
      last: '',
      email: '',
      password: '',
      age: 18,
    });

    return {
      form: { ...defaultForm },
      conditions: false,
      snackbar: false,
      terms: false,
      checkBoxTerms: null,
      showPassword: false,
      content: 'Lorem ipsum dolor sit amet',
      isErrorRegistration: false,
    };
  },

  methods: {
    clear() {
      this.form = { ...this.defaultForm };
      this.checkBoxTerms = null;
      this.$refs.observer.reset();
    },

    onChangeStatusError() {
      this.isErrorRegistration = !this.isErrorRegistration;
    },

    onChangeStatusTerms() {
      this.terms = !this.terms;
    },

    onChangeStatusConditions() {
      this.conditions = !this.conditions;
    },

    async submit(credentials) {
      try {
        const { data } = await HttpService.post(`${route.users}`, credentials);
        const decoded = jwt_decode(data.accessToken);

        this.addUserToState(decoded);
        this.$router.push({ path: route.main });
      } catch (e) {
        this.onChangeStatusError();
      }
    },

    ...mapActions(['addUserToState']),
  },
};
</script>

<style scoped lang="scss">
.registration-form {
  width: 50%;
}
</style>

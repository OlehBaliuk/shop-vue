<template>
  <div class="registration-form">
    <h1>Registration</h1>
    <v-card flat>
      <v-snackbar v-model="snackbar" absolute top color="success">
        <span>Registration successful!</span>
        <v-icon dark> mdi-checkbox-marked-circle </v-icon>
      </v-snackbar>
      <v-form ref="form" @submit.prevent="submit(form)">
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.first"
                :rules="rules.name"
                color="purple darken-2"
                label="First name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.last"
                :rules="rules.name"
                color="blue darken-2"
                label="Last name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field v-model="form.email" :rules="rules.email" label="E-mail" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rules.min"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-2"
                label="Password"
                hint="At least 8 characters"
                v-model="form.password"
                class="input-group--focused"
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-slider
                v-model="form.age"
                :rules="rules.age"
                color="orange"
                label="Age"
                hint="Be honest"
                min="18"
                max="100"
                thumb-label
              ></v-slider>
            </v-col>

            <v-col cols="12">
              <v-checkbox v-model="checkBoxTerms" color="green">
                <template v-slot:label>
                  <div @click.stop="">
                    Do you accept the
                    <a href="#" @click.prevent="terms = true">terms</a>
                    and
                    <a href="#" @click.prevent="conditions = true">conditions?</a>
                  </div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text @click="resetForm"> Cancel </v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!formIsValid" text color="primary" type="submit"> Register </v-btn>
        </v-card-actions>
      </v-form>
      <v-dialog v-model="terms" width="70%">
        <v-card>
          <v-card-title class="text-h6"> Terms </v-card-title>
          <v-card-text>
            {{ content }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="purple" @click="terms = false"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="conditions" width="70%">
        <v-card>
          <v-card-title class="text-h6"> Conditions </v-card-title>
          <v-card-text>
            {{ content }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="purple" @click="conditions = false"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
import { mapActions } from 'vuex';
import routes from '@/constants/routes';
import HttpService from '../services/HttpService';

export default {
  name: 'RegistrationForm',

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
      rules: {
        age: [val => val > 17 || "I don't believe you!"],
        name: [val => (val || '').length > 0 || 'This field is required'],
        min: [val => (val || '').length >= 8 || 'Min 8 characters'],
        email: [
          value => {
            // eslint-disable-next-line
            const pattern =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || 'Invalid e-mail.';
          },
        ],
      },

      conditions: false,
      snackbar: false,
      terms: false,
      checkBoxTerms: false,
      showPassword: false,
      defaultForm,
      content: 'Lorem ipsum dolor sit amet',
    };
  },

  computed: {
    formIsValid() {
      return this.form.first && this.form.last && this.form.email && this.form.password && this.checkBoxTerms;
    },
  },

  methods: {
    resetForm() {
      this.form = { ...this.defaultForm };
      this.$refs.form.reset();
    },

    async submit(credentials) {
      const token = await HttpService.post(`${routes.users}`, credentials);
      const decoded = jwt_decode(token.accessToken);

      this.addUserToState(decoded);
      this.snackbar = true;
      this.resetForm();
      this.$router.push({ path: routes.catalog });
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

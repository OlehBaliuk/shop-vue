<template>
  <div class="login-form">
    <h1>Login</h1>
    <v-card flat>
      <v-snackbar v-model="snackbar" absolute top color="success">
        <span>Registration successful!</span>
        <v-icon dark> mdi-checkbox-marked-circle </v-icon>
      </v-snackbar>
      <v-form ref="form" @submit.prevent="submit(form)">
        <v-container fluid>
          <v-row>
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
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text @click="resetForm"> Cancel </v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!formIsValid" text color="primary" type="submit"> Login </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
import { mapActions } from 'vuex';
import HttpService from '../services/HttpService';

export default {
  name: 'RegistrationForm',

  data() {
    const defaultForm = Object.freeze({
      email: '',
      password: '',
    });

    return {
      form: { ...defaultForm },
      rules: {
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

      snackbar: false,
      showPassword: false,
      defaultForm,
    };
  },

  computed: {
    formIsValid() {
      return this.form.email && this.form.password;
    },
  },

  methods: {
    resetForm() {
      this.form = { ...this.defaultForm };
      this.$refs.form.reset();
    },

    async submit(credentials) {
      const token = await HttpService.post('/login', credentials);
      const decoded = jwt_decode(token.accessToken);

      if (decoded) {
        this.addUserToState(decoded);
        this.snackbar = true;
        this.resetForm();
        this.$router.push({ path: '/catalog' });
      }
    },

    ...mapActions(['addUserToState']),
  },
};
</script>

<style scoped lang="scss">
.login-form {
  width: 50%;
}
</style>

<template>
  <div class="login-form">
    <h1>Login</h1>
    <DialogModal
      :isFlag="isErrorLogin"
      @onChangeStatus="onChangeStatusError"
      title="Error"
      content="something went wrong.."
    />
    <v-card flat>
      <v-snackbar v-model="snackbar" absolute top color="success">
        <span>Registration successful!</span>
        <v-icon dark> mdi-checkbox-marked-circle</v-icon>
      </v-snackbar>
      <v-form ref="form" @submit.prevent="submit(form)">
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.email"
                data-test="login"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-2"
                label="Password"
                data-test="password"
                v-model="form.password"
                class="input-group--focused"
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text data-test="cancel" @click="resetForm">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!formIsValid" data-test="submit" text color="primary" type="submit"
            >Login</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
import { mapActions } from 'vuex';
import route from '@/constants/routes';
import HttpService from '@/services/HttpService';
import DialogModal from './sharedComponents/DialogModal.vue';

export default {
  name: 'RegistrationForm',

  components: {
    DialogModal,
  },

  data() {
    const defaultForm = Object.freeze({
      email: '',
      password: '',
    });

    return {
      form: { ...defaultForm },
      snackbar: false,
      showPassword: false,
      isErrorLogin: false,
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

    onChangeStatusError() {
      this.isErrorLogin = !this.isErrorLogin;
    },

    async submit(credentials) {
      try {
        let decoded;
        if (localStorage.getItem('authToken')) {
          decoded = jwt_decode(localStorage.getItem('authToken'));
        } else {
          const { data } = await HttpService.post(`${route.login}`, credentials);
          decoded = jwt_decode(data.accessToken);
          localStorage.setItem('authToken', data.accessToken);
        }

        if (decoded) {
          this.addUserToState(decoded);
          this.snackbar = true;
          this.$router.push({ path: route.catalog });
        }
      } catch {
        localStorage.removeItem('authToken');
        this.isErrorLogin = !this.isErrorLogin;
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

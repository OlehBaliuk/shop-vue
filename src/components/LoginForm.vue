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
          <v-btn :disabled="!formIsValid" data-test="submit" text color="primary" type="submit">Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import jwt_decode from 'jwt-decode';
import route from '@/constants/routes';
import HttpService from '@/services/HttpService';
import { Vue, Component } from 'vue-property-decorator';
import DialogModal from './sharedComponents/DialogModal.vue';

@Component({
  components: {
    DialogModal,
  },
})
export default class LoginForm extends Vue {
  form: any = { email: '', password: '' };

  snackbar: boolean = false;

  showPassword: boolean = false;

  isErrorLogin: boolean = false;

  get formIsValid(): boolean {
    return this.form.email && this.form.password;
  }

  resetForm(): void {
    (this.$refs as any).form.reset();
  }

  onChangeStatusError(): void {
    this.isErrorLogin = !this.isErrorLogin;
  }

  async submit(credentials: any) {
    try {
      const response: any = await HttpService.post(`${route.login}`, credentials);
      const decoded = jwt_decode(response.data.accessToken);
      localStorage.setItem('authToken', response.data.accessToken);

      if (decoded) {
        this.$store.dispatch('addUserToState', decoded);
        const { data }: any = await HttpService.get(route.admins);
        this.$store.dispatch('addAdminsToState', data);
        this.snackbar = true;
        this.$router.push({ name: 'catalog', params: { locale: this.$i18n.locale } });
      }
    } catch {
      localStorage.removeItem('authToken');
      this.isErrorLogin = !this.isErrorLogin;
    }
  }
}
</script>

<style scoped lang="scss">
.login-form {
  width: 50%;
}
</style>

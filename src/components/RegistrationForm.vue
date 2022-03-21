<template>
  <div class="wrapper-form">
    <h1 class="wrapper-form__title">Registration</h1>

    <form @submit.prevent="submit" class="input-wrapper">
      <label for="login-reg-rorm">
        <input
          id="login-reg-rorm"
          class="input-wrapper__field"
          type="text"
          placeholder="login.."
          v-model="dataRegistration.email"
        />
      </label>
      <label for="password-reg-form"
        ><input
          id="password-reg-form"
          class="input-wrapper__field"
          type="password"
          v-model="dataRegistration.password"
          placeholder="password.."
      /></label>

      <Button :handleClick="() => registration(dataRegistration)" class="input-wrapper_button" title="Registration" />
    </form>
  </div>
</template>

<script>
import HttpServis from '@/services/HttpService';
import Button from './Button.vue';

export default {
  name: 'RegistrationForm',
  components: {
    Button,
  },
  data: () => ({
    dataRegistration: {
      email: '',
      password: '',
    },
  }),
  methods: {
    async registration(credentials) {
      const response = await HttpServis.post('/users', credentials);
      if (response) {
        this.resetRegistrationForm();
      }
    },
    resetRegistrationForm() {
      this.dataLogin = {
        email: '',
        password: '',
      };
    },
  },
};
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;

  .input-wrapper__field {
    margin: 0.5rem;
  }

  .input-wrapper_button {
    margin: 0 auto;
  }
}
</style>

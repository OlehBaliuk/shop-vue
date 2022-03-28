<template>
  <div class="login-wrapper">
    <h1 class="login-wrapper__title">Authorization</h1>

    <div class="input-wrapper">
      <label for="login">
        <input id="login" class="input-wrapper__login" type="text" placeholder=" login.." v-model="dataLogin.email" />
      </label>
      <label for="password">
        <input
          id="password"
          class="input-wrapper__password"
          type="password"
          placeholder=" password.."
          v-model="dataLogin.password"
        />
      </label>
      <Button :handleClick="() => login(dataLogin)" class="input-wrapper_button" title="Login" />
      <Button :handleClick="() => registeration(dataLogin)" class="input-wrapper_button" title="Registeration" />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import jwt_decode from 'jwt-decode';
import { mapActions } from 'vuex';
import HttpService from '../services/HttpService';
import Button from './Button.vue';

export default {
  name: 'Authorization',
  components: {
    Button,
  },
  data: () => ({
    dataLogin: {
      email: '',
      password: '',
    },
  }),

  methods: {
    async login(credentials) {
      try {
        const token = await HttpService.post('http://localhost:3000/login', credentials);
        const decoded = jwt_decode(token.accessToken);
        if (decoded) {
          this.addUserToState(decoded);
          this.resetLoginForm();
          this.$router.push({ path: '/catalog' });
        }
      } catch (e) {
        console.log(e);
      }
      return null;
    },

    async registeration(credentials) {
      try {
        const token = await HttpService.post('http://localhost:3000/users', credentials);
        const decoded = jwt_decode(token.accessToken);
        if (decoded) {
          this.addUserToState(decoded);
          this.resetLoginForm();
          this.$router.push({ path: '/catalog' });
        }
      } catch (e) {
        console.log(e);
      }
      return null;
    },

    resetLoginForm() {
      this.dataLogin = {
        email: '',
        password: '',
      };
    },

    ...mapActions(['addUserToState']),
  },
};
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  input {
    width: 15rem;
    margin: 0.5rem;
    border-radius: 0.2rem;
    background-color: rgba(178, 238, 238, 0.5);
  }

  .input-wrapper_button {
    margin: 0.3rem auto;
  }
}
</style>

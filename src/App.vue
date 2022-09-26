<template>
  <v-app>
    <Header />
    <v-main class="d-flex justify-center">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import jwt_decode from 'jwt-decode';
import route from '@/constants/routes';
import HttpService from '@/services/HttpService';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },

  methods: {
    ...mapActions(['addUserToState', 'addAdminsToState']),

    async setAdminsToState() {
      const { data } = await HttpService.get(route.admins);
      this.addAdminsToState(data);
    },
  },

  async created() {
    if (localStorage.getItem('authToken')) {
      try {
        const decode = jwt_decode(localStorage.getItem('authToken'));
        this.addUserToState(decode);
      } catch (e) {
        console.log(e);
      }
    }

    await this.setAdminsToState();
  },
};
</script>

<style lang="scss">
html {
  font-size: 15px;

  body {
    margin: 0;

    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;

      a {
        text-decoration: none;
      }

      p {
        margin: 0;
        padding: 0;
      }

      .v-main__wrap {
        display: flex;
        justify-content: center;
      }

      input[type='number']::-webkit-outer-spin-button,
      input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      p {
        margin: 0;
        padding: 0;
      }

      .v-main__wrap {
        display: flex;
        justify-content: center;
      }

      input[type='number']::-webkit-outer-spin-button,
      input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      p {
        margin: 0;
        padding: 0;
      }

      .v-main__wrap {
        display: flex;
        justify-content: center;
      }

      input[type='number']::-webkit-outer-spin-button,
      input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
}
</style>

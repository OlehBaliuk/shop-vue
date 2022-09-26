<template>
  <v-app>
    <Header />
    <v-main class="d-flex justify-center">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import jwt_decode from 'jwt-decode';
import HttpService from '@/services/HttpService';
import { Vue, Component } from 'vue-property-decorator';
import route from '@/constants/routes';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {
  async setAdminsToState() {
    try {
      const { data }: any = await HttpService.get(route.admins);

      this.$store.dispatch('addAdminsToState', data);
    } catch (e) {
      console.log(e);
    }
  }

  async created() {
    if (localStorage.getItem('authToken') !== null) {
      try {
        const decode = jwt_decode(localStorage.getItem('authToken')!);

        this.$store.dispatch('addUserToState', decode);
      } catch (e) {
        console.log(e);
      }
    }

    await this.setAdminsToState();
  }
}
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

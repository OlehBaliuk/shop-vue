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
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
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
    }
  }
}
</style>

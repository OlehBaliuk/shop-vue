<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
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
      .main-content {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>

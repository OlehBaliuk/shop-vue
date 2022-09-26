<template>
  <div>
    <v-navigation-drawer mobile-breakpoint="0" v-if="drawer" app class="teal lighten-2">
      <NavBar />
    </v-navigation-drawer>
    <v-app-bar app color="teal lighten-1" dense dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn data-test="cart" icon router-link :to="{ name: 'cart', params: { locale: $i18n.locale } }">
        <v-icon color="white">mdi-cart</v-icon>
        <span data-test="cart-count" v-if="changeCounterCart > 0">{{ changeCounterCart }}</span>
      </v-btn>

      <v-spacer></v-spacer>
      <v-toolbar-title
        ><router-link class="catalog" :to="{ name: 'catalog', params: { locale: $i18n.locale } }">{{
          $t('header.catalog')
        }}</router-link></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <div class="locale-changer">
        <v-select @change="switchLocale" class="lang-switcher" v-model="$i18n.locale" :items="langs"></v-select>
      </div>
      <div v-if="!$store.getters.getUser.email" class="auth-wrapper">
        <router-link class="mx-2" :to="{ name: 'registration', params: { lang: $i18n.locale } }">{{
          $t('header.registration')
        }}</router-link>
        <router-link class="mx-2" :to="{ name: 'login', params: { locale: $i18n.locale } }">{{
          $t('header.login')
        }}</router-link>
      </div>
      <UserMenu v-else :userEmail="$store.getters.getUser.email" />
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import NavBar from './sharedComponents/NavBar.vue';
import UserMenu from './sharedComponents/UserMenu.vue';

@Component({
  components: {
    NavBar,
    UserMenu,
  },
})
export default class Header extends Vue {
  drawer: boolean = true;

  langs = process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(',');

  switchLocale() {
    const to = this.$router.resolve({ params: { locale: this.$i18n.locale } });
    this.$router.push(to.location);
  }

  get changeCounterCart() {
    const countEachProduct = Object.values(this.$store.getters.getCart).map((product: any) => product.count);
    const totalCount = countEachProduct.reduce((acc, count) => acc + count, 0);
    return totalCount;
  }
}
</script>

<style scoped lang="scss">
.lang-switcher {
  width: 4rem;
  height: 40px;
  margin-right: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  font-size: 2rem;
  background-color: rgb(202, 44, 202);
  margin: 0;
  padding: 0.5rem;

  .link-wrapper {
    padding: 0.5rem;

    .link-wrapper__title {
      font-size: 2rem;
      padding: 0.5rem;
    }
  }
  .v-list-item--link:before {
    background-color: inherit;
  }
}

.auth-wrapper {
  a {
    color: white;
  }
}

.catalog {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}

.v-list-item--link:before {
  background-color: inherit;
}
</style>

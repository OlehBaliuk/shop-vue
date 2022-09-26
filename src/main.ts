import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueObserveVisibility from 'vue-observe-visibility';
import vueDebounce from 'vue-debounce';
import VueMask from 'v-mask';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from './i18n';

Vue.use(VueObserveVisibility);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

Vue.use(vueDebounce, {
  listenTo: 'input',
  defaultTime: '1s',
});

Vue.use(VueMask);

Vue.axios.defaults.baseURL = 'http://localhost:3000';

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app');

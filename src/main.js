import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueObserveVisibility from 'vue-observe-visibility';
import vueDebounce from 'vue-debounce';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.use(VueObserveVisibility);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

Vue.use(vueDebounce, {
  listenTo: 'input',
  defaultTime: '800ms',
});

Vue.axios.defaults.baseURL = 'http://localhost:3000';

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');

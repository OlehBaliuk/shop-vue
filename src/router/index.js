import Vue from 'vue';
import VueRouter from 'vue-router';
import Cart from '../components/Cart.vue';
import Catalog from '../components/Catalog.vue';
import Authorization from '../components/Authorization.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: Catalog,
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: Catalog,
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: Authorization,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

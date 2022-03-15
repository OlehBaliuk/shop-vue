import Vue from 'vue';
import VueRouter from 'vue-router';
import Cart from '../components/Cart.vue';
import Catalog from '../components/Catalog.vue';
import LoginForm from '../components/LoginForm.vue';

Vue.use(VueRouter);

const routes = [
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
    path: '/login',
    name: 'login',
    component: LoginForm,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

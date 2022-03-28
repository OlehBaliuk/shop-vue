import Vue from 'vue';
import VueRouter from 'vue-router';
import Cart from '../components/Cart.vue';
import Catalog from '../components/Catalog.vue';
import RegistrationForm from '../components/RegistrationForm.vue';
import AboutProduct from '../components/AboutProduct.vue';
import AddNewProduct from '../components/AddNewProduct.vue';
import EditProduct from '../components/EditProduct.vue';
import LoginForm from '../components/LoginForm.vue';

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
    path: '/registration',
    name: 'registration',
    component: RegistrationForm,
  },
  {
    path: '/catalog/:id',
    name: 'about-product',
    component: AboutProduct,
  },
  {
    path: '/add-new-product',
    name: 'add-new-product',
    component: AddNewProduct,
  },
  {
    path: '/edit-product/:id',
    name: 'edit-product',
    component: EditProduct,
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

import Vue from 'vue';
import VueRouter from 'vue-router';
import route from '@/constants/routes';
import Cart from '../components/Cart.vue';
import Catalog from '../components/Catalog.vue';
import RegistrationForm from '../components/RegistrationForm.vue';
import AboutProduct from '../components/AboutProduct.vue';
import AddNewProduct from '../components/AddNewProduct.vue';
import EditProduct from '../components/EditProduct.vue';
import LoginForm from '../components/LoginForm.vue';
import Profile from '../components/Profile.vue';
import store from '../store';
import AdminsList from '../components/AdminsList.vue';

Vue.use(VueRouter);

function redirectFromProfileToCatalog(to, from, next) {
  if (store.getters.getUser.email) {
    next();
  } else {
    next(route.catalog);
  }
}

function redirectFromAdminsToCatalog(to, from, next) {
  const isAdmin = store.getters.admins?.filter(
    admin => admin.email === store.getters.getUser.email,
  );

  if (isAdmin) {
    next();
  } else {
    next(route.catalog);
  }
}

const routes = [
  {
    path: route.main,
    name: 'main',
    component: Catalog,
  },
  {
    path: route.cart,
    name: 'cart',
    component: Cart,
  },
  {
    path: route.catalog,
    name: 'catalog',
    component: Catalog,
  },
  {
    path: route.registration,
    name: 'registration',
    component: RegistrationForm,
  },
  {
    path: route.aboutProduct,
    name: 'about-product',
    component: AboutProduct,
  },
  {
    path: route.addNewProduct,
    name: 'add-new-product',
    component: AddNewProduct,
  },
  {
    path: route.editProduct,
    name: 'edit-product',
    component: EditProduct,
  },
  {
    path: route.login,
    name: 'login',
    component: LoginForm,
  },
  {
    path: route.profile,
    name: 'profile',
    component: Profile,
    beforeEnter: redirectFromProfileToCatalog,
  },
  {
    path: route.admins,
    name: 'admins-list',
    component: AdminsList,
    beforeEnter: redirectFromAdminsToCatalog,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import route from '@/constants/routes';
import i18n from '@/i18n';
import Cart from '../components/Cart.vue';
import Catalog from '../components/Catalog.vue';
import RegistrationForm from '../components/RegistrationForm.vue';
import AboutProduct from '../components/AboutProduct.vue';
import AddNewProduct from '../components/AddNewProduct.vue';
import EditProduct from '../components/EditProduct.vue';
import LoginForm from '../components/LoginForm.vue';
import Profile from '../components/Profile.vue';
import AdminsList from '../components/AdminsList.vue';
import ProductsTable from '../components/ProductsTable.vue';
import DragAndDrop from '../components/DragAndDrop.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/:locale',
    component: {
      template: '<router-view></router-view>',
    },
    beforeEnter: (to, from, next) => {
      const { locale } = to.params;
      const supported_locales = process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(',');
      if (!supported_locales.includes(locale)) return next('en');
      if (i18n.locale !== locale) {
        i18n.locale = locale;
      }
      return next();
    },
    children: [
      {
        path: '',
        name: 'catalog',
        component: Catalog,
      },
      {
        path: route.cart,
        name: 'cart',
        component: Cart,
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
      },
      {
        path: route.admins,
        name: 'admins-list',
        component: AdminsList,
      },
      {
        path: route.productsTable,
        name: 'products-table',
        component: ProductsTable,
      },
      {
        path: route.dragAndDrop,
        name: 'drag-and-drop',
        component: DragAndDrop,
      },
    ],
  },
  {
    path: '*',
    redirect() {
      return process.env.VUE_APP_I18N_LOCALE;
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

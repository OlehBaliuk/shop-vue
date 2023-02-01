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
import store from '../store';

// eslint-disable-next-line consistent-return
const checkIsAdmin = (to: any, from: any, next: any) => {
  const isAdmin = store.state.admins.some((admin: any) => admin.id === +store.state.user.sub);

  if (isAdmin) {
    next();
  } else {
    return next(`/${i18n.locale}`);
  }
};

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
        beforeEnter: checkIsAdmin,
      },
      {
        path: route.editProduct,
        name: 'edit-product',
        component: EditProduct,
        beforeEnter: checkIsAdmin,
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
        // eslint-disable-next-line consistent-return
        beforeEnter: (to, from, next) => {
          if (store.state.user.email) {
            next();
          } else {
            return next(`/${i18n.locale}`);
          }
        },
      },
      {
        path: route.admins,
        name: 'admins-list',
        component: AdminsList,
        beforeEnter: checkIsAdmin,
      },
      {
        path: route.productsTable,
        name: 'products-table',
        component: ProductsTable,
        beforeEnter: checkIsAdmin,
      },
      {
        path: route.dragAndDrop,
        name: 'drag-and-drop',
        component: DragAndDrop,
        beforeEnter: checkIsAdmin,
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

import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/Home/CartView.vue'),
      },
      {
        path: '',
        name: 'index',
        component: () => import('../views/Home/IndexView.vue'),
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('../views/Home/ProductsView.vue'),
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('../views/Home/ProductView.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: '/order',
        name: 'dashOrder',
        component: () => import('../views/Dashboard/OrdersView.vue'),
      },
      {
        path: '',
        name: 'dashProducts',
        component: () => import('../views/Dashboard/ProductsView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;

import Products from '@/view/Products.vue';
import Login from '@/view/Login.vue';
import Register from '@/view/Register.vue';
import Basket from '@/view/Basket.vue';
import Balance from '@/view/Balance.vue';
import Order from '@/view/Order.vue';
import Admin from '@/view/Admin.vue';
import Error from '@/view/Error.vue';

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/login', component: Login, alias: "/"},
    {path: '/register', component: Register},
    {path: '/products', component: Products},
    {path: '/basket', component: Basket},
    {path: '/order', component: Order},
    {path: '/balance', component: Balance},
    {path: '/admin', component: Admin},
    {path: '/:pathMatch(.*)*', component: Error}
  ],
  linkActiveClass: 'active',
  // linkExactActiveClass: 'active'
})

export default router

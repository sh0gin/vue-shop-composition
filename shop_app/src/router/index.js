import Products from '@/view/Products.vue';
import Login from '@/view/Login.vue';
import Register from '@/view/Register.vue';
import Basket from '@/view/Basket.vue';
import Balance from '@/view/Balance.vue';
import Order from '@/view/Order.vue';
import Admin from '@/view/Admin.vue';
import Error from '@/view/Error.vue';

import { createRouter, createWebHistory } from 'vue-router'
import Error403 from '@/view/Error403.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login', component: Login, alias: "/", beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('token')) {
          next()
        } else {
          next("/products")
        }
      }
    },
    {
      path: '/register', component: Register, beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('token')) {
          next()
        } else {
          next("/products")
        }
      }
    },
    { path: '/products', component: Products },
    {
      path: '/basket', component: Basket, beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next("/products")
        }
      }
    },
    {
      path: '/order', component: Order, beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next("/products")
        }
      }
    },
    {
      path: '/balance', component: Balance, beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next("/products")
        }
      }
    },
    { path: '/er', component: Error403 },
    {
      path: '/admin', component: Admin, beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next("/products")
        }
      }
    },
    { path: '/:pathMatch(.*)*', component: Error }
  ],

  linkActiveClass: 'active',
  // linkExactActiveClass: 'active'
})

export default router

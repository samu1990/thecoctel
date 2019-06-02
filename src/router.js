import Vue from 'vue'
import Router from 'vue-router'
import { auth } from "@/firebase";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: () => import('./views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/ingreso',
    name: 'ingreso',
    component: () => import('./views/Ingreso.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('./views/Admin.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('./views/Chat.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('./views/Search.vue'),
    meta: { requiresAuth: true }
  }
    ,
  {
    path: '/coctel/:id',
    name: 'coctel',
    component: () => import('./views/Coctel.vue'),
    meta: { requiresAuth: true }
  }
    ,
  {
    path: '/drinks',
    name: 'drinks',
    component: () => import('./views/Drinks.vue'),
    meta: { requiresAuth: true }
  }
    ,
  {
    path: '/categories',
    name: 'categories',
    component: () => import('./views/Categories.vue'),
    meta: { requiresAuth: true }
  }
    ,
  {
    path: '/ingredients',
    name: 'ingredients',
    component: () => import('./views/Ingredients.vue'),
    meta: { requiresAuth: true }
  }
    ,
  {
    path: '/indredient/:id',
    name: 'indredient',
    component: () => import('./views/Indredient.vue'),
    meta: { requiresAuth: true }
  }
    ,
  {
    path: '/saved',
    name: 'saved',
    component: () => import('./views/Saved.vue'),
    meta: { requiresAuth: true }
  }
  ]
})
router.beforeEach((to, from, next) => {
  const user = auth.currentUser
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user) {
      next()
    } else {
      next({ name: 'ingreso' })
    }
  } else {
    next()
  }
})
export default router;
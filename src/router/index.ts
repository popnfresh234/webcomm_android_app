import store from '@/store'
import { appAlert } from '@/utils/appDialog'
import { computed } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/regFido',
    name: 'RegFido',
    component: () => import('../views/RegFido.vue')
  },
  {
    path: '/scanCode',
    name: 'ScanCode',
    component: () => import('../views/ScanCode.vue')
  },
  {
    path: '/transfer',
    name: 'Transfer',
    component: () => import('../views/Transfer.vue')
  },
  {
    path: '/otp',
    name: 'OTP',
    component: () => import('../views/OTP.vue')
  },
  {
    path: '/transactionRecord',
    name: 'TransactionRecord',
    component: () => import('../views/TransactionRecord.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.name)
  console.log(from.name)

  const loginState = computed(() => store.getters.getloginStatus)
  console.log(loginState.value)
  if (loginState.value !== 'login' && to.name !== 'Home' && to.name !== 'Login') {
    appAlert('未登入請先登入', () => { next({ name: 'Login' }) })
  } else {
    next()
  }
})
export default router

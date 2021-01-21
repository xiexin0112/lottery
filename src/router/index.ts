import store from '@/store'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'Lottery Game', showTab: true, notNeedLogin: true },
    component: () => import('../views/goods/home.vue')
  },
  {
    path: '/category',
    name: 'category',
    meta: { title: 'Lottery Game', showTab: true, notNeedLogin: true },
    component: () => import('../views/goods/category.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: { title: 'Lottery Game', showTab: true, notNeedLogin: true },
    component: () => import('../views/goods/search.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    meta: { title: 'Product Detail', notNeedLogin: true },
    component: () => import('../views/goods/detail.vue')
  },
  {
    path: '/account',
    name: 'account',
    meta: { title: 'Account', showTab: true },
    component: () => import('../views/account/account.vue')
  },
  {
    path: '/lottery',
    name: 'lottery',
    meta: { title: 'Lottery Game' },
    component: () => import('../views/lottery/lottery.vue')
  },
  {
    path: '/records',
    name: 'records',
    meta: { title: 'Lottery Record' },
    component: () => import('../views/lottery/recordList.vue')
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    meta: { title: 'Withdraw Cash' },
    component: () => import('../views/account/withdraw.vue')
  },
  {
    path: '/funds',
    name: 'funds',
    meta: { title: 'Funds details' },
    component: () => import('../views/account/funds.vue')
  },
  {
    path: '/rebate',
    name: 'rebate',
    meta: { title: 'Rebate details' },
    component: () => import('../views/account/rebate.vue')
  },
  {
    path: '/invite',
    name: 'invite',
    meta: { title: 'Invitation rebate' },
    component: () => import('../views/account/invite.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: 'Sign In', notNeedLogin: true },
    component: () => import('../views/others/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: 'Register', notNeedLogin: true },
    component: () => import('../views/others/register.vue')
  },
  {
    path: '/forgot',
    name: 'forgot',
    meta: { title: 'Reset password', notNeedLogin: true },
    component: () => import('../views/others/forgot.vue')
  },
  { path: '/:catchAll(.*)', redirect: '/' }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.userInfo.userId && !to.meta.notNeedLogin) {
    next({ name: 'login' })
  } else {
    next()
  }
})

router.afterEach((to) => {
  store.commit('PAGE_TITLE', to.meta.title)
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 0)
})

export default router

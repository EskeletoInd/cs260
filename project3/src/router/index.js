import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/oldmaid',
    name: 'OldMaid',
    component: () => import('../views/OldMaid.vue')
  },
  {
    path: '/blackjack',
    name: 'Blackjack',
    component: () => import('../views/Blackjack.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

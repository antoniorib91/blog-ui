import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Publications from '../views/Publications.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Publications',
    component: Publications
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

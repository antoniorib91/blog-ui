import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Publications from '../views/Publications.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Publications',
    component: Publications
  },
  {
    path: '/sumary',
    name: 'Sumary',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Sumary.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

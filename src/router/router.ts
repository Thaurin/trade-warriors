import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Game from '../views/Game.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Game",
    component: Game
  },
  {
    path: "/settings",
    name: "Settings",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:username',
    name: 'Chatroom',
    component: () => import(/* webpackChunkName: "chatroom" */ '@/views/Chatroom.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

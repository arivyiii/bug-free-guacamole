import { createRouter, createWebHashHistory } from 'vue-router'

const ConsoleSandbox = () => import('../components/ConsoleSandbox.vue')
const JzbDecoder = () => import('../components/JzbDecoder.vue')

const routes = [
  {
    path: '/',
    name: 'ConsoleSandbox',
    component: ConsoleSandbox
  },
  {
    path: '/jzb-decoder',
    name: 'JzbDecoder',
    component: JzbDecoder
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router 
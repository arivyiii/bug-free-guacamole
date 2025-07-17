import { createRouter, createWebHashHistory } from 'vue-router'

const ConsoleSandbox = () => import('../components/ConsoleSandbox.vue')
const JzbDecoder = () => import('../components/JzbDecoder.vue')
const JzbEncoder = () => import('../components/JzbEncoder.vue')
const NetworkSandbox = () => import('../components/NetworkSandbox.vue')

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
  },
  {
    path: '/jzb-encoder',
    name: 'JzbEncoder',
    component: JzbEncoder
  },
  {
    path: '/network-sandbox',
    name: 'NetworkSandbox',
    component: NetworkSandbox
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router 
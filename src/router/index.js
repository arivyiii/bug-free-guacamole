import { createRouter, createWebHashHistory } from 'vue-router'

const ConsoleSandbox = () => import('../components/ConsoleSandbox.vue')
const DataVisualizer = () => import('../components/DataVisualizer.vue')
const JzbDecoder = () => import('../components/JzbDecoder.vue')

const routes = [
  {
    path: '/',
    name: 'ConsoleSandbox',
    component: ConsoleSandbox
  },
  {
    path: '/data-visualizer',
    name: 'DataVisualizer',
    component: DataVisualizer
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
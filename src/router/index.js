import { createRouter, createWebHistory } from 'vue-router'
import ConsoleSandbox from '../components/ConsoleSandbox.vue'
import DataVisualizer from '../components/DataVisualizer.vue'
import JzbDecoder from '../components/JzbDecoder.vue'

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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router 
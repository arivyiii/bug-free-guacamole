import { createRouter, createWebHistory } from 'vue-router'
import ConsoleSandbox from '../components/ConsoleSandbox.vue'
import DataVisualizer from '../components/DataVisualizer.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router 
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BpmnModeler from '../views/bpmn-modeler.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: BpmnModeler
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
	  {
        path: 'stats',
        name: 'Stats',
        component: () => import('@/views/Stats.vue'),
      },
	  {
        path: 'simulator',
        name: 'Simulator',
        component: () => import('@/views/Simulator.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

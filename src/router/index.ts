// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/mydocs',
    component: () => import('@/views/DashboardPage.vue'),
    children: [
      {
        path: '/dashboard/mydocs',
        component: () => import('@/components/mydoc/MyDocuments.vue'),
      },
      {
        path: '/dashboard/mydocs/add',
        component: () => import('@/components/mydoc/AddDocument.vue'),
      },
      {
        path: "/dashboard/toolbox",
        component: () => import('@/views/ToolboxPage.vue'),
      },
      {
        path: '/dashboard/toolbox/workorder',
        component: () => import('@/components/toolbox/WorkOrderExport.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

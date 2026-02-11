import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter,createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('./pages/Home.vue')
    },
    {
      name: 'ForEmp',
      path: '/empl',
      component: () => import('./pages/Employer.vue')
    },
    {
      name: 'Jobs',
      path: '/jobs',
      component: () => import('./pages/Jobs.vue')
    },
    {
      path: '/vacancy/:slug',
      name: 'VacancyFull',
      component: () => import('./pages/VacancyView.vue')
    },

    {
      path: '/admin-panel',
      name: 'Admin',
      meta: {layout : 'admin'},
      component: () => import('./admin_panel/Panel.vue'),
      children: [
        {
          path: 'edit',
          name: 'Edit',
          component: () => import('./admin_panel/Edit.vue')
        },
        {
          path: 'publish',
          name: 'Publish',
          component: () => import('./admin_panel/Publish.vue')
        },
        {
          path: 'sended',
          name: 'Sended',
          component: () => import('./admin_panel/Users.vue')
        },
        {
          path: 'vacancy',
          name: 'Vacancy',
          component: () => import('./admin_panel/Vacancy.vue')
        }
      ]
    },
    {
      path: '/privacy-policy',
      name: 'Privacy Policy',
      component: () => import('./pages/Privacy.vue')
    }
  ]
})

createApp(App).use(router).mount('#app')

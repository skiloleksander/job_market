import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter,createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
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
    ]
})

createApp(App).use(router).mount('#app')

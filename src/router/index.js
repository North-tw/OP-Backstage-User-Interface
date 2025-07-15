import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found'
  },
  {
    path: '/',
    name: 'MainView',
    component: () => import('../views/MainView.vue'),
    children: [
      {
        path: '/not-found',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue'),
        meta: {
          requiresAuth: true,
          requiresAuthKey: ['LOGIN']
        }
      },
      {
        path: '',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
        meta: {
          requiresAuth: true,
          requiresAuthKey: ['LOGIN']
        }
      },
      {
        path: 'account-info',
        name: 'AccountInfo',
        component: () => import('../views/AccountInfo.vue'),
        meta: {
          requiresAuth: true,
          requiresAuthKey: ['LOGIN']
        }
      },
      {
        path: 'table-condition',
        name: 'TableCondition',
        component: () => import('../views/TableConditionList.vue'),
        meta: {
          requiresAuth: true,
          requiresAuthKey: ['LOGIN']
        }
      }, 
      {
        path: 'add-result',
        name: 'AddResult',
        component: () => import('../views/AddResult.vue'),
        meta: {
          requiresAuth: true,
          requiresAuthKey: ['LOGIN']
        }
      },            
      {
        path: 'void-round-directly',
        name: 'VoidRoundDirectly',
        component: () => import('../views/VoidRoundDirectly.vue'),
        meta: {
          requiresAuth: true,
          requiresAuthKey: ['LOGIN']
        }
      },   
      {
        path: 'result-history',
        name: 'ResultHistory',
        component: () => import('../views/ResultHistory.vue'),
        meta: {
          requiresAuth: true,
          requiresAuthKey: ['LOGIN']
        }
      }, 
      {
        path: 'unsettle-result-history',
        name: 'UnsettleResultHistory',
        component: () => import('../views/UnsettleResultHistory.vue'),
        meta: {
          requiresAuth: true,
          requiresAuthKey: ['LOGIN']
        }
      },            
      {
        path: 'result-video-link',
        name: 'ResultVideoLink',
        component: () => import('../views/ResultVideoLink.vue'),
        meta: {
          requiresAuth: true,
          requiresAuthKey: ['LOGIN']
        }
      },             
      {
        path: 'global-maintenance',
        name: 'GlobalMaintenance',
        component: () => import('../views/GlobalMaintenance.vue'),
        meta: {
          requiresAuth: true,
          requiresAuthKey: ['LOGIN']
        }
      },  
      {
        path: 'logs/table-condition-log',
        name: 'TableConditionLog',
        component: () => import('../views/TableConditionLog.vue'),
        meta: {
          requiresAuth: true,
          requiresAuthKey: ['LOGIN']
        }
      },  
      {
        path: 'logs/void-round-directly-log',
        name: 'VoidRoundDirectlyLog',
        component: () => import('../views/VoidRoundDirectlyLog.vue'),
        meta: {
          requiresAuth: true,
          requiresAuthKey: ['LOGIN']
        }
      },            
      {
        path: 'logs/global-maintenance-log',
        name: 'GlobalMaintenanceLog',
        component: () => import('../views/GlobalMaintenanceLog.vue'),
        meta: {
          requiresAuth: true,
          requiresAuthKey: ['LOGIN']
        }
      },        
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue'),
        meta: {
          requiresAuth: false
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router

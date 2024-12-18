import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClientsView from '../views/ClientsView.vue'
import ClientsCreateView from '../views/ClientsCreateView.vue'
import ClientsEditView  from '../views/ClientsEditView.vue'
import LoginView from '../views/LoginView.vue'
import SignInView from '../views/SignInView.vue'
import UnauthorizedView from '../views/UnauthorizedView.vue'
import EmployeeView from '../views/EmployeeView.vue'
import EmployeeCreateView from '../views/EmployeeCreateView.vue'
import EmployeeEditView from '../views/EmployeesEditView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import ArticlesCreateView from '../views/ArticlesCreateView.vue'
import ArticlesEditView from '../views/ArticlesEditView.vue'

import SalesView from '@/views/SalesView.vue'
import Sales_DetailsView from '../views/Sales_DetailsView.vue'
import Sales_DetailsCreateView from '../views/Sales_DetailsCreateView.vue'
import Sales_DetailsEditView from '../views/Sales_DetailsEditView.vue'

import SalesCreateView from '../views/SalesCreateView.vue'

import { record } from 'zod'
import { getAuth } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/clients/login',
      name: 'login',
      component: LoginView
    },
    {
    path: '/clients/signIn',
    name: 'signIn',
    component: SignInView
    },
    {
      path: '/clients',
      name: 'clients',
      component: ClientsView,
      meta:{
        requiredAuth:true
      }
    },
    {
      path: '/clients/create',
      name: 'clientsCreate',
      component: ClientsCreateView
    },
    {
      path: '/clients/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedView
    },
    {
      path: '/clients/id/:id/edit',
      name: 'clientsEdit',
      component: ClientsEditView
    },
    {
      path: '/employees',
      name: 'employees',
      component: EmployeeView,
      meta:{
        requiredAuth:true
      }
    },
    {
      path: '/employees/create',
      name: 'employeesCreate',
      component: EmployeeCreateView
    },
    {
      path: '/employees/id/:id/edit',
      name: 'employeesEdit',
      component: EmployeeEditView
    },
    
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesView,
      meta:{
        requiredAuth:true
      }
    },
    {
      path: '/articles/id/:id/edit',
      name: 'articlesEdit',
      component: ArticlesEditView
    },
    {
      path: '/articles/create',
      name: 'articlesCreate',
      component: ArticlesCreateView
    },

    {
      path: '/sales/create',
      name: 'salesCreate',
      component: SalesCreateView
    },
    {
      path: '/sales',
      name: 'sales',
      component: SalesView
    },
    {
      path: '/sales_details/id/:id/details',
      name: 'sales_details',
      component: Sales_DetailsView
    },
    {
      path: '/sales_details/create',
      name: 'sales_detailscreate',
      component: Sales_DetailsCreateView
    },
    {
      path: '/sale_details/id/:id/edit',
      name: 'sale_detailsedit',
      component: Sales_DetailsEditView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    if (getAuth().currentUser) {
      next();
    } else if (
      to.path.includes('/clients') ||
      to.path.includes('/employees') ||
      to.path.includes('/articles') ||
      to.path.includes('/unauthorized') // Maneja las rutas dinámicas aquí
    ) {
      next('/clients/unauthorized');
    }
  } else {
    next();
  }
});

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/views/HomeView.vue'
import LoginView from '../views/Login/views/LoginView.vue'
import { ROLE_ADMIN, ROLE_ANYONE, ROLE_CUSTOMER, ROLE_EMPLOYEE, ROLE_MANAGER } from './enum'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, roles: [ROLE_ADMIN] }
    },
    {
      path: '/home-customer',
      name: 'home-customer',
      component: () => import('../views/Home/views/CustomerView.vue'),
      meta: { requiresAuth: true, roles: [ROLE_CUSTOMER] }
    },
    {
      path: '/home-manager',
      name: 'home-manager',
      component: () => import('../views/Home/views/ManagerView.vue'),
      meta: { requiresAuth: true, roles: [ROLE_MANAGER] }
    },
    {
      path: '/home-employee',
      name: 'home-employee',
      component: () => import('../views/Home/views/EmployeeView.vue'),
      meta: { requiresAuth: true, roles: [ROLE_EMPLOYEE] }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About/views/AboutView.vue'),
      meta: { requiresAuth: true, roles: ROLE_ANYONE }
    },
    {
      path: '/pos',
      name: 'pos',
      component: () => import('../views/POS/view/POSview.vue'),
      meta: { requiresAuth: true, roles: [ROLE_ADMIN, ROLE_EMPLOYEE, ROLE_MANAGER] }
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/Product/view/ProductView.vue'),
      meta: { requiresAuth: true, roles: [ROLE_ADMIN, ROLE_MANAGER] }
    },
    {
      path: '/customer',
      name: 'customer',
      component: () => import('../views/Customer/views/CustomerView.vue'),
      meta: { requiresAuth: true, roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_EMPLOYEE] }
    },
    {
      path: '/promotion',
      name: 'promotion',
      component: () => import('../views/Promotion/view/PromotionView.vue'),
      meta: { requiresAuth: true, roles: [ROLE_ADMIN, ROLE_MANAGER] }
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: () => import('../views/Inventory/views/InventoryView.vue'),
      meta: { requiresAuth: true, roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_EMPLOYEE] }
    },
    {
      path: '/ingredient',
      name: 'ingredient',
      component: () => import('../views/Ingredient/views/IngredientView.vue'),
      meta: { requiresAuth: true, roles: [ROLE_ADMIN, ROLE_MANAGER] }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/User/views/UserView.vue'),
      meta: { requiresAuth: true, roles: [ROLE_ADMIN] }
    },
    {
      path: '/employee',
      name: 'employee',
      component: () => import('../views/Employee/views/EmployeeView.vue'),
      meta: { requiresAuth: true, roles: [ROLE_ADMIN] }
    },
    {
      path: '/payroll',
      name: 'payroll',
      component: () => import('../views/Payroll/views/PayrollView.vue'),
      meta: { requiresAuth: true, roles: [ROLE_ADMIN] }
    },
    {
      path: '/receipt',
      name: 'receipt',
      component: () => import('../views/Receipt/views/ReceiptView.vue'),
      meta: { requiresAuth: true, roles: [ROLE_EMPLOYEE, ROLE_ADMIN, ROLE_MANAGER] }
    },
    {
      path: '/bill',
      name: 'bill',
      component: () => import('../views/Bill/views/BillViews.vue'),
      meta: { requiresAuth: true, roles: [ROLE_EMPLOYEE, ROLE_ADMIN, ROLE_MANAGER] }
    },
    {
      path: '/attendance',
      name: 'attendance',
      component: () => import('../views/Attendance/views/AttendanceView.vue'),
      meta: { requiresAuth: true, roles: [ROLE_EMPLOYEE, ROLE_ADMIN, ROLE_MANAGER] }
    },
    {
      path: '/stock-taking-history',
      name: 'stock taking history',
      component: () => import('../views/Inventory/views/StockTakingHistory.vue'),
      meta: { requiresAuth: true, roles: [ROLE_EMPLOYEE, ROLE_ADMIN, ROLE_MANAGER] }
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: () => import('../views/Forbidden/views/ForbiddenView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/branch',
      name: 'branch',
      component: () => import('../views/Branch/views/BranchView.vue'),
      meta: { requiresAuth: true, roles: [ROLE_ADMIN] }
    },
    {
      path: '/replenishment-history',
      name: 'replenishment history',
      component: () => import('../views/Inventory/views/ReplenishmentHistory.vue'),
      meta: { requiresAuth: true, roles: [ROLE_EMPLOYEE, ROLE_ADMIN, ROLE_MANAGER] }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile/views/ProfileView.vue'),
      meta: { requiresAuth: true, roles: ROLE_ANYONE }
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('../views/Report/views/ReportView.vue'),
      meta: { requiresAuth: true, roles: [ROLE_EMPLOYEE, ROLE_ADMIN, ROLE_MANAGER] }
    }
  ]
})

export default router

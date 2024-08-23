import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/Home/views/HomeView.vue'
import LoginView from '../pages/Login/views/LoginView.vue'
import { Role } from './enum'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, roles: [Role.admin] }
    },
    {
      path: '/home-customer',
      name: 'home-customer',
      component: () => import('../pages/Home/views/CustomerView.vue'),
      meta: { requiresAuth: true, roles: [Role.customer] }
    },
    {
      path: '/home-manager',
      name: 'home-manager',
      component: () => import('../pages/Home/views/ManagerView.vue'),
      meta: { requiresAuth: true, roles: [Role.manager] }
    },
    {
      path: '/home-employee',
      name: 'home-employee',
      component: () => import('../pages/Home/views/EmployeeView.vue'),
      meta: { requiresAuth: true, roles: [Role.employee] }
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
      component: () => import('../pages/About/views/AboutView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/pos',
      name: 'pos',
      component: () => import('../pages/POS/view/POSview.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee] }
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../pages/Product/view/ProductView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager] }
    },
    {
      path: '/customer',
      name: 'customer',
      component: () => import('../pages/Customer/views/CustomerView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee] }
    },
    {
      path: '/promotion',
      name: 'promotion',
      component: () => import('../pages/Promotion/view/PromotionView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager] }
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: () => import('../pages/Inventory/views/InventoryView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee] }
    },
    {
      path: '/ingredient',
      name: 'ingredient',
      component: () => import('../pages/Ingredient/views/IngredientView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager] }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../pages/User/views/UserView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin] }
    },
    {
      path: '/employee',
      name: 'employee',
      component: () => import('../pages/Employee/views/EmployeeView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin] }
    },
    {
      path: '/payroll',
      name: 'payroll',
      component: () => import('../pages/Payroll/views/PayrollView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin] }
    },
    {
      path: '/receipt',
      name: 'receipt',
      component: () => import('../pages/Receipt/views/ReceiptView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee] }
    },
    {
      path: '/bill',
      name: 'bill',
      component: () => import('../pages/Bill/views/BillViews.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee] }
    },
    {
      path: '/attendance',
      name: 'attendance',
      component: () => import('../pages/Attendance/views/AttendanceView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee] }
    },
    {
      path: '/stock-taking-history',
      name: 'stock taking history',
      component: () => import('../pages/Inventory/views/StockTakingHistory.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee] }
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: () => import('../pages/Forbidden/views/ForbiddenView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/branch',
      name: 'branch',
      component: () => import('../pages/Branch/views/BranchView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin] }
    },
    {
      path: '/replenishment-history',
      name: 'replenishment history',
      component: () => import('../pages/Inventory/views/ReplenishmentHistory.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee] }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../pages/Profile/views/ProfileView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee, Role.customer] }
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('../pages/Report/views/ReportView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee] }
    }
  ]
})

export default router

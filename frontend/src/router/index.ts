import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/Home/views/HomeView.vue'
import LoginView from '../pages/Login/views/LoginView.vue'
import { Role } from './enum'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: HomeView,
      meta: { requiresAuth: true, roles: [Role.admin], layout: 'main' }
    },
    {
      path: '/home-customer',
      name: 'Dashboard Customer',
      component: () => import('../pages/Home/views/CustomerView.vue'),
      meta: { requiresAuth: true, roles: [Role.customer], layout: 'main' }
    },
    {
      path: '/home-manager',
      name: 'Dashboard Manager',
      component: () => import('../pages/Home/views/ManagerView.vue'),
      meta: { requiresAuth: true, roles: [Role.manager], layout: 'main' }
    },
    {
      path: '/home-employee',
      name: 'Dashboard Employee',
      component: () => import('../pages/Home/views/EmployeeView.vue'),
      meta: { requiresAuth: true, roles: [Role.employee], layout: 'main' }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { requiresAuth: false, layout: 'full' }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../pages/About/views/AboutView.vue'),
      meta: { requiresAuth: false, layout: 'full' }
    },
    {
      path: '/pos',
      name: 'Point of Sale',
      component: () => import('../pages/POS/view/POSview.vue'),
      meta: {
        requiresAuth: true,
        roles: [Role.admin, Role.manager, Role.employee],
        layout: 'focus'
      }
    },
    {
      path: '/product',
      name: 'Product',
      component: () => import('../pages/Product/view/ProductView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager], layout: 'main' }
    },
    {
      path: '/customer',
      name: 'Customer',
      component: () => import('../pages/Customer/views/CustomerView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee], layout: 'main' }
    },
    {
      path: '/promotion',
      name: 'Promotion',
      component: () => import('../pages/Promotion/view/PromotionView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager], layout: 'main' }
    },
    {
      path: '/inventory',
      name: 'Inventory',
      component: () => import('../pages/Inventory/views/InventoryView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee], layout: 'main' }
    },
    {
      path: '/ingredient',
      name: 'Ingredient',
      component: () => import('../pages/Ingredient/views/IngredientView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager], layout: 'main' }
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('../pages/User/views/UserView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin], layout: 'main' }
    },
    {
      path: '/employee',
      name: 'Employee',
      component: () => import('../pages/Employee/views/EmployeeView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin], layout: 'main' }
    },
    {
      path: '/payroll',
      name: 'Payroll',
      component: () => import('../pages/Payroll/views/PayrollView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin], layout: 'main' }
    },
    {
      path: '/receipt',
      name: 'Receipt',
      component: () => import('../pages/Receipt/views/ReceiptView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee], layout: 'main' }
    },
    {
      path: '/bill',
      name: 'Bill',
      component: () => import('../pages/Bill/views/BillViews.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee], layout: 'main' }
    },
    {
      path: '/attendance',
      name: 'Attendance',
      component: () => import('../pages/Attendance/views/AttendanceView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee], layout: 'main' }
    },
    {
      path: '/stock-taking-history',
      name: 'Stock Taking history',
      component: () => import('../pages/Inventory/views/StockTakingHistory.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee], layout: 'main' }
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: () => import('../pages/Forbidden/views/ForbiddenView.vue'),
      meta: { requiresAuth: false, layout: 'full' }
    },
    {
      path: '/branch',
      name: 'Branch',
      component: () => import('../pages/Branch/views/BranchView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin], layout: 'main' }
    },
    {
      path: '/replenishment-history',
      name: 'Replenishment History',
      component: () => import('../pages/Inventory/views/ReplenishmentHistory.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee], layout: 'main' }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../pages/Profile/views/ProfileView.vue'),
      meta: {
        requiresAuth: true,
        roles: [Role.admin, Role.manager, Role.employee, Role.customer],
        layout: 'full'
      }
    },
    {
      path: '/report',
      name: 'Report',
      component: () => import('../pages/Report/views/ReportView.vue'),
      meta: { requiresAuth: true, roles: [Role.admin, Role.manager, Role.employee], layout: 'main' }
    }
  ]
})

export default router

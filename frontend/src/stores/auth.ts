import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AuthService } from '@/services/auth'
import { Role } from '@/router/enum'

export interface UserProfile {
  branch: {
    id: number
    name: string
  }
  fullName: string
  employeeId?: number
  customerId?: number
  id: number
  imageUrl: string
  role: string
  username: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: ref<UserProfile | null>(null),
    showAppBar: ref(true),
    isTokenExpired: ref(false),
    errorMessage: ref('')
  }),
  getters: {
    getCurrentUser: (s) => s.user,
    getRole: (s) => s.user?.role
  },
  actions: {
    async signIn(username: string, password: string): Promise<boolean> {
      try {
        const res = await AuthService.signIn(username, password)
        // localStorage.setItem('user', JSON.stringify(res.user))
        localStorage.setItem('access_token', res.access_token)
        this.isTokenExpired = false
        // this.user = res.user
        await this.checkBeforePush()
        this.showAppBar = true
        // if (res.user.role !== 'customer') {
        //   useAttendanceStore().openDialog()
        // }
        this.getProfile()
        return true
      } catch (error) {
        return false
      }
    },
    async getProfile() {
      const res: UserProfile = await AuthService.getProfile()
      if (!res) {
        return
      }
      this.user = res
    },
    // async getCurrentUser(): Promise<UserPayload | null> {
    //   // return JSON.parse(localStorage.getItem('user') as string)
    // },
    async isAuthenticated(): Promise<boolean> {
      // return localStorage.getItem('user') !== null && !this.isTokenExpired
      const res = await AuthService.getProfile()
      if (!res) {
        return false
      }
      return true
    },
    async isAuthorized(routeRoles: string[]): Promise<boolean> {
      // const userPayloadString = localStorage.getItem('user')

      // if (!userPayloadString) {
      //   console.error('User payload not found in localStorage.')
      //   return false
      // }

      // const user: UserPayload = JSON.parse(userPayloadString)

      // if (!user.role) {
      //   console.error('User role not found in user payload.')
      //   return false
      // }

      // return routeRoles.some((role) => role === user.role)

      const res = await AuthService.getProfile()
      if (!res) {
        return false
      }
      return routeRoles.some((role) => role === res.role)
    },
    async logout(isTokenExpired?: boolean): Promise<void> {
      this.user = null
      localStorage.clear()
      router.replace('/login')
      this.isTokenExpired = isTokenExpired ?? false
      this.showAppBar = false
    },
    async checkBeforePush() {
      switch (this.user?.role) {
        case Role.admin:
          await router.replace('/')
          break
        case Role.manager:
          await router.replace('/home-manager')
          break
        case Role.employee:
          await router.replace('/home-employee')
          break
        case Role.customer:
          await router.replace('/home-customer')
          break
        default:
          await router.replace('/pos')
      }
    },
    isCustomer() {
      return this.user?.role === Role.customer
    },
    isAdmin() {
      return this.user?.role === Role.admin
    },
    isEmployee() {
      return this.user?.role === Role.employee
    },
    isManager() {
      return this.user?.role === Role.manager
    }
  }
})

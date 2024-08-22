import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AuthService } from '@/services/auth'
import { useAttendanceStore } from '@/views/Attendance/stores/attendance'
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_EMPLOYEE, ROLE_MANAGER } from '@/router/enum'

export interface UserPayload {
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

type Payload = {
  user: UserPayload
  access_token: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: ref<UserPayload | null>(),
    showAppBar: ref(true),
    isTokenExpired: ref(false),
    errorMessage: ref('')
  }),
  actions: {
    async signIn(username: string, password: string): Promise<boolean> {
      try {
        const res: Payload = await AuthService.signIn(username, password)
        localStorage.setItem('user', JSON.stringify(res.user))
        localStorage.setItem('access_token', res.access_token)
        this.isTokenExpired = false
        this.user = res.user
        await this.checkBeforePush()
        this.showAppBar = true
        if (res.user.role !== 'customer') {
          useAttendanceStore().openDialog()
        }
        return true
      } catch (error) {
        return false
      }
    },
    getCurrentUser(): UserPayload | undefined {
      return JSON.parse(localStorage.getItem('user') as string)
    },
    isAuthenticated(): boolean {
      return localStorage.getItem('user') !== null && !this.isTokenExpired
    },
    isAuthorized(routeRoles: string[]): boolean {
      const userPayloadString = localStorage.getItem('user')

      if (!userPayloadString) {
        console.error('User payload not found in localStorage.')
        return false
      }

      const user: UserPayload = JSON.parse(userPayloadString)

      if (!user.role) {
        console.error('User role not found in user payload.')
        return false
      }

      return routeRoles.some((role) => role === user.role)
    },
    async logout(isTokenExpired?: boolean): Promise<void> {
      this.user = null
      await localStorage.clear()
      router.replace('/login')
      this.isTokenExpired = isTokenExpired ?? false
      this.showAppBar = false
    },
    async checkBeforePush() {
      switch (this.user?.role) {
        case ROLE_ADMIN:
          await router.replace('/')
          break
        case ROLE_MANAGER:
          await router.replace('/home-manager')
          break
        case ROLE_EMPLOYEE:
          await router.replace('/home-employee')
          break
        case ROLE_CUSTOMER:
          await router.replace('/home-customer')
          break
        default:
          await router.replace('/pos')
      }
    },
    isCustomer(): boolean {
      return this.getCurrentUser()?.role === ROLE_CUSTOMER
    },
    isAdmin(): boolean {
      return this.getCurrentUser()?.role === ROLE_ADMIN
    },
    isEmployee(): boolean {
      return this.getCurrentUser()?.role === ROLE_EMPLOYEE
    },
    isManager(): boolean {
      return this.getCurrentUser()?.role === ROLE_MANAGER
    }
  }
})

import type { AxiosError } from 'axios'
import http from './http'
import { useAuthStore } from '@/stores/auth'

export class AuthService {
  private static readonly path = '/auth'

  public static async signIn(username: string, password: string) {
    try {
      const dto = { username: username, password: password }
      const res = await http.post(`${this.path}/login`, dto)
      return res.data
    } catch (error: any) {
      if (error.isAxiosError) {
        const axiosError = error as AxiosError<any>
        if (axiosError.response) {
          const { data } = axiosError.response
          useAuthStore().errorMessage = data.message
        }
      }
      throw new Error('An error occurred during sign-in')
    }
  }

  public static async getProfile() {
    try {
      const res = await http.get(`${this.path}/profile`)
      return res.data
    } catch (error: any) {
      if (error.isAxiosError) {
        const axiosError = error as AxiosError<any>
        if (axiosError.response) {
          const { data } = axiosError.response
          useAuthStore().errorMessage = data.message
          return null
        }
      }
      throw new Error('An error occurred during get profile')
    }
  }
}

import type { ProfileDTO } from '@/types/profile'
import http from './http'

export class ProfileServices {
  private static path = 'profile'

  public static async getSales(dto: ProfileDTO) {
    try {
      const res = await http.post(`${this.path}/sales`, dto)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }
}

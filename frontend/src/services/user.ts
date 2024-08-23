import type { User } from '@/pages/User/types/user'
import http from './http'

export class UserService {
  private static path = '/users'
  public static async getAll() {
    try {
      const res = await http.get(this.path)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  public static async create(user: User) {
    try {
      const res = await http.post(this.path, user)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
  public static async delete(index: number) {
    try {
      const res = await http.delete(`${this.path}/${index}`)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
  public static async getById(index: number) {
    try {
      const res = await http.get(`${this.path}/${index}`)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
  public static async update(user: User) {
    try {
      const res = await http.patch(`${this.path}/${user.id}`, user)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
}

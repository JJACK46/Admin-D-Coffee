import http from './http'

export class RoleService {
  private static path = 'roles'

  public static async getAll() {
    try {
      const res = await http.get(this.path)
      return res.data
    } catch {
      throw new Error()
    }
  }
}

import type { Attendance, AttendanceDto } from '@/views/Attendance/types/attendance'
import http from './http'

export class AttendanceService {
  private static path = '/attendances'
  public static async getAll() {
    try {
      const res = await http.get(this.path)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  public static async getAllWhereEmployee(id: number) {
    try {
      const res = await http.get(`${this.path}/employee/${id}`)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  public static async create(item: Attendance) {
    try {
      const res = await http.post(this.path, item)
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
  public static async getTrackUser(uid: number, date: string): Promise<Attendance | null> {
    try {
      const res = await http.get(`${this.path}/track/${uid}/${date}`)
      return res.data
    } catch (e) {
      console.log(e)
    }
    return null
  }
  public static async update(item: AttendanceDto | null) {
    if (item) {
      try {
        const res = await http.patch(this.path, item)
        return res.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}

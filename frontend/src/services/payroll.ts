import type { Slip } from '@/views/Payroll/types/slip'
import http from './http'

export class PayrollService {
  private static path = '/payroll'
  public static async getAllPending() {
    try {
      const res = await http.get(`${this.path}/pending`)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  public static async getAllPaid() {
    try {
      const res = await http.get(`${this.path}/paid`)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  public static async create(item: Slip) {
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
  public static async update(item: Slip) {
    try {
      const res = await http.patch(`${this.path}/${item.id}`, item)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
}

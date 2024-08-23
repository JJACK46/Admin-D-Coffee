import type { Receipt } from '@/types/receipt'
import http from './http'

export class ReceiptService {
  private static path = '/receipts'
  public static async create(item: Receipt) {
    try {
      const res = await http.post(this.path, item)
      return res.status
    } catch (error) {
      throw new Error()
    }
  }
  public static async getAll() {
    try {
      const res = await http.get(this.path)
      return res.data
    } catch (error) {
      throw new Error()
    }
  }
  public static async getAllWithFilter(year: number, month: number) {
    try {
      const res = await http.get(`${this.path}/${year}/${month}`)
      return res.data
    } catch (error) {
      throw new Error()
    }
  }
  public static async getAllWhereUser(id: number) {
    try {
      const res = await http.get(`${this.path}/user/${id}`)
      return res.data
    } catch (error) {
      throw new Error()
    }
  }
  public static async getAllWhereCustomer(id: number) {
    try {
      const res = await http.get(`${this.path}/customer/${id}`)
      return res.data
    } catch (error) {
      throw new Error()
    }
  }
  public static delete(id: number) {
    try {
      http.delete(`${this.path}/${id}`)
    } catch (error) {
      throw new Error()
    }
  }
}

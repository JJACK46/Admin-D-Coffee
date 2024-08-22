import http from './http'
import type { Customer } from '@/views/Customer/types/Customer'

export class CustomerService {
  private static path = '/customers'
  public static async getAll() {
    try {
      const res = await http.get(this.path)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
  public static async getAllWithPurchase() {
    try {
      const res = await http.get(`${this.path}/purchase`)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  public static async create(cus: Customer) {
    try {
      const { imageFile, ...rest } = cus
      const formData = new FormData()
      formData.append('customer', JSON.stringify(rest))
      formData.append('file', imageFile!)
      const res = await http.post(this.path, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
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
  public static async update(cus: Customer) {
    try {
      const { imageFile, ...rest } = cus
      const formData = new FormData()
      formData.append('customer', JSON.stringify(rest))
      formData.append('file', imageFile!)
      const res = await http.post(this.path, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  public static async updatePoints(id: number, point: number) {
    try {
      const res = await http.patch(`${this.path}/${id}/${point}`)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
}

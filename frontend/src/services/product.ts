import type { Product } from '@/views/Product/types/product'
import http from './http'

export class ProductService {
  private static path = '/products'
  public static async getAll() {
    try {
      const res = await http.get(this.path)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  public static async create(item: Product, files: File[]) {
    try {
      const form = new FormData()
      form.append('product', JSON.stringify(item))
      form.append('file', files[0])
      const res = await http.post(this.path, form, {
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
  public static async update(item: Product, files: File[]) {
    try {
      const form = new FormData()
      form.append('product', JSON.stringify(item))
      form.append('file', files[0])
      const res = await http.patch(`${this.path}/${item.id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return res.data
    } catch (e) {
      console.log(e)
    }
  }
}

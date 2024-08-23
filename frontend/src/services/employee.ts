import http from './http'
import type { Employee } from '@/pages/Employee/types/employee'

export class EmployeeService {
  private static path = '/employees'
  public static async getAll() {
    try {
      const res = await http.get(this.path)
      return res.data
    } catch (e) {
      console.log(e)
    }
  }

  public static async create(emp: Employee) {
    try {
      type DtoEmp = Omit<Employee, 'imageUrl'>
      const { imageFile, ...rest }: DtoEmp = emp
      const formData = new FormData()
      formData.append('employee', JSON.stringify(rest))
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
  public static async update(emp: Employee) {
    try {
      delete emp.imageUrl
      const { imageFile, ...rest } = emp
      const formData = new FormData()
      formData.append('employee', JSON.stringify(rest))
      formData.append('file', imageFile!)
      const res = await http.post(`${this.path}/${emp.id}`, formData, {
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

import type { Employee } from '@/types/employee'
import type { Role } from './role'
import type { Customer } from '@/types/Customer'

export type User = {
  id?: number
  username: string
  password: string
  role?: Role
  roleId: number | undefined
  employee?: Employee
  employeeId: number | undefined
  customer?: Customer
  customerId: number | undefined
  imageUrl?: string
}

export const defaultUser: User = {
  username: '',
  password: '',
  roleId: undefined,
  employeeId: undefined,
  customerId: undefined
}

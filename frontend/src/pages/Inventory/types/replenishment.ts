import type { Ingredient } from '@/pages/Ingredient/types/ingredient'
import type { Inventory } from './inventory'
import type { Employee } from '@/pages/Employee/types/employee'

export type ReplenishmentItem = {
  id?: number
  ingredientId: number | undefined
  ingredient?: Ingredient
  balance: number
  cost: number
}

export const defaultReplenishmentItem: ReplenishmentItem = {
  ingredientId: undefined,
  balance: 0,
  cost: 0
}

export type Replenishment = {
  id?: number
  employeeId: number
  employee?: Employee
  inventoryId: number
  inventory?: Inventory
  createdDate?: string
  createdTime?: string
  totalCost: number
  replenishmentItems: ReplenishmentItem[]
  inventoryName?: string
  employeeFullName?: string
}

export const defaultReplenishment: Replenishment = {
  employeeId: 0,
  inventoryId: 0,
  createdDate: '',
  totalCost: 0,
  replenishmentItems: []
}

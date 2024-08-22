import type { Inventory } from './inventory'
import type { Employee } from '@/views/Employee/types/employee'

export type StockTaking = {
  id?: number
  inventoryId: number
  inventory?: Inventory
  inventoryName?: string
  employeeId: number
  employee?: Employee
  username?: string
  employeeName?: string
  createdDate?: string
  createdTime?: string
  stockTakingItems: StockTakingItem[]
}

export type StockTakingItem = {
  stockTakingId?: number
  inventoryItemId: number
  balanceUpdate: number
  balanceOld: number
}

export const defaultStockTaking: StockTaking = {
  inventoryId: 0,
  employeeId: 0,
  stockTakingItems: []
}

export const defaultStockTakingItem: StockTakingItem = {
  inventoryItemId: 0,
  balanceOld: 0,
  balanceUpdate: 0
}

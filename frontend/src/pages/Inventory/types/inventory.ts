import type { Ingredient } from '@/pages/Ingredient/types/ingredient'

export type Inventory = {
  id?: number
  name?: string
  inventoryItems: InventoryItem[]
}

export type InventoryItem = {
  id?: number
  inventoryId: number
  ingredientId: number
  ingredient?: Ingredient
  minBalance: number
  balance: number
}

export const defaultInventory: Inventory = {
  inventoryItems: []
}

export const defaultInventoryItem: InventoryItem = {
  ingredientId: 0,
  inventoryId: 0,
  minBalance: 0,
  balance: 0
}

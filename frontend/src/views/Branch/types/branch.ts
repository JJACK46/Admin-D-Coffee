import type { Inventory } from './../../Inventory/types/inventory'
export type Branch = {
  id?: number
  name: string
  location?: string
  inventory?: Inventory
}

export const defaultBranch: Branch = {
  name: '',
  location: ''
}

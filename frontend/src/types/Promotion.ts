import type { Product } from '@/views/Product/types/product'

export type Status = 'active' | 'inactive'
export type Promotion = {
  id?: number
  name: string
  description?: string
  discountPercentage: number
  createdDate?: string
  endDate: string
  usableProductsId: number[]
  usableProducts?: Product[]
  usableProductsName?: string[]
  combo: boolean
}

export const defaultPromotion: Promotion = {
  name: '',
  discountPercentage: 0,
  endDate: '',
  usableProductsId: [],
  combo: false
}

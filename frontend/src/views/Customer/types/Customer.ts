import type { Receipt } from '@/views/Receipt/types/receipt'

export type Customer = {
  id?: number
  firstName: string
  lastName: string
  tel: string
  point?: number
  imageUrl?: string
  imageFile?: File
  fullName?: string
  birthDate: string
  createdDate?: string
  receipts?: Receipt[]
  purchase?: PurchaseDetails
}

export const defaultCustomer: Customer = {
  firstName: '',
  lastName: '',
  tel: '',
  birthDate: ''
}
export interface PurchaseDetails {
  mostOne: MostOne
  totalSpending: number
}

export interface MostOne {
  product_id: number
  product_name: string
  product_price: number
  product_type: string
  product_imageName: string
  product_category: string
  totalAmount: number
  price: number
}

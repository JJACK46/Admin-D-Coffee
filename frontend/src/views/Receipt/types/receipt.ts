import type { Promotion } from '@/views/Promotion/types/Promotion'
import type { Customer } from '@/views/Customer/types/Customer'
import type { Branch } from '@/views/Branch/types/branch'
import type { Product } from '@/views/Product/types/product'

export type PaymentTypes = 'cash' | 'creditCard' | 'promptPay'

export type receiptItemsShort = {
  name: string
  amount: number
  price: number
}

export type ReceiptItem = {
  id?: number
  productId: number
  product?: Product
  amount: number
  price: number
}

export type Receipt = {
  id?: number
  createdDate: string
  createdTime: string
  totalPrice: number
  totalDiscount: number
  totalNet: number
  receivedAmount: number
  change: number
  promotionId?: number
  promotion?: Promotion
  paymentType: PaymentTypes
  employeeId: number
  customerId?: number
  customer?: Customer
  customerName?: string
  earnPoint?: number
  usedPoint?: number
  totalPoint?: number
  receiptItems: ReceiptItem[]
  branch?: Branch
  branchId: number
  employeeName?: string
  receiptItemsShort?: receiptItemsShort[]
  branchName?: string
}

export const defaultReceipt: Receipt = {
  customerId: 0,
  createdDate: '',
  createdTime: '',
  totalPrice: 0,
  totalDiscount: 0,
  totalNet: 0,
  receivedAmount: 0,
  change: 0,
  paymentType: 'cash',
  employeeId: 0,
  branchId: 0,
  receiptItems: []
}

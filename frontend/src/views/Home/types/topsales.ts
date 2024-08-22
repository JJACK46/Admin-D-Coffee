import type { Product } from '@/views/POS/types/Products'

export interface TopSaleItem {
  product: Product
  amount: Number
  totalValue: Number
}

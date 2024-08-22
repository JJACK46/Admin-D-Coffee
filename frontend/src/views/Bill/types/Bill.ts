export type Bill = {
  id?: number
  date: string
  worth: number
  status: boolean
  category: string
  lines: BillLine[]
}

export type BillLine = {
  id?: number
  billId?: number
  name: string
  price: number
}

export const defaultBill: Bill = {
  date: '',
  worth: 0,
  status: false,
  category: '',
  lines: []
}

export interface SalesOfUser {
  daily: Daily[]
  monthly: Monthly[]
  yearly: Yearly[]
}

export interface Daily {
  id: number
  time: string
  totalNet: number
  date: string
}

export interface Monthly {
  id: number
  month: string
  totalNet: number
}

export interface Yearly {
  year: string
  totalNet: number
}

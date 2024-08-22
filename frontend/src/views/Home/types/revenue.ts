export interface RevenueDTO {
  branchId?: number
  month: number
  year: number
}

export const defaultRevenueDTO: RevenueDTO = {
  month: 0,
  year: 0
}

export interface Revenue {
  day: Day[]
  month: Month[]
  year: Year[]
}

export interface Day {
  totalNet: number
  date: string
}

export interface Month {
  month: string
  totalNet: number
}

export interface Year {
  year: string
  totalNet: number
}

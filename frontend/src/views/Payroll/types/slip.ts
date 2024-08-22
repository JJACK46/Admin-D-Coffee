import type { Branch } from '@/views/Branch/types/branch'
import type { Employee } from '@/views/Employee/types/employee'

export type StatusPayment = 'paid' | 'pending'
export type Slip = {
  id?: number
  branchId: number
  branch?: Branch
  employeeId: number
  employee?: Employee
  status: StatusPayment
  dueDate: string
  paidDate: string
  netEarnings: number
  totalDeduction: number
  totalEarnings: number
  payrollDetails: SlipDetails
  YTDWithholdingTax: number
  YTDEarnings: number
  accumulatedSSF: number
}

export type SlipDetails = {
  id?: number
  slipId?: number
  salaryWage: number
  bonus: number
  overtime: number
  otherDeduction: number
  incentive: number
  tax: number
  insurance: number
  socialSecurityFund: number
  otherEarnings: number
  positionAllowance: number
  absentLeaveLate: number
  missAttendance: number
  welfare: number
}

export const defaultSlipDetails: SlipDetails = {
  salaryWage: 0,
  bonus: 0,
  overtime: 0,
  otherDeduction: 0,
  incentive: 0,
  tax: 0,
  insurance: 0,
  socialSecurityFund: 0,
  otherEarnings: 0,
  positionAllowance: 0,
  absentLeaveLate: 0,
  missAttendance: 0,
  welfare: 0
}

export const defaultSlip: Slip = {
  branchId: 0,
  employeeId: 0,
  status: 'pending' as StatusPayment,
  dueDate: '',
  paidDate: '',
  netEarnings: 0,
  totalDeduction: 0,
  totalEarnings: 0,
  payrollDetails: defaultSlipDetails,
  YTDWithholdingTax: 0,
  YTDEarnings: 0,
  accumulatedSSF: 0
}

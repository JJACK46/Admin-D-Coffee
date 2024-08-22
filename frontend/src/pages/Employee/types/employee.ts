import type { Branch } from '@/pages/Branch/types/branch'
import type { Genders } from './gender'
import type { JobTitles } from './jobTitle'

export type Employee = {
  id?: number
  branchId: number
  branch?: Branch
  title: JobTitles | undefined
  salaryWage: number
  minWorkHour: number
  firstName: string
  lastName: string
  tel: string
  gender: Genders | undefined
  birthDate: string
  biography: string
  startDate: string
  fullName?: string
  imageUrl?: string
  imageFile?: File
}
export const defaultEmployee: Employee = {
  branchId: 0,
  title: undefined,
  salaryWage: 0,
  minWorkHour: 0,
  firstName: '',
  lastName: '',
  tel: '',
  gender: undefined,
  birthDate: '',
  biography: '',
  startDate: '',
  imageUrl: ''
}

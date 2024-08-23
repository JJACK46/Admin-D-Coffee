import type { Employee } from '@/views/Employee/types/employee'

export type TypeWork = 'Missing' | 'Normal' | 'OT'
export type Attendance = {
  id?: number
  date: string
  employeeId: number
  employee?: Employee
  clockIn: string
  clockOut: string
  timeWorked: number
  typeWork: TypeWork | string
}
export type AttendanceDto = {
  id: number
  clockOut: string
  timeWorked: number
  typeWork: TypeWork | string
}
export const defaultItem: Attendance = {
  date: '',
  clockIn: '',
  clockOut: '',
  timeWorked: -1,
  typeWork: '',
  employeeId: 0
}

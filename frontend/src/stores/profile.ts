import type { SalesOfUser } from '@/types/sales'
import { AttendanceService } from '@/services/attendance'
import { ReceiptService } from '@/services/receipt'
import { PayrollService } from '@/services/payroll'
import { useAuthStore } from '@/stores/auth'
import type { Attendance } from '@/types/attendance'
import type { Receipt } from '@/types/receipt'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Slip } from '@/types/slip'
import type { Customer } from '@/types/Customer'
import { CustomerService } from '@/services/customer'
import type { Employee } from '@/types/employee'
import { EmployeeService } from '@/services/employee'
import { ProfileServices } from '@/services/profile'
import { defaultProfileDTO, type ProfileDTO } from '@/types/profile'

export const useProfileStore = defineStore('profile', {
  state() {
    return {
      auth: useAuthStore(),
      profileDTO: ref<ProfileDTO>(defaultProfileDTO),
      customer: ref<Customer>(),
      employee: ref<Employee>(),
      sales: ref<SalesOfUser>(),
      receipts: ref<Receipt[]>([]),
      slips: ref<Slip[]>([]),
      attendanceRecord: ref<Attendance[]>([]),
      headersAttendance: [
        { title: 'ID', key: 'id' },
        { title: 'Date', key: 'date' },
        { title: 'Clock In', key: 'clockIn' },
        { title: 'Clock Out', key: 'clockOut' },
        { title: 'Time Worked', key: 'timeWorked', sortable: false },
        { title: 'Types', key: 'types', sortable: false }
      ],
      // headersReceipt: [
      //   { title: 'ID', key: 'id' },
      //   { title: 'Date', key: 'createdDate', sortable: false },
      //   { title: 'Time', key: 'createdTime', sortable: false },
      //   { title: 'Total Net', key: 'totalNet', sortable: false },
      //   { title: 'Payment Type', key: 'paymentType', sortable: false }
      // ],
      headersSlips: [
        { title: 'ID', key: 'id' },
        { title: 'Period', key: 'dueDate', sortable: false },
        { title: 'Paid Date', key: 'paidDate', sortable: false },
        { title: 'Total Net Earnings', key: 'netEarnings', sortable: false }
      ]
    }
  },
  getters: {
    getSales: (s) => s.sales,
    getDailySoldCount: (state) => state.receipts.length,
    getAttendanceCount: (state) => state.attendanceRecord.length,
    getAttMissingCount: (state) =>
      state.attendanceRecord.reduce(
        (sum, item) => (item.typeWork === 'Missing' ? sum + 1 : sum),
        0
      ),
    getAttNormalCount: (state) =>
      state.attendanceRecord.reduce((sum, item) => (item.typeWork === 'Normal' ? sum + 1 : sum), 0),
    getAttOTCount: (state) =>
      state.attendanceRecord.reduce((sum, item) => (item.typeWork === 'OT' ? sum + 1 : sum), 0)
  },
  actions: {
    setupDTO(id: number) {
      this.profileDTO = {
        userId: id,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      }
    },
    async fetchSales() {
      this.sales = await ProfileServices.getSales(this.profileDTO)
    },
    async fetchCustomerReceipts(id: number) {
      this.receipts = await ReceiptService.getAllWhereCustomer(id)
    },
    async fetchCustomer(id: number) {
      this.customer = await CustomerService.getById(id)
    },
    async fetchEmployee(id: number) {
      this.employee = await EmployeeService.getById(id)
    },
    async fetchSlips(id: number) {
      this.slips = await PayrollService.getWhereEmp(id)
    },
    async fetchAttendance(id: number) {
      this.attendanceRecord = await AttendanceService.getAllWhereUser(id)
    }
  }
})

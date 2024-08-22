import { PayrollService } from '@/services/payroll'

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { defaultSlip, type Slip, type SlipDetails } from '../types/slip'
import type { Employee } from '@/views/Employee/types/employee'
import { EmployeeService } from '@/services/employee'

interface FieldData {
  thLabel: string
  enLabel: string
  key: keyof SlipDetails
}

export const usePayrollStore = defineStore('payroll', {
  state() {
    return {
      tableTextTitle: ref('Select option first'),
      tempSlip: ref<Slip>(defaultSlip),
      isSlipDialogOpen: ref(false),
      payrollList: ref<Slip[]>([]),
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Branch', key: 'branch.name', sortable: false },
        { title: 'Job Title', key: 'employee.title', sortable: false },
        { title: 'Name', key: 'employee.fullName', sortable: false },
        { title: 'Net to pay', key: 'totalEarnings', sortable: false },
        { title: 'Due Date', key: 'dueDate', sortable: false },
        { title: 'Status', key: 'status', sortable: false },
        { title: 'Action', key: 'actions', sortable: false }
      ],
      isNewSlip: ref(false),
      availableEmployee: ref<Employee[]>(),
      selectEmployee: ref<Employee>(),
      fieldsData: [
        {
          earning: [
            { thLabel: 'เงินเดือน/ค่าจ้าง', enLabel: 'Salary/Wage', key: 'salaryWage' },
            { thLabel: 'ค่าล่วงเวลา', enLabel: 'Overtime', key: 'overtime' },
            { thLabel: 'ค่าเบี้ยขยัน', enLabel: 'Incentive', key: 'incentive' },
            {
              thLabel: 'ค่าประจำตำแหน่ง',
              enLabel: 'Position Allowances',
              key: 'positionAllowance'
            },
            { thLabel: 'โบนัส', enLabel: 'Bonus', key: 'bonus' },
            { thLabel: 'เงินได้อื่น ๆ', enLabel: 'Other Earnings', key: 'otherEarnings' }
          ] as FieldData[]
        },
        {
          deduction: [
            { thLabel: 'ประกันสังคม', enLabel: 'Social Security Fund', key: 'socialSecurityFund' },
            { thLabel: 'ภาษีหัก ณ ที่จ่าย', enLabel: 'Withholding Tax', key: 'tax' },
            { thLabel: 'ค่าสวัสดิการ', enLabel: 'Welfare', key: 'welfare' },
            { thLabel: 'เงินประกัน', enLabel: 'Insurance', key: 'insurance' },
            { thLabel: 'ขาด/ลา/มาสาย', enLabel: 'Absent/Leave/Late', key: 'absentLeaveLate' },
            { thLabel: 'รายการหักอื่น ๆ', enLabel: 'Other Deductions', key: 'otherDeduction' }
          ] as FieldData[]
        },
        {
          summary: [
            { thLabel: 'เงินได้สะสม', enLabel: 'YTD Earnings', key: 'YTDEarnings' },
            {
              thLabel: 'ภาษีหัก ณ ที่จ่ายสะสม',
              enLabel: 'YTD Withholding Tax',
              key: 'YTDWithholdingTax'
            },
            { thLabel: 'เงินประกันสังคมสะสม', enLabel: 'Accumulated SSF', key: 'accumulatedSSF' },
            { thLabel: 'รวมเงินได้', enLabel: 'Total Earnings', key: 'totalEarnings' },
            { thLabel: 'รวมรายการหัก', enLabel: 'Total Deductions', key: 'totalDeduction' },
            { thLabel: 'เงินได้สุทธิ', enLabel: 'Net Earnings', key: 'netEarnings' }
          ] as { thLabel: string; enLabel: string; key: keyof Slip }[]
        }
      ]
    }
  },
  getters: {
    getFieldsData: (s) => s.fieldsData,
    getEmployees: (s) => s.availableEmployee ?? [],
    getSelectEmployee: (s) => s.selectEmployee,
    getSalaryWage: (state) =>
      state.tempSlip.employee?.salaryWage ?? state.selectEmployee?.salaryWage,
    getNetEarnings: (state) => state.tempSlip.totalEarnings - state.tempSlip.totalDeduction,
    getTotalDeduction: (state) => state.tempSlip.totalDeduction,
    getTotalEarnings: (state) => state.tempSlip.totalEarnings
  },
  actions: {
    async fetchEmployees() {
      this.availableEmployee = await EmployeeService.getAll()
    },
    calculateTotalEarnings(slipDetails: SlipDetails): number {
      const earnings = [
        slipDetails.salaryWage,
        slipDetails.bonus,
        slipDetails.overtime,
        slipDetails.incentive,
        slipDetails.otherEarnings,
        slipDetails.positionAllowance
      ]
      const result = earnings.reduce((sum, value) => sum + value, 0)
      this.tempSlip.totalEarnings = result
      return result
    },
    calculateTotalDeductions(slipDetails: SlipDetails): number {
      const deductions = [
        slipDetails.tax,
        slipDetails.insurance,
        slipDetails.socialSecurityFund,
        slipDetails.otherDeduction,
        slipDetails.absentLeaveLate,
        slipDetails.missAttendance,
        slipDetails.welfare
      ]
      const result = deductions.reduce((sum, value) => sum + value, 0)
      this.tempSlip.totalDeduction = result
      return result
    },
    openSlipDialog(slip?: Slip) {
      if (slip) {
        this.isNewSlip = false
        this.tempSlip = slip
      } else {
        this.fetchEmployees()
        this.isNewSlip = true
      }
      this.isSlipDialogOpen = true
    },
    closeSlipDialog() {
      this.tempSlip = { ...defaultSlip }
      this.isSlipDialogOpen = false
    },
    async selectPending() {
      this.tableTextTitle = 'Pending Table'
      this.payrollList = await PayrollService.getAllPending()
    },
    async selectPaid() {
      this.tableTextTitle = 'Paid Table'
      this.payrollList = await PayrollService.getAllPaid()
    },
    async save(slip: Slip) {
      if (slip) {
        this.tempSlip = {
          ...this.tempSlip,
          branchId: slip.branch?.id!,
          totalDeduction: slip.totalDeduction,
          totalEarnings: slip.totalEarnings,
          netEarnings: slip.netEarnings,
          payrollDetails: slip.payrollDetails
        }
        await PayrollService.update(this.tempSlip)

        this.closeSlipDialog()
      }
    }
  }
})

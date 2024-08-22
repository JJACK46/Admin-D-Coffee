import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { defaultEmployee, type Employee } from '../types/employee'
import { EmployeeService } from '@/services/employee'
import type { Branch } from '@/pages/Branch/types/branch'
import { BranchService } from '@/services/branch'

export const useEmployeeStore = defineStore('employee', {
  state() {
    return {
      selectedJobTitle: ref(''),
      tempItem: reactive<Employee>({ ...defaultEmployee }),
      titleDialog: ref(''),
      dialogState: ref(false),
      employees: ref<Employee[]>([]),
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Branch', key: 'branch', sortable: false },
        { title: 'Title', key: 'title', sortable: false },
        { title: 'Name', key: 'fullName', sortable: false },
        { title: 'Image', key: 'imageUrl', sortable: false },
        { title: 'Tel.', key: 'tel', sortable: false },
        { title: 'Gender', key: 'gender', sortable: false },
        { title: 'Birth Date', key: 'birthDate', sortable: false },
        { title: 'Biography', key: 'biography', sortable: false },
        { title: 'Salary/Wage', key: 'salaryWage', sortable: false },
        { title: 'Minimum Work', key: 'minWorkHour', sortable: false },
        { title: 'Start Work Date', key: 'startDate', sortable: false }
      ],
      availableBranch: ref<Branch[]>([])
    }
  },
  getters: {
    getBranch: (s) => s.availableBranch,
    getEmployees: (state) => JSON.parse(JSON.stringify(state.employees)) as Employee[],
    getEmployeesWithFullName(): Employee[] {
      return this.employees.map((employee) => ({
        ...employee,
        fullName: `${employee.firstName} ${employee.lastName}`
      }))
    }
  },
  actions: {
    async updateItem() {
      await EmployeeService.update(this.tempItem)
      this.fetchAll()
    },
    async fetchBranch() {
      this.availableBranch = await BranchService.getAll()
    },
    openDialog(item?: Employee) {
      this.fetchBranch()
      this.resetItem()
      if (item) {
        this.titleDialog = 'Edit Employee'
        this.tempItem = { ...item }
      } else {
        this.titleDialog = 'New Employee'
      }
      this.dialogState = true
    },
    closeDialog() {
      this.resetItem()
      this.dialogState = false
    },
    async createItem() {
      this.tempItem.title = await EmployeeService.create(this.tempItem)
      this.fetchAll()
    },
    async fetchAll() {
      this.employees = await EmployeeService.getAll()
    },
    async deleteItem(index: number) {
      if (confirm('Are you sure to delete ?')) {
        await EmployeeService.delete(index)
        this.resetItem()
      }
      this.fetchAll()
    },
    resetItem() {
      this.tempItem = { ...defaultEmployee }
    },
    async save() {
      if (this.tempItem.id) {
        await this.updateItem()
      } else {
        await this.createItem()
      }
      this.fetchAll()
      this.closeDialog()
    },
    handleFileChange(files: File): void {
      if (files) {
        this.tempItem.imageFile = files
        const reader = new FileReader()
        reader.onload = (event: ProgressEvent<FileReader>) => {
          this.tempItem.imageUrl = event.target?.result?.toString()
        }
        reader.readAsDataURL(files)
      }
    }
  }
})

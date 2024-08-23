import { UserService } from '@/services/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { defaultUser, type User } from '../types/user'
import { type Employee } from '@/types/employee'
import { EmployeeService } from '@/services/employee'
import { RoleService } from '@/services/roles'
import type { Role } from '../types/role'
import type { Customer } from '@/types/Customer'
import { CustomerService } from '@/services/customer'

export const useUserStore = defineStore('users', {
  state: () => ({
    service: UserService,
    headers: [
      { title: 'ID', key: 'id' },
      { title: 'Image', key: 'imageUrl', sortable: false },
      { title: 'Username', key: 'username', sortable: false },
      { title: 'Name', key: 'fullName', sortable: false },
      {
        title: 'Employee',
        key: 'employeeId',
        value: (emp: any) => {
          if (emp.employeeId) {
            return 'Yes'
          }
          return 'No'
        },
        sortable: false
      },
      { title: 'Roles', key: 'role.name', sortable: false }
    ],
    users: ref<User[]>([]),
    tempItem: ref<User>({ ...defaultUser }),
    employees: ref<Employee[]>([]),
    customers: ref<Customer[]>([]),
    dialogState: ref(false),
    formTitle: ref(''),
    availableRoles: ref<Role[]>()
  }),
  getters: {
    getRoles: (s) => s.availableRoles
  },
  actions: {
    openDialog(item?: User) {
      this.fetchEmployee()
      this.fetchRoles()
      if (item) {
        this.formTitle = 'Edit User'
        this.tempItem = { ...item }
      } else {
        this.formTitle = 'New User'
        this.resetItem()
      }
      this.dialogState = true
    },
    closeDialog() {
      this.resetItem()
      this.dialogState = false
    },
    resetItem() {
      this.tempItem = { ...defaultUser }
    },
    async save() {
      if (this.tempItem.id) {
        await this.service.update(this.tempItem)
      } else {
        await this.service.create(this.tempItem)
      }
      this.getAllUsers()
      this.closeDialog()
    },
    async deleteItem(id: number) {
      if (confirm('Are you sure ?')) {
        await this.service.delete(id)
        this.closeDialog()
      }
      this.getAllUsers()
    },
    async getAllUsers() {
      this.users = await this.service.getAll()
    },
    async fetchEmployee() {
      this.employees = await EmployeeService.getAll()
    },
    async fetchCustomer() {
      this.customers = await CustomerService.getAll()
    },
    async fetchRoles() {
      this.availableRoles = await RoleService.getAll()
    }
  }
})

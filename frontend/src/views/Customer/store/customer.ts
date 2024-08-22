import { defaultCustomer } from './../types/Customer'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Customer } from '../types/Customer'
import { CustomerService } from '@/services/customer'

export const useCustomerStore = defineStore('customer', {
  state() {
    return {
      tempItem: ref<Customer>({ ...defaultCustomer }),
      titleDialog: ref(''),
      dialogState: ref(false),
      customers: ref<Customer[]>(),
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Name', key: 'fullName', sortable: false },
        { title: 'Image', key: 'imageUrl', sortable: false },
        { title: 'Tel', key: 'tel' },
        { title: 'Point', key: 'point', sortable: false },
        { title: 'Birth Date', key: 'birthDate', sortable: false }
      ]
    }
  },
  getters: {
    getCustomers: (state) => state.customers ?? [],
    getEditCustomer: (s) => {
      delete s.tempItem.point
      delete s.tempItem.fullName
      return s.tempItem
    }
  },
  actions: {
    openDialog(item?: Customer) {
      if (item) {
        this.titleDialog = 'Edit Customer'
        this.tempItem = { ...item }
      } else {
        this.titleDialog = 'New Customer'
      }
      this.dialogState = true
    },
    closeDialog() {
      this.resetItem()
      this.dialogState = false
    },
    async fetchAll() {
      this.customers = await CustomerService.getAll()
    },
    deleteItem(id: number) {
      if (confirm('Are you sure to delete ?')) {
        CustomerService.delete(id)
        this.resetItem()
      }
      this.fetchAll()
    },
    resetItem() {
      this.tempItem = {
        ...defaultCustomer
      }
    },
    save() {
      if (this.tempItem.id) {
        CustomerService.update(this.tempItem)
      } else {
        delete this.tempItem.imageUrl
        CustomerService.create(this.tempItem)
      }
      this.fetchAll()
      this.closeDialog()
    },
    handleFileChange(files: File[]) {
      if (files) {
        this.tempItem.imageFile = files[0]
        const reader = new FileReader()
        reader.onload = (event: any) => {
          this.tempItem.imageUrl = event.target.result
        }
        reader.readAsDataURL(files[0])
      }
    }
  }
})

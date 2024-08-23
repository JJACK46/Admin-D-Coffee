import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CustomerService } from '@/services/customer'
import { type Customer, defaultCustomer } from '@/types/Customer'

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
    handleFileChange(files: File[] | File): void {
      const fileArray = Array.isArray(files) ? files : [files]
      if (fileArray.length > 0) {
        this.tempItem.imageFile = fileArray[0]
      }
      const reader = new FileReader()
      reader.onload = (event: ProgressEvent<FileReader>) => {
        this.tempItem.imageUrl = event.target?.result as string
      }
      reader.readAsDataURL(fileArray[0])
    }
  }
})

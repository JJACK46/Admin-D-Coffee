import { defineStore } from 'pinia'
import { ref } from 'vue'

import { defaultProduct, type Product } from '../types/product'
import { ProductService } from '@/services/product'

export const useProductStore = defineStore('product', {
  state() {
    return {
      tempItem: ref<Product & { files: File[] }>({ ...defaultProduct, files: [] }),
      titleDialog: ref(''),
      dialogState: ref(false),
      products: ref<Product[]>([]),
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Image', key: 'imageName', sortable: false },
        { title: 'Name', key: 'name', sortable: false },
        { title: 'Price', key: 'price', sortable: false },
        { title: 'Type', key: 'type', sortable: false }
      ],
      imageUrl: ref('')
    }
  },
  getters: {
    getProducts: (state) => state.products
  },
  actions: {
    handleFileImageChange(files: File[]) {
      if (files) {
        const reader = new FileReader()
        reader.onload = (event: any) => {
          this.imageUrl = event.target.result
        }
        reader.readAsDataURL(files[0])
      }
    },
    openDialog(item?: Product, files?: File[]) {
      if (item && files) {
        this.titleDialog = 'Edit Product'
        this.tempItem = { ...item, files: files }
      } else {
        this.titleDialog = 'New Product'
      }
      this.dialogState = true
    },
    closeDialog() {
      this.resetItem()
      this.dialogState = false
    },
    async fetchAll() {
      this.products = await ProductService.getAll()
    },
    getById() {},
    async deleteItem(index: number) {
      if (confirm('Are you sure to delete ?')) {
        await ProductService.delete(index)
        this.resetItem()
      }
      this.fetchAll()
    },
    resetItem() {
      this.tempItem = { ...defaultProduct, files: [] }
      this.imageUrl = ''
    },
    async save() {
      const { files, ...product } = this.tempItem
      if (this.tempItem.id) {
        await ProductService.update(product, files)
      } else {
        await ProductService.create(product, files)
      }
      this.fetchAll()
      this.closeDialog()
    },
    formatLabel(key: string) {
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
    }
  }
})

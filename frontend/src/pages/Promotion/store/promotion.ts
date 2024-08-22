import { defineStore } from 'pinia'
import { ref } from 'vue'
import { defaultPromotion, type Promotion } from '../types/Promotion'
import { PromotionService } from '@/services/promotion'
import { ProductService } from '@/services/product'
import type { Product } from '@/views/Product/types/product'

export const usePromotionStore = defineStore('promotion', {
  state() {
    return {
      tempItem: ref<Promotion>({ ...defaultPromotion }),
      titleDialog: ref(''),
      dialogState: ref(false),
      promotions: ref<Promotion[]>([]),
      products: ref<Product[]>([]),
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Name', key: 'name', sortable: false },
        { title: 'Discount', key: 'discountPercentage', sortable: false },
        { title: 'Created Date', key: 'createdDate', sortable: false },
        { title: 'End Date', key: 'endDate', sortable: false },
        { title: 'Combo Set', key: 'combo', sortable: false }
      ]
    }
  },
  getters: {
    getItems: (state) => state.promotions,
    getProductsId: (state) => state.products.map((pro) => pro.id)
  },
  actions: {
    openDialog(item?: Promotion) {
      if (item) {
        this.titleDialog = 'Edit Promotion'
        this.tempItem = { ...item }
      } else {
        this.titleDialog = 'New Promotion'
      }
      this.dialogState = true
    },
    closeDialog() {
      this.resetItem()
      this.dialogState = false
    },
    async fetchAll() {
      this.promotions = await PromotionService.getAll()
      this.products = await ProductService.getAll()
    },
    async deleteItem(index: number) {
      if (confirm('Are you sure to delete ?')) {
        await PromotionService.delete(index)
        this.resetItem()
      }
      this.fetchAll()
    },
    resetItem() {
      this.tempItem = { ...defaultPromotion }
    },
    async save() {
      if (this.tempItem.id) {
        await PromotionService.update(this.tempItem)
      } else {
        await PromotionService.create(this.tempItem)
      }
      this.fetchAll()
      this.closeDialog()
    }
  }
})

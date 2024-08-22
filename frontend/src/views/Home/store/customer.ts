import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/views/Product/types/product'
import type { Promotion } from '@/views/Promotion/types/Promotion'
import { ProductService } from '@/services/product'
import { PromotionService } from '@/services/promotion'
export const useHomeCustomerStore = defineStore('home-customer', {
  state() {
    return {
      products: ref<Product[]>(),
      promotions: ref<Promotion[]>()
    }
  },
  getters: {
    getListCoffee: (s) => s.products?.filter((item) => item.category === 'coffee'),
    getListMilkTea: (s) => s.products?.filter((item) => item.category === 'milk tea'),
    getListPureTea: (s) => s.products?.filter((item) => item.category === 'pure tea'),
    getListAppetizer: (s) => s.products?.filter((item) => item.type === 'Appetizer')
  },
  actions: {
    async fetchAll() {
      this.products = await ProductService.getAll()
      this.promotions = await PromotionService.getAll()
    }
  }
})

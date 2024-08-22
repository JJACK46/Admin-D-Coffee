import { defineStore } from 'pinia'
import { ref } from 'vue'
import { defaultIngredient, type Ingredient } from '../types/ingredient'
import { IngredientService } from '@/services/ingredient'

export const useIngredientStore = defineStore('ingredient', {
  state() {
    return {
      isDialogOpen: ref(false),
      ingredients: ref<Ingredient[]>([]),
      tempItem: ref<Ingredient>({ ...defaultIngredient }),
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Name', key: 'name', sortable: false },
        { title: 'Unit', key: 'unit', sortable: false }
      ]
    }
  },
  getters: {
    getTitleDialog: (state) => {
      if (state.tempItem.id) {
        return 'Edit Ingredient'
      }
      return 'New Ingredient'
    }
  },
  actions: {
    async fetchAll() {
      this.ingredients = await IngredientService.getAll()
    },
    openDialog(item?: Ingredient) {
      if (item) {
        this.tempItem = item
      }
      this.isDialogOpen = true
    },
    closeDialog() {
      this.resetItem()
      this.isDialogOpen = false
    },
    resetItem() {
      this.tempItem = { ...defaultIngredient }
    },
    async deleteItem(id: number) {
      await IngredientService.delete(id)
      this.resetItem()
    },
    async save() {
      if (this.tempItem.id) {
        await IngredientService.update(this.tempItem)
      } else {
        await IngredientService.create(this.tempItem)
      }
      this.fetchAll()
      this.closeDialog()
    }
  }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', {
  state() {
    return {
      isLoading: ref(false)
    }
  },
  actions: {
    doLoading() {
      this.isLoading = true
    },
    doneLoading() {
      this.isLoading = false
    }
  }
})

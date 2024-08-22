import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDatePickerStore = defineStore('datePicker', {
  state: () => {
    return {
      editDate: ref<Date | null>(new Date()),
      selectedDate: ref<Date | null>(null),
      dialog: ref(false)
    }
  },
  getters: {
    getSelectedDate: (state) => state.selectedDate?.toLocaleDateString()
  },
  actions: {
    resetState() {
      this.editDate = new Date()
      this.selectedDate = null
    },
    closeDialog() {
      this.dialog = false
    },
    openDialog() {
      this.dialog = true
    },
    saveDate() {
      this.selectedDate = this.editDate!
      this.closeDialog()
    }
  }
})

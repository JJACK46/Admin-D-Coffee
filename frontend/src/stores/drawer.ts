import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

export const useMainDrawerStore = defineStore('main_drawer', {
  state() {
    return {
      railState: ref(true),
      isExpand: ref()
    }
  },
  getters: {
    getRail: (state) => {
      if (useDisplay().mdAndDown) {
        state.railState = false
      }
      return state.railState
    }
  },
  actions: {
    switchRail() {
      this.railState = !this.railState
    },
    switchDrawer() {
      this.isExpand = !this.isExpand
    },
    closeDrawer() {
      this.isExpand = false
    },
    openDrawer() {
      this.isExpand = true
    }
  }
})

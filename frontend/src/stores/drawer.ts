import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

export const useMainDrawerStore = defineStore('main_drawer', {
  state() {
    return {
      railState: ref(true),
      isDrawerExpand: ref(false)
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
      this.isDrawerExpand = !this.isDrawerExpand
    },
    closeDrawer() {
      this.isDrawerExpand = false
    },
    openDrawer() {
      this.isDrawerExpand = true
    }
  }
})

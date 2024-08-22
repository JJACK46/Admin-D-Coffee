import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

type TypePopText = 'success' | 'error' | 'info'
type ColorSnackbar = {
  type: TypePopText
  color: string
}

const ListColorSnackbar: ColorSnackbar[] = [
  { type: 'success', color: 'green' },
  { type: 'info', color: '' },
  { type: 'error', color: 'red' }
]

export const useNotificationStore = defineStore('notifications', {
  state() {
    return {
      hasBadge: ref(false),
      displayCount: ref(0),
      items: ref<string[]>([]),
      tempMsg: ref(''),
      tempSnackbar: reactive({
        text: '',
        color: ''
      }),
      isSnackbarDisplay: ref(false)
    }
  },
  getters: {
    getItemsOrderLast: (state) => {
      return state.items.reverse()
    },
    hasNotification: (state) => {
      return state.items.length > 0
    },
    getNotificationIcon: (state) => {
      if (state.hasBadge) {
        return 'mdi-bell-badge'
      }
      return 'mdi-bell'
    },
    getLastNotification: (state) => {
      if (state.items.length > 0) {
        return state.items[state.items.length - 1]
      }
      return ''
    }
  },
  actions: {
    addPopText(msg: string, type?: TypePopText) {
      this.tempSnackbar.text = msg
      const color = type ? ListColorSnackbar.find((item) => item.type === type)?.color : ''
      this.tempSnackbar.color = color ?? ''
      this.isSnackbarDisplay = true
      this.addNotification(msg)
    },
    addNotification(msg: string) {
      this.hasBadge = true
      this.items.push(msg)
    },
    removeItem(index: number) {
      this.items.splice(index, 1)
    },
    clearItems() {
      this.items.length = 0
    },
    setRead() {
      this.hasBadge = false
    }
  }
})

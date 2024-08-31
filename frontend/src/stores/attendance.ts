import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Attendance, type AttendanceDto, type TypeWork } from '../types/attendance'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notifications'
import { AttendanceService } from '@/services/attendance'
import { getDateNowString, getTimeNowString } from '@/utils/date'

export const useAttendanceStore = defineStore('attendance', {
  state: () => {
    return {
      trackedItem: ref<Attendance | null>(),
      auth: useAuthStore(),
      service: AttendanceService,
      statusText: ref(''),
      isDialogOpen: ref(false),
      items: ref<Attendance[]>([]),
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Date', key: 'date' },
        { title: 'Employee', key: 'employeeName', sortable: false },
        { title: 'Clock In', key: 'clockIn' },
        { title: 'Clock Out', key: 'clockOut' },
        { title: 'Time Worked', key: 'timeWorked', sortable: false },
        { title: 'Types', key: 'typeWork', sortable: false }
      ]
    }
  },
  getters: {
    getStatusText: (state) => {
      if (state.trackedItem) {
        state.trackedItem.clockOut
          ? (state.statusText = `You were attendance today at : ${state.trackedItem.clockIn}`)
          : (state.statusText = `You were clock in: ${state.trackedItem.clockIn}`)
        return state.statusText
      }
      return ''
    }
  },
  actions: {
    async fetchAll() {
      this.items = await this.service.getAll()
    },
    openDialog() {
      this.isDialogOpen = true
    },
    closeDialog() {
      this.isDialogOpen = false
    },
    async save() {
      await this.getCurrentAttendanceUser()
      if (this.trackedItem) {
        if (this.trackedItem.clockIn && this.trackedItem.clockOut) {
          alert('You already had attendance today !')
          this.updateDataAndClose()
          return
        }
        await this.service.update(await this.getClockOutItem())
      } else {
        await this.service.create(<Attendance>{
          date: getDateNowString(),
          employeeId: this.auth.getCurrentUser?.empId,
          clockIn: getTimeNowString(),
          clockOut: '',
          timeWorked: 0,
          typeWork: ''
        })
      }
      this.updateDataAndClose()
    },
    async getClockOutItem() {
      if (this.trackedItem) {
        const clockInTime = this.trackedItem.clockIn
        const clockOutTime = getTimeNowString()

        // Calculate time difference in hours (for simplicity)
        const timeWorked = Math.floor(
          (new Date(`2000-01-01T${clockOutTime}`).getTime() -
            new Date(`2000-01-01T${clockInTime}`).getTime()) /
            (1000 * 60 * 60)
        )

        let typeWork: TypeWork = 'Missing'
        if (timeWorked >= 8) {
          typeWork = 'Normal'
        } else if (timeWorked >= 10) {
          typeWork = 'OT'
        }
        const updatedItem = <AttendanceDto>{
          id: this.trackedItem.id,
          clockOut: clockOutTime,
          timeWorked: timeWorked,
          typeWork: typeWork
        }
        return updatedItem
      }
      return null
    },
    updateDataAndClose() {
      useNotificationStore().addNotification(this.getStatusText)
      this.fetchAll()
      this.isDialogOpen = false
    },
    async getCurrentAttendanceUser() {
      this.trackedItem = await this.service.getTrackUser(
        this.auth.getCurrentUser?.id ?? 0,
        getDateNowString()
      )
    }
  }
})

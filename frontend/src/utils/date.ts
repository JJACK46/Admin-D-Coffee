import { onBeforeUnmount, ref } from 'vue'

export function getDateNowString(): string {
  // const timeZoneOffset = new Date().getTimezoneOffset() * 60000
  // return new Date(Date.now() - timeZoneOffset).toISOString().slice(0, 10)
  return new Date().toLocaleDateString('fr-CA')
}

export function getDateNow(): Date {
  const timeZoneOffset = new Date().getTimezoneOffset() * 60000
  return new Date(Date.now() - timeZoneOffset)
}

export function getTimeNowString(): string {
  return new Date().toLocaleTimeString('th-TH', { hour12: false })
}

// const dayShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const monthsWithNum = [
  { label: 'Jan', number: 1 },
  { label: 'Feb', number: 2 },
  { label: 'Mar', number: 3 },
  { label: 'Apr', number: 4 },
  { label: 'May', number: 5 },
  { label: 'Jun', number: 6 },
  { label: 'Jul', number: 7 },
  { label: 'Aug', number: 8 },
  { label: 'Sep', number: 9 },
  { label: 'Oct', number: 10 },
  { label: 'Nov', number: 11 },
  { label: 'Dec', number: 12 }
]

export const monthShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export function getMonthAbbreviation(monthNumber: number | string): string {
  return monthShort[(monthNumber as unknown as number) - 1]
}

export const useCurrentTime = () => {
  const currentTime = ref(new Date().toLocaleTimeString('th-TH', { hour12: false }))
  const updateCurrentTime = () => {
    currentTime.value = new Date().toLocaleTimeString('th-TH', { hour12: false })
  }
  const updateTimeInterval = setInterval(updateCurrentTime, 1000)
  onBeforeUnmount(() => {
    clearInterval(updateTimeInterval)
  })
  return currentTime
}

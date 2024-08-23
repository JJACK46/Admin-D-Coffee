<script setup lang="ts">
import { baseURLImage } from '@/services/http'
import { useAuthStore } from '@/stores/auth'
import { useMainDrawerStore } from '@/stores/drawer'
import { useNotificationStore } from '@/stores/notifications'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useDisplay, useTheme } from 'vuetify'

const auth = useAuthStore()
const drawer = useMainDrawerStore()
const notification = useNotificationStore()
const toggleNotifications = ref(false)
const realTimeData = ref('')

function closeNotificationDialog() {
  notification.setRead()
  toggleNotifications.value = false
}

function clearAndClose() {
  notification.clearItems()
  closeNotificationDialog()
}

const theme = useTheme()
const toggleDark = ref(true)
const colorAppBar = ref('fifth')

watch(
  () => toggleDark.value,
  (val) => {
    theme.global.name.value = val ? 'dark' : 'light'
    colorAppBar.value = val ? 'fifth' : 'primary'
  }
)

const useCurrentTime = () => {
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

const currentTime = useCurrentTime()

const fieldAppMenu = [
  { icon: 'mdi-account-outline', title: 'Profile', path: '/profile' },
  { icon: 'mdi-translate', title: 'Language', path: '' },
  { icon: 'mdi-cog-outline', title: 'Settings', path: '' }
]
</script>

<template>
  <v-app-bar :color="colorAppBar" elevation="1" app>
    <template #prepend>
      <v-app-bar-nav-icon
        v-if="useDisplay().mdAndDown.value"
        @click="drawer.switchDrawer()"
      ></v-app-bar-nav-icon>
    </template>

    <template #title>
      <v-list-item title="Enterprise App" prepend-avatar="d-coffee-logo.png" class="pa-0">
        <template #title>
          <h4 v-if="auth.isCustomer()">D-Coffee Shop</h4>
          <h4 v-else>Enterprise App</h4>
          <h5>By Aphidech Mahakoat</h5>
        </template>
      </v-list-item>
    </template>

    <template #default>
      <v-snackbar
        v-model="notification.isSnackbarDisplay"
        location="top"
        :color="notification.tempSnackbar.color"
        close-delay="1100"
        rounded="lg"
        class="elevation-0"
      >
        <span class="d-flex justify-center font-weight-bold text-body-2">
          {{ notification.tempSnackbar.text }}
        </span>
      </v-snackbar>
    </template>
    <template #append>
      <div>
        {{ currentTime }}
      </div>
      <div>
        <v-btn :icon="notification.getNotificationIcon" @click="notification.setRead()"> </v-btn>
        <v-menu activator="parent" :close-on-content-click="false">
          <template #default>
            <v-card rounded="lg">
              <v-card-title>
                <v-row>
                  <v-col>
                    <p cla>Notifications</p>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="auto">
                    <v-btn variant="text" size="small" icon="mdi-cog-outline"></v-btn>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-divider />
              <v-card-text v-if="notification.hasNotification" class="pa-0">
                <v-list>
                  <v-list-item
                    v-for="(item, index) in notification.getItemsOrderLast"
                    :key="index"
                    prepend-icon="mdi-clock"
                    class="pa-5"
                  >
                    {{ item }}
                    <template #append>
                      <v-btn
                        class="ml-2"
                        size="small"
                        flat
                        icon="mdi-close"
                        @click="notification.items.splice(index, 1)"
                      ></v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-text v-else class="text-center">
                <v-list-item title="No data"> </v-list-item>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn @click="clearAndClose" variant="plain" size="small"> Clear </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-menu>
      </div>
      <v-menu name="profile" :close-on-content-click="false">
        <template #activator="{ props }">
          <v-avatar v-bind="props" class="mr-2" style="cursor: pointer">
            <v-img :src="`${baseURLImage}/employees/${auth.getCurrentUser?.imageUrl}`">
              <template #error>
                <div style="background-color: #212121; width: 100%; height: 100%"></div>
              </template> </v-img
          ></v-avatar>
        </template>
        <v-list rounded="lg">
          <v-list-item
            v-for="item in fieldAppMenu"
            :key="item.title"
            :prepend-icon="item.icon"
            :to="item.path"
            >{{ item.title }}
          </v-list-item>
          <v-list-item title="Dark Theme" prepend-icon="mdi-weather-night">
            <template #append>
              <v-switch class="ml-3 d-flex" color="fourth" v-model="toggleDark"> </v-switch>
            </template>
          </v-list-item>
          <v-list-item
            title="Logout"
            prepend-icon="mdi-logout"
            @click="auth.logout()"
          ></v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

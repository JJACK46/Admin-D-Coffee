<script setup lang="ts">
import { baseURLImage } from '@/services/http'
import { useAuthStore } from '@/stores/auth'
import { useMainDrawerStore } from '@/stores/drawer'
import { useNotificationStore } from '@/stores/notifications'
import { getColorByMode } from '@/utils/colors'
import { useCurrentTime } from '@/utils/date'
import { computed, ref, watch } from 'vue'
import { useDisplay, useLocale, useTheme } from 'vuetify'

const auth = useAuthStore()
const drawer = useMainDrawerStore()
const notification = useNotificationStore()
const toggleNotifications = ref(false)
const { t } = useLocale()
const theme = useTheme()
const toggleDark = ref(true)

function closeNotificationDialog() {
  notification.setRead()
  toggleNotifications.value = false
}

function clearAndClose() {
  notification.clearItems()
  closeNotificationDialog()
}

watch(
  () => toggleDark.value,
  (val) => {
    theme.global.name.value = val ? 'dark' : 'light'
  }
)

const currentTime = useCurrentTime()

const locale = useLocale()

const handleLocale = () => {
  if (locale.current.value === 'th') {
    locale.current.value = 'en'
  } else {
    locale.current.value = 'th'
  }
}

const fieldAppMenu = computed(() => [
  { icon: 'mdi-account-outline', title: t('Profile'), path: '/profile' },
  { icon: 'mdi-cog-outline', title: t('Settings'), path: '' }
])
</script>

<template>
  <v-app-bar color="primary" elevation="1" app>
    <template #prepend>
      <v-app-bar-nav-icon
        v-if="useDisplay().mdAndDown.value"
        @click="drawer.switchDrawer()"
      ></v-app-bar-nav-icon>
    </template>

    <template #title>
      <v-list-item title="Enterprise App" class="pa-0">
        <template #prepend>
          <img :src="`d-coffee-logo.png`" width="52" class="pr-3" />
        </template>
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
            <v-card>
              <v-card-title>
                <v-row>
                  <v-col>
                    <p>{{ t('Notifications') }}</p>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="auto">
                    <v-btn
                      variant="text"
                      size="small"
                      :color="getColorByMode"
                      icon="mdi-cog-outline"
                    ></v-btn>
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
                        variant="text"
                        icon="mdi-close"
                        @click="notification.items.splice(index, 1)"
                      ></v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-text v-else class="text-center">
                <v-list-item :title="`${t('noData')}`"> </v-list-item>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn @click="clearAndClose" variant="plain" size="small"> Clear </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-menu>
      </div>
      <v-menu name="avatar menu" :close-on-content-click="false">
        <template #activator="{ props }">
          <v-avatar v-bind="props" class="mr-2" style="cursor: pointer">
            <v-img :src="`${baseURLImage}/employees/${auth.getCurrentUser?.img}`">
              <template #error>
                <div style="background-color: #212121; width: 100%; height: 100%"></div>
              </template> </v-img
          ></v-avatar>
        </template>
        <v-list>
          <v-list-item
            v-for="item in fieldAppMenu"
            :key="item.title"
            :prepend-icon="item.icon"
            :to="item.path"
            >{{ item.title }}
          </v-list-item>
          <v-list-item
            :title="`${locale.current.value.toUpperCase()}`"
            prepend-icon="mdi-translate"
            @click="handleLocale"
          >
          </v-list-item>
          <v-list-item :title="`${t('Dark Theme')}`" prepend-icon="mdi-weather-night">
            <template #append>
              <v-switch class="ml-3 d-flex" color="white" v-model="toggleDark"> </v-switch>
            </template>
          </v-list-item>
          <v-list-item
            :title="`${t('logout')}`"
            prepend-icon="mdi-logout"
            @click="auth.logout()"
          ></v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

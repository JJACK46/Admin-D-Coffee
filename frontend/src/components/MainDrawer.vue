<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useMainDrawerStore } from '@/stores/drawer'
import { adminNavItems, employeeNavItems, managerNavItems } from '@/router/nav-item'
import { computed } from 'vue'
import { useLocale } from 'vuetify'

const auth = useAuthStore()
const appVersion = APP_VERSION

const { t } = useLocale()

// const routes = ref<RouteRecordNormalized[]>([]);

// function checkPath(path: RouteRecordNormalized | string): string | undefined {
//   if (typeof path === 'string') {
//     return routesWithIcon.get(path)
//   } else {
//     return routesWithIcon.get(path.name?.toString()!)
//   }
// }

const navItems = computed(() => {
  if (auth.isAdmin()) {
    return adminNavItems
  } else if (auth.isManager()) {
    return managerNavItems
  }
  return employeeNavItems
})

const drawer = useMainDrawerStore()
</script>

<template>
  <v-navigation-drawer v-model="drawer.isExpand" persistent app>
    <v-list v-if="auth.isAdmin()" slim>
      <div v-for="item in navItems" :key="item.title">
        <v-list-group v-if="item.menu" :to="item.path" :prepend-icon="item.icon">
          <template #activator="{ props }">
            <v-list-item :title="`${t(item.title)}`" v-bind="props"> </v-list-item>
          </template>
          <v-list-item
            v-for="subItem in item.menu"
            :key="subItem.title"
            :to="subItem.path"
            :prepend-icon="subItem.icon"
          >
            {{ t(subItem.title) }}
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :title="`${t(item.title)}`" :to="item.path" :prepend-icon="item.icon">
        </v-list-item>
      </div>
    </v-list>
    <!-- <v-list v-else>
      <v-list-item
        v-for="route in authStore.employeeRoutes"
        :key="route"
        :to="route"
        @click="drawer.switchDrawer()"
        :title="route.toUpperCase().replace('/', '')"
        :prepend-icon="checkPath(route.replace('/', ''))"
      >
      </v-list-item>
    </v-list> -->

    <template #append>
      <p class="text-center py-1">{{ `v. ${appVersion}` }}</p>
      <v-divider />
      <v-list class="pa-1">
        <v-list-item
          :title="`${t('logout')}`"
          prepend-icon="mdi-logout"
          @click="auth.logout()"
        ></v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

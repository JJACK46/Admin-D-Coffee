import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

import { vMaska } from 'maska'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#6F4E37',
          secondary: '#654335',
          third: '#51312E',
          fourth: '#432D2B',
          fifth: '#322626'
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#6F4E37',
          secondary: '#654335',
          third: '#51312E',
          fourth: '#432D2B',
          fifth: '#322626'
        }
      }
    }
  }
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.directive('maska', vMaska)

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // Check if the user is authenticated
    if (!authStore.isAuthenticated()) {
      // Redirect to the login page if not authenticated
      next({ name: 'login' })
    } else {
      // Check if the user is authorized to access the route
      const routeRoles = to.meta.roles as []
      if (!authStore.isAuthorized(routeRoles)) {
        // Redirect to a forbidden or unauthorized page
        next({ name: 'forbidden' })
      } else {
        // Continue to the requested route
        // next(authStore.methods.hasRole('admin') ? { name: 'home' } : '/pos')
        next()
      }
    }
  } else {
    next()
  }
})

app.mount('#app')

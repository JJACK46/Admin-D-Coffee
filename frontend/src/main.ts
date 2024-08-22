import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

import { vMaska } from 'maska'
import vuetify from './plugins/vuetify'

const app = createApp(App)

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

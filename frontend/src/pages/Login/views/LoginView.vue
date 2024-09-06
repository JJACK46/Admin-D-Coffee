<template>
  <v-container fluid>
    <div>
      <video autoplay loop muted>
        <source src="../assets/coffee-vdo-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <v-img class="mx-auto my-3" max-width="280" src="d-coffee-logo.png" />
    <v-card
      class="mx-auto pa-12 pb-8 transparent-card"
      elevation="0"
      max-width="448"
      :class="{ loading: loader }"
    >
      <v-form class="mx-auto" validate-on="submit" @submit.prevent="handleLogin()" ref="form">
        <v-text-field
          required
          density="compact"
          :label="`${t('username')}`"
          variant="outlined"
          v-model="username"
          :rules="[requiredRule]"
        ></v-text-field>
        <v-text-field
          required
          :label="`${t('password')}`"
          density="compact"
          type="password"
          class="my-1"
          variant="outlined"
          v-model="password"
          :rules="[requiredRule]"
        >
          <template #details>
            <a
              class="text-caption text-decoration-none text-grey"
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
            >
              Forgot login password?</a
            >
          </template>
        </v-text-field>
        <v-snackbar
          v-model="isLoginFailed"
          class="justify-center"
          location="center"
          color="error"
          close-delay="25"
          close-on-content-click
        >
          <h4 class="text-center">{{ auth.errorMessage }}</h4>
        </v-snackbar>

        <v-btn
          type="submit"
          block
          class="my-3"
          color="primary"
          size="large"
          variant="flat"
          :loading="loader.isLoading"
        >
          <p class="font-weight-bold">{{ t('login') }}</p>
        </v-btn>
      </v-form>
      <template #actions>
        <div class="d-flex w-100 justify-end">
          <v-btn color="white" @click="handleLanguage">{{ localeText }}</v-btn>
        </div>
      </template>
    </v-card>
    <h5 class="text-grey d-flex justify-center mt-12">{{ textFooter }}</h5>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useLoadingStore } from '@/stores/loading'
import { textFooter } from '@/utils/info'
import { requiredRule } from '@/utils/rules'
import { computed, onMounted, ref } from 'vue'
import { useLocale } from 'vuetify'

const auth = useAuthStore()

const form = ref<HTMLFormElement | null>(null)
const username = ref('')
const password = ref('')

const loader = useLoadingStore()
const isLoginFailed = ref(false)

const { t, current } = useLocale()

const handleLanguage = () => {
  if (current.value === 'en') {
    current.value = 'th'
  } else {
    current.value = 'en'
  }
}

const localeText = computed(() => {
  if (current.value === 'th') {
    return 'en'
  } else {
    return 'th'
  }
})

const handleLogin = async () => {
  if (form.value!.checkValidity()) {
    isLoginFailed.value = !(await auth.signIn(username.value, password.value))
  }
}

onMounted(() => {
  localStorage.clear()
})
</script>

<style scoped>
a:hover {
  color: #000;
}

video {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  z-index: -1;
}

.transparent-card {
  background: rgba(0, 0, 0, 0.9);
}
</style>

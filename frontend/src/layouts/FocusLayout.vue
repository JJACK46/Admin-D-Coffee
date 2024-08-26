<template>
  <v-layout class="h-screen">
    <v-main>
      <MainAppBar />
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import MainAppBar from '@/components/MainAppBar.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pageName = computed(() => route.name?.toString())
const breadcrumbs = ref([
  { title: 'Home', href: '/' },
  { title: pageName.value ?? '', href: '' }
])
</script>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import { computed } from 'vue'
import { useLocale } from 'vuetify'

const loader = useLoadingStore()

const { t } = useLocale()
const noData = t('noData')

const props = defineProps<{
  title: string
  subtitle: string
  class_subtitle: string
  oldData: number | null | undefined
  newData: number | null | undefined
  icon: string
}>()

const ratio = computed((): string => {
  if (props.oldData && props.newData) {
    const res = Math.floor(((props.newData - props.oldData) / Math.abs(props.oldData)) * 100)
    if (res > 0) {
      return `+${res}`
    }
  }
  return noData
})
</script>

<template>
  <v-card v-if="loader.isLoading">
    <v-skeleton-loader type="card"> </v-skeleton-loader>
  </v-card>
  <v-card v-else class="pa-4 align-center text-left custom-card text-h6" :prepend-icon="props.icon">
    <template v-slot:title>
      <div class="ml-2">
        {{ props.title }}
      </div>
    </template>
    <template v-slot:subtitle>
      <p :class="props.class_subtitle" class="ml-2">
        {{ ratio + (ratio !== noData ? '%' : ' ') + props.subtitle }}
      </p>
    </template>
    <v-card-text>
      <v-row>
        <v-col class="text-right">
          <h1>{{ props.newData ?? noData }}</h1>
        </v-col>
        <v-divider />
        <v-col class="text-grey">
          <h1>{{ props.oldData ?? noData }}</h1>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

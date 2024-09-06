<template>
  <v-dialog v-model="attend.isDialogOpen" persistent>
    <v-card class="mx-auto pa-5" :loading="loader.isLoading">
      <template #title>
        <h1 class="text-center">{{ t('attendance') }}</h1>
      </template>
      <template #actions>
        <v-row class="text-center justify-center">
          <v-btn color="green text-h6" prepend-icon="mdi-clock-in" @click="attend.save()">
            {{ t('clockIn') }}
          </v-btn>
          <v-btn color="grey text-h6" prepend-icon="mdi-clock" @click="attend.closeDialog()">
            {{ t('later') }}
          </v-btn>
          <v-btn color="red text-h6" prepend-icon="mdi-clock-out" @click="attend.save()">
            {{ t('clockOut') }}
          </v-btn>
        </v-row>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import { useAttendanceStore } from '../../../stores/attendance'
import { useLocale } from 'vuetify'

const { t } = useLocale()
const attend = useAttendanceStore()
const loader = useLoadingStore()
</script>

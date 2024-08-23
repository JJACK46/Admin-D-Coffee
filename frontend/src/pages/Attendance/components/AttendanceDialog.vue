<template>
  <v-dialog v-model="attend.isDialogOpen" persistent>
    <v-card class="mx-auto custom-card" style="overflow-y: hidden" rounded="lg">
      <v-progress-linear v-if="loader.isLoading" indeterminate></v-progress-linear>
      <h1 class="mt-7 text-center">Attendance | ลงเวลาเข้างาน</h1>
      <template #actions>
        <v-row class="text-center justify-center pa-10">
          <v-btn color="green text-h6" prepend-icon="mdi-clock-in" @click="attend.save()">
            CLOCK IN | เข้างาน
          </v-btn>
          <v-btn color="grey text-h6" prepend-icon="mdi-clock" @click="attend.closeDialog()">
            LATER | ภายหลัง
          </v-btn>
          <v-btn color="red text-h6" prepend-icon="mdi-clock-out" @click="attend.save()">
            CLOCK OUT | ออกงาน
          </v-btn>
        </v-row>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import { useAttendanceStore } from '../../../stores/attendance'

const attend = useAttendanceStore()
const loader = useLoadingStore()
</script>

<style scoped>
.custom-card {
  background-color: rgba(0, 0, 0, 0.9);
}
</style>

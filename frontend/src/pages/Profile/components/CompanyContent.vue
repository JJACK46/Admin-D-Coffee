<template>
  <v-container fluid>
    <CardProfile :image-url="imagePath">
      <template #content>
        <v-list-item
          class="justify-center d-flex"
          :title="usr?.employee?.fullName"
          :subtitle="`@${usr?.username}`"
        >
          <div class="d-flex ga-3 mt-2">
            <v-chip rounded density="compact" color="orange"> {{ `${usr?.role?.name}` }}</v-chip>
            <v-chip rounded density="compact" color="blue"> {{ `${usr?.employee?.title}` }}</v-chip>
          </div>
          <v-divider class="my-2"></v-divider>
          <p>{{ `Employment: ${usr?.employee?.startDate}` }}</p>
          <p>{{ `Salary/Wage: ${usr?.employee?.salaryWage} ฿` }}</p>
          <p>{{ `Biology: ${usr?.employee?.biography}` }}</p>
          <p>{{ `Birth: ${usr?.employee?.birthDate}` }}</p>
          <p>{{ `Tel: ${usr?.employee?.tel}` }}</p>
        </v-list-item>
      </template>
    </CardProfile>
    <v-row class="mt-2">
      <!-- <v-col cols="12">
        <h2>Sales History charts</h2>
      </v-col>
      <v-col lg="4" cols="12">
        <ChartBox
          title="Daily"
          :chart-data="store.getSales?.daily.map((item) => item.totalNet) ?? []"
          :chart-labels="store.getSales?.daily.map((item) => item.date) ?? []"
        ></ChartBox>
      </v-col>
      <v-col lg="4" cols="12">
        <ChartBox
          title="Monthly"
          :chart-data="store.getSales?.monthly.map((item) => item.totalNet) ?? []"
          :chart-labels="
            store.getSales?.monthly.map((item) => getMonthAbbreviation(item.month)) ?? []
          "
        ></ChartBox>
      </v-col>
      <v-col lg="4" cols="12">
        <ChartBox
          title="Yearly"
          :chart-data="store.getSales?.yearly.map((item) => item.totalNet) ?? []"
          :chart-labels="store.getSales?.yearly.map((item) => item.year) ?? []"
        ></ChartBox>
      </v-col> -->
      <!-- <v-divider class="mt-3"></v-divider> -->
      <!-- <v-col cols="12">
        <h2>Sales History</h2>
      </v-col>
      <v-col lg="4" cols="12">
        <CardTable title="Daily" :items="store.getSales?.daily ?? []"> </CardTable>
      </v-col>
      <v-col lg="4" cols="12">
        <CardTable title="Monthly" :items="store.getSales?.monthly ?? []"> </CardTable>
      </v-col>
      <v-col lg="4" cols="12">
        <CardTable title="Yearly" :items="store.getSales?.yearly ?? []"> </CardTable>
      </v-col> -->
      <v-col lg="6" cols="12">
        <v-card title="Attendance History">
          <v-divider class="" thickness="2"></v-divider>
          <CardTable :items="store.attendanceRecord" :headers="store.headersAttendance">
            <template #underTable>
              <p>
                Attendance count : {{ store.getAttendanceCount }} / Missing count :
                {{ store.getAttMissingCount }} / Normal count : {{ store.getAttNormalCount }} / OT
                count :
                {{ store.getAttOTCount }}
              </p>
            </template>
          </CardTable>
        </v-card>
      </v-col>
      <v-col lg="6" cols="12">
        <v-card title="Salary Slips">
          <v-divider thickness="2"></v-divider>
          <CardTable :items="store.slips" :headers="store.headersSlips"> </CardTable>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'
import CardTable from './CardTable.vue'
import { baseURLImage } from '@/services/http'
import CardProfile from './CardProfile.vue'
import { onMounted, ref } from 'vue'
import { computed } from 'vue'
import type { User } from '@/types/user'
const store = useProfileStore()
const auth = useAuthStore()
const usr = ref<User | null>(null)
const imagePath = computed(() => `${baseURLImage}/employees/${usr.value?.employee?.imageUrl}`)

onMounted(async () => {
  usr.value = await auth.getUserData()
  store.fetchAttendance(usr.value?.employee?.id ?? -1)
  store.fetchSlips(usr.value?.employee?.id ?? -1)
})
</script>

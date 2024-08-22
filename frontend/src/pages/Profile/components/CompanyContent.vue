<template>
  <v-container fluid class="h-100" v-if="!auth.isCustomer()">
    <CardProfile :image-url="imagePath">
      <template #content>
        <v-list-item
          class="justify-center d-flex"
          :title="user?.fullName"
          :subtitle="`@${user?.username}`"
        >
          <div class="mt-3 justify-space-between d-flex">
            <v-chip density="compact" color="orange"> {{ `${user?.branch.name}` }}</v-chip>
            <v-chip density="compact" color="blue"> {{ `${store.employee?.title}` }}</v-chip>
          </div>
          <v-divider class="my-2"></v-divider>
          <p>{{ `Employment Date: ${store.employee?.startDate}` }}</p>
          <p>{{ `Salary/Wage: ${store.employee?.salaryWage} ฿` }}</p>
          <p>{{ `Biology: ${store.employee?.biography}` }}</p>
        </v-list-item>
      </template>
    </CardProfile>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <h2>Sales History charts</h2>
            <v-divider class="mt-3"></v-divider>
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
          </v-col>
        </v-row>
      </v-col>
      <v-col name="Sales History" cols="12">
        <v-card title="Sales History" rounded="lg" class="pa-0" append-icon="mdi-point-of-sale">
          <v-divider thickness="3"></v-divider>
          <v-row no-gutters>
            <v-col>
              <CardTable title="Daily" :items="store.getSales?.daily ?? []"> </CardTable>
            </v-col>
            <v-divider vertical thickness="3"></v-divider>
            <v-col>
              <CardTable title="Monthly" :items="store.getSales?.monthly ?? []"> </CardTable>
            </v-col>
            <v-divider vertical thickness="3"></v-divider>
            <v-col>
              <CardTable title="Yearly" :items="store.getSales?.yearly ?? []"> </CardTable>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col>
        <v-card title="Attendance History" rounded="lg" append-icon="mdi-briefcase">
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
      <v-col>
        <v-card title="Salary Slips" rounded="lg" append-icon="mdi-currency-thb">
          <v-divider thickness="2"></v-divider>
          <CardTable :items="store.slips" :headers="store.headersSlips"> </CardTable>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '../stores/profile'
import CardTable from './CardTable.vue'
import { baseURLImage } from '@/services/http'
import CardProfile from './CardProfile.vue'
import ChartBox from '@/views/Home/components/ChartBox.vue'
import { getMonthAbbreviation } from '@/utils/date'
const store = useProfileStore()
const user = store.auth.getCurrentUser()
const auth = useAuthStore()
const imagePath = `${baseURLImage}/employees/${user?.imageUrl}`
</script>

<style scoped>
/* #card-profile {
  background-image: url('@/assets/background/coffee-shop-background.png');
  background-size: cover;
}

#card-profile::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.66);
  left: 0;
  top: 0;
} */
</style>

<script setup lang="ts">
import { onMounted } from 'vue'
import { monthsWithNum, getMonthAbbreviation } from '@/utils/date'
import CardShort from '../components/CardShort.vue'
import ChartBox from '../components/ChartBox.vue'
// import TopSales from '../components/TopSalesCard.vue'
import { useHomeStore } from '../../../stores/home'
import { useAuthStore } from '@/stores/auth'
import { useLoadingStore } from '@/stores/loading'
import { useLocale } from 'vuetify'

const store = useHomeStore()
const auth = useAuthStore()
const loader = useLoadingStore()

const { t } = useLocale()

onMounted(() => {
  store.setupToday()
  store.fetchSales()
  store.fetchBranch()
})
</script>

<template>
  <v-container fluid>
    <v-sheet class="pt-3 bg-transparent" flat>
      <v-row no-gutters>
        <v-col cols="auto">
          <h1>{{ t('dashboard') }}</h1>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="text-end pa-0 ma-0">
          <v-chip rounded size="large" color="orange" prepend-icon="mdi-account">{{
            auth.getCurrentUser?.role.toUpperCase()
          }}</v-chip>
        </v-col>
        <v-col cols="12">
          <v-select
            variant="solo"
            clearable
            density="comfortable"
            v-model="store.selectBranch"
            label="Branch"
            :items="store.getBranch"
            return-object
            item-title="name"
            @update:model-value="
              (v) => {
                if (v) {
                  store.fetchSalesByBranchId()
                  store.fetchRevenue()
                } else {
                  store.fetchSales()
                }
              }
            "
          >
          </v-select>
        </v-col>
      </v-row>
    </v-sheet>
    <v-row>
      <v-col cols="12">
        <v-row no-gutters>
          <h2>{{ t('sales') }}</h2>
          <v-spacer></v-spacer>
          <h2>{{ store.selectBranch?.name ?? `${t('all')}` }}</h2>
        </v-row>
      </v-col>
      <v-divider class="mb-2"></v-divider>
      <v-col md="4" cols="12">
        <CardShort
          :title="`${t('dSale')}`"
          subtitle="from yesterday"
          class_subtitle="text-green"
          :old-data="store.getDailySales?.yesterday"
          :new-data="store.getDailySales?.today"
          icon="mdi-heart"
        />
      </v-col>
      <v-col md="4" cols="12">
        <CardShort
          icon="mdi-cart"
          :title="`${t('mSale')}`"
          subtitle="from last month"
          class_subtitle="text-green"
          :old-data="store.getMonthlySales?.lastMonth"
          :new-data="store.getMonthlySales?.thisMonth"
        >
        </CardShort>
      </v-col>
      <v-col md="4" cols="12">
        <CardShort
          icon="mdi-currency-usd"
          :title="`${t('ySale')}`"
          subtitle="from last year"
          class_subtitle="text-red"
          :old-data="store.getYearlySales?.lastYear"
          :new-data="store.getYearlySales?.thisYear"
        />
      </v-col>
      <v-col cols="12">
        <v-row no-gutters>
          <h2>{{ t('revenue') }}</h2>
          <v-spacer></v-spacer>
          <h2>{{ store.selectBranch?.name ?? `${t('all')}` }}</h2>
        </v-row>
        <v-divider class="mt-2"></v-divider>
      </v-col>
      <v-col lg="4">
        <v-select
          v-model="store.revenueDTO.month"
          variant="solo"
          label="Select a month"
          :items="monthsWithNum"
          item-title="label"
          item-value="number"
          clearable
        >
        </v-select>
        <ChartBox
          :title="`${t('dOverD')}`"
          :chart-data="store.getRevenueDay?.map((item) => item.totalNet)"
          :chart-labels="store.getRevenueDay.map((item) => item.date)"
        ></ChartBox>
      </v-col>
      <v-col lg="4">
        <v-select
          v-model="store.revenueDTO.year"
          variant="solo"
          label="Select a year"
          :items="[2023, 2024]"
          clearable
        >
        </v-select>
        <ChartBox
          :title="`${t('mOverM')}`"
          :chart-data="store.getRevenueMonth.map((item) => item.totalNet)"
          :chart-labels="store.getRevenueMonth.map((item) => getMonthAbbreviation(+item.month))"
        />
      </v-col>
      <v-col lg="4">
        <v-card class="pa-4 mb-5 text-center"
          >{{
            `Since ${store.getRevenueYear.map((item) => item.year).length > 0 ? store.getRevenueYear.map((item) => item.year) : '...'} `
          }}
        </v-card>
        <ChartBox
          :title="`${t('yOverY')}`"
          :chart-data="store.getRevenueYear.map((item) => item.totalNet)"
          :chart-labels="store.getRevenueYear.map((item) => item.year)"
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          :loading="loader.isLoading"
          class="w-100"
          prepend-icon="mdi-autorenew"
          variant="outlined"
          @click="store.fetchRevenue()"
          >reload data</v-btn
        >
      </v-col>
      <!-- <v-col cols="12">
        <v-row no-gutters>
          <h2>Product Analytics</h2>
          <v-spacer></v-spacer>
          <h2>{{ store.selectBranch?.name ?? 'ALL' }}</h2>
        </v-row>
        <v-divider class="mt-2"></v-divider>
      </v-col> -->
      <!-- <v-col lg="4">
        <TopSales />
      </v-col> -->
    </v-row>
  </v-container>
</template>

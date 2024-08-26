<script setup lang="ts">
import MenuContainer from '../components/MenuContainer.vue'
import OrderSheet from '../components/OrderSheet.vue'
import PromotionDialog from '../components/PromotionDialog.vue'
import ReceiptDialog from '../components/ReceiptDialog.vue'
import { usePosStore } from '../../../stores/pos'
import { onMounted } from 'vue'
import { computed } from 'vue'
import MenuCard from '../components/MenuCard.vue'
import { useLoadingStore } from '@/stores/loading'
import MembershipDialog from '../components/MembershipDialog.vue'

const store = usePosStore()
const loader = useLoadingStore()

const fieldData = computed(() => {
  return [
    { tab: 'Drinks', products: store.getAllDrinks },
    { tab: 'Appetizer', products: store.getAllAppetizer },
    { tab: 'Foods', products: store.getAllFoods }
  ]
})

onMounted(() => {
  store.fetchMenu()
  store.fetchPromotion()
})
</script>

<template>
  <MembershipDialog />
  <ReceiptDialog />
  <PromotionDialog />
  <v-container fluid>
    <OrderSheet />
    <v-tabs v-model="store.tab" class="rounded-lg elevation-2" color="primary">
      <v-tab v-for="item in store.typesOfProducts" :key="item" fixed>
        {{ item }}
      </v-tab>
      <v-tab value="Search" class="pa-0" fixed>
        <v-responsive width="300">
          <v-text-field
            clearable
            label="Search"
            single-line
            v-model="store.searchText"
            prepend-inner-icon="mdi-magnify"
            hide-details
            variant="solo"
            flat
          >
          </v-text-field>
        </v-responsive>
      </v-tab>
    </v-tabs>
    <v-progress-circular
      v-if="loader.isLoading"
      indeterminate
      size="50"
      width="8"
      class="d-flex mx-auto h-100"
    ></v-progress-circular>
    <v-card v-else class="overflow-auto pt-3 elevation-0 h-100" color="transparent">
      <v-window v-model="store.tab">
        <MenuContainer
          v-for="data in fieldData"
          :key="data.tab"
          :tab="data.tab"
          :products="data.products ?? []"
        />
        <v-window-item value="Search">
          <v-row no-gutters>
            <v-col cols="3" v-for="item in store.getSearchMenu" :key="item.id">
              <MenuCard :item="item" />
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-card>
    <v-snackbar
      theme="dark"
      rounded="lg"
      variant="flat"
      v-model="store.showSnackbar"
      location="top right"
    >
      <p class="">{{ store.snackbarMsg }}</p>
      <template #actions>
        <v-btn icon="mdi-close" size="small" @click="store.showSnackbar = false"></v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

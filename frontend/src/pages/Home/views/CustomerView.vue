<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemCard from '../components/customer/ItemCard.vue'
import { useHomeCustomerStore } from '../../../stores/home-customer'
import { baseURLImage } from '@/services/http'

const store = useHomeCustomerStore()

onMounted(() => {
  store.fetchAll()
})

const dataTabs = [
  { title: 'Promotions', value: 'promotions' },
  { title: 'Top Menu', value: 'topMenu' },
  { title: 'Coffee', value: 'coffee' },
  { title: 'Milk Tea', value: 'milkTea' },
  { title: 'Pure Tea', value: 'pureTea' },
  { title: 'Appetizer', value: 'appetizer' }
]
const selectedTab = ref()
</script>

<template>
  <v-container fluid class="h-100">
    <div class="justify-center d-flex">
      <v-tabs v-model="selectedTab">
        <v-tab v-for="tab in dataTabs" :key="tab.title" :value="tab.value"> {{ tab.title }} </v-tab>
      </v-tabs>
    </div>
    <v-window v-model="selectedTab" class="mt-2 pa-2">
      <v-window-item value="promotions">
        <v-carousel cycle show-arrows="hover" hide-delimiter-background>
          <v-carousel-item src="https://shorturl.at/uJOWX"></v-carousel-item>
          <v-carousel-item src="https://shorturl.at/msHO3"></v-carousel-item>
          <v-carousel-item src="https://shorturl.at/qBEL0"></v-carousel-item>
          <template #additional="{ group }"> {{ group }}</template>
        </v-carousel>
        <v-row class="mt-3 justify-center d-flex">
          <v-col lg="3" xl="auto">
            <ItemCard title="Thai Milk Tea Boba" :price="60" :promo-price="45" />
          </v-col>
          <v-col lg="3" xl="auto">
            <ItemCard title="Green tea Matcha" :price="60" :promo-price="45" />
          </v-col>
          <v-col lg="3" xl="auto">
            <ItemCard title="Americano" :price="60" :promo-price="45" />
          </v-col>
          <v-col lg="3" xl="auto">
            <ItemCard title="Latte" :price="60" :promo-price="45" />
          </v-col>
        </v-row>
      </v-window-item>
      <v-window-item value="coffee">
        <v-row>
          <v-col lg="3" xl="auto" v-for="item in store.getListCoffee" :key="item.name">
            <ItemCard
              :title="item.name"
              :price="item.price"
              :image-url="`${baseURLImage}/products/${item.imageName}`"
            />
          </v-col>
        </v-row>
      </v-window-item>
      <v-window-item value="appetizer">
        <v-row>
          <v-col lg="3" xl="auto" v-for="item in store.getListAppetizer" :key="item.name">
            <ItemCard
              :title="item.name"
              :price="item.price"
              :image-url="`${baseURLImage}/products/${item.imageName}`"
            />
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-container>
</template>

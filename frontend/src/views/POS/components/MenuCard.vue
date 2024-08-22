<script setup lang="ts">
import { baseURLImage } from '@/services/http'
import type { Product } from '@/views/Product/types/product'
import { usePosStore } from '../store/pos'

const store = usePosStore()

defineProps<{
  item: Product
}>()
</script>

<template>
  <v-tooltip :text="`${item.name} ${item.price}฿`" location="top" open-delay="350">
    <template #activator="{ props }">
      <v-card
        v-bind="props"
        rounded="lg"
        :title="item.name"
        class="ma-2"
        @click="store.addOrderItem(item)"
      >
        <template #text>
          <v-img
            v-if="$props.item.imageName"
            height="160"
            width="auto"
            :style="{ borderRadius: '10px' }"
            :src="`${baseURLImage}/products/${item.imageName}`"
          ></v-img>
        </template>
        <template #append>
          <v-chip class="mt-2 justify-right">
            {{ item.type }}
          </v-chip>
        </template>
        <template #actions>
          <v-row class="px-2">
            <v-col>
              <v-icon> mdi-cart </v-icon>
            </v-col>
            <v-col class="text-right">
              <h3>
                {{ `${item.price}฿` }}
              </h3>
            </v-col>
          </v-row>
        </template>
      </v-card>
    </template>
  </v-tooltip>
</template>

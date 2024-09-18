<script setup lang="ts">
import { baseURLImage } from '@/services/http'
import type { Product } from '@/types/product'
import { usePosStore } from '@/stores/pos'

const store = usePosStore()

defineProps<{
  item: Product
}>()
</script>

<template>
  <v-tooltip :text="`${item.name} ${item.price}฿`" location="top" open-delay="350">
    <template #activator="{ props }">
      <v-card v-bind="props" :title="item.name" @click="store.addOrderItem(item)">
        <template #text>
          <v-img
            v-if="$props.item.imageName"
            height="160"
            width="auto"
            :src="`${baseURLImage}/products/${item.imageName}`"
          ></v-img>
          <h3 class="mt-2 d-flex justify-space-between align-center">
            <v-chip density="compact" rounded>
              {{ item.type }}
            </v-chip>
            {{ `${item.price}฿` }}
          </h3>
        </template>
      </v-card>
    </template>
  </v-tooltip>
</template>

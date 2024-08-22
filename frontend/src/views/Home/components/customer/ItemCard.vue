<template>
  <v-card width="250" height="290" rounded="lg" class="pa-1">
    <v-img
      id="cus"
      height="170"
      style="z-index: -1"
      :src="`${imageUrl ?? 'https://shorturl.at/tDKPQ'}`"
    >
    </v-img>
    <v-sheet class="sheet">
      <v-row no-gutters>
        <v-col cols="12">
          <p class="mt-2 mx-3">{{ title }}</p>
        </v-col>
        <v-col v-if="promotion" cols="auto">
          <p class="mx-3 text-decoration-line-through" style="color: rgba(255, 255, 255, 0.5)">
            {{ `${price} ฿` }}
          </p>
        </v-col>
        <v-col v-else cols="auto">
          <p class="mx-3">{{ price }} ฿</p>
        </v-col>
        <v-col v-if="promotion">
          <p class="text-orange">{{ `${promoPrice} ฿` }}</p>
        </v-col>
      </v-row>
    </v-sheet>
    <template #actions>
      <v-chip-group v-if="hasSize" class="pa-0">
        <v-chip> M </v-chip>
        <v-chip> L </v-chip>
      </v-chip-group>
      <v-spacer></v-spacer>
      <v-btn
        rounded="pill"
        size="small"
        color="orange-darken-1"
        variant="flat"
        prepend-icon="mdi-cart"
        text="order"
      ></v-btn>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  price: number
  imageUrl?: string
  promoPrice?: number
  hasSize?: true
}>()

const promotion = computed(() => props.promoPrice !== undefined)
</script>

<style scoped>
.sheet {
  background: rgba(0, 0, 0, 0);
}
.sheet::before {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  z-index: -1;
}

#cus {
  transition: 0.5s;
}

#cus:hover {
  transform: scale(1.2);
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { usePosStore } from '@/stores/pos'
import { requiredRule } from '@/utils/rules'

const store = usePosStore()
const formComplete = ref<boolean>()
</script>
<template>
  <v-dialog v-model="store.promotionDialog" width="712">
    <v-card rounded="lg">
      <h2 class="text-center pt-2">Promotion</h2>
      <v-divider class="mt-3"> </v-divider>
      <v-form v-model="formComplete" class="pa-5">
        <v-select
          label="Select a promotion"
          :rules="[requiredRule]"
          :items="store.getAvailablePromotion"
          :item-title="'name'"
          return-object
          v-model="store.selectedPromotion"
        >
        </v-select>
        <div>
          <h4>
            {{ `Description:  ${store.selectedPromotion?.description ?? ''}` }}
          </h4>
          <v-divider class="my-2"></v-divider>
          <span>{{ `Combo Set: ${store.selectedPromotion?.combo} ` }}</span>
          <span>
            <h4>Products including:</h4>
            <v-chip-group>
              <v-chip
                readonly
                v-for="item in store.selectedPromotion?.usableProductsName"
                :key="item"
              >
                {{ item }}
              </v-chip>
            </v-chip-group>
          </span>
          <v-divider class="my-2"></v-divider>
          <h4>
            {{ `End date: ${store.selectedPromotion?.endDate ?? ''}` }}
          </h4>
        </div>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions class="pa-3 mx-2">
        <v-spacer></v-spacer>
        <v-btn
          variant="outlined"
          color="error"
          text="cancel"
          @click="store.closeDialogPromotion"
        ></v-btn>
        <v-btn
          color="primary"
          :disabled="!formComplete"
          text="ok"
          variant="flat"
          @click="store.saveSelectPromotion"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

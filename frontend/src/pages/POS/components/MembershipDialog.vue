<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePosStore } from '../store/pos'
import { requiredRule } from '@/utils/rules'
import { useLoadingStore } from '@/stores/loading'

const store = usePosStore()
const formComplete = ref<boolean>()
const loader = useLoadingStore()

onMounted(() => {
  store.fetchAvailableMembership()
})
</script>
<template>
  <v-dialog v-model="store.isDialogMembershipOpen" width="712">
    <v-card rounded="lg">
      <h2 class="text-center pt-2">Membership</h2>
      <v-divider class="mt-3"> </v-divider>
      <v-form v-model="formComplete" class="pa-5">
        <v-autocomplete
          label="Tel. of Membership"
          :rules="[requiredRule]"
          :items="store.getAvailableMembership"
          :item-title="'tel'"
          return-object
          v-model="store.selectMembership"
        >
          <!-- @update:model-value="() => store.fetchMembershipReceipts()" -->
        </v-autocomplete>
        <v-skeleton-loader
          height="200"
          v-if="loader.isLoading"
          type="text,text,text,text,text"
        ></v-skeleton-loader>
        <div v-else>
          <span> {{ `Name: ${store.selectMembership?.fullName ?? ''}` }}</span>
          <v-divider class="my-2"></v-divider>
          <span class="justify-end d-flex">
            {{ `D-Points: ${store.selectMembership?.point ?? ''}` }}
            <v-spacer></v-spacer>
            <v-dialog width="312">
              <template #activator="{ props }">
                <v-btn
                  :disabled="
                    store.selectMembership?.point === null || store.selectMembership?.point! < 100
                  "
                  color="primary"
                  v-bind="props"
                  variant="flat"
                  rounded="pill"
                  size="small"
                >
                  <p class="font-weight-bold">use d-point</p>
                </v-btn>
              </template>
              <template #default="{ isActive }">
                <v-card class="pa-5" rounded="lg">
                  <v-text-field
                    label="Use d-point"
                    :rules="[
                      requiredRule,
                      (v) => v >= 100 || 'Minimum 100 d-points',
                      (v) =>
                        v <= (store.selectMembership?.point ?? 1e6) || 'Out of membership d-points'
                    ]"
                    min="10"
                    :max="store.selectMembership?.point ?? 1e6"
                    type="number"
                    variant="outlined"
                    v-model.number="store.usedPoint"
                  >
                  </v-text-field>
                  <template #actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      variant="outlined"
                      text="cancel"
                      @click="
                        () => {
                          isActive.value = false
                          store.usedPoint = 0
                        }
                      "
                    ></v-btn>
                    <v-btn
                      color="primary"
                      variant="flat"
                      text="ok"
                      @click="isActive.value = false"
                    ></v-btn> </template
                ></v-card>
              </template>
            </v-dialog>
          </span>
          <v-divider class="my-2"></v-divider>
          <span class="justify-end d-flex">
            <v-spacer></v-spacer>
            <v-expansion-panels>
              <v-expansion-panel rounded="lg" title="Customer Purchase Details">
                <template #text>
                  {{
                    `Most Purchase Product: ${store.selectMembership?.purchase?.mostOne.product_name ?? 'No data'}`
                  }}
                  <v-divider class="my-2"></v-divider>
                  {{
                    `Total: ${store.selectMembership?.purchase?.mostOne.totalAmount ?? 'No data'}`
                  }}
                  <v-divider class="my-2"></v-divider>
                  {{
                    `Accumulated Price: ${store.selectMembership?.purchase?.mostOne.price ?? 'No data'}`
                  }}
                  <v-divider class="my-2"></v-divider>
                  {{
                    `Total Spending: ${store.selectMembership?.purchase?.totalSpending ?? 'No data'} `
                  }}
                  <v-divider class="my-2"></v-divider>
                </template>
              </v-expansion-panel>
            </v-expansion-panels>
          </span>
          <v-divider class="my-2"></v-divider>
          <span> {{ `Birth Date: ${store.selectMembership?.birthDate ?? ''}` }}</span>
          <v-divider class="my-2"></v-divider>
          <span> {{ `Date of Membership: ${store.selectMembership?.createdDate ?? ''}` }}</span>
        </div>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions class="pa-3 mx-2">
        <v-spacer></v-spacer>
        <v-btn
          variant="outlined"
          text="cancel"
          @click="
            () => {
              store.isDialogMembershipOpen = false
              store.selectMembership = null
            }
          "
        ></v-btn>
        <v-btn
          color="primary"
          :disabled="!formComplete"
          @click="store.isDialogMembershipOpen = false"
          text="ok"
          variant="flat"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

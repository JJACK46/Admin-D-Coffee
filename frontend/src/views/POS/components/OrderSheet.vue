<script setup lang="ts">
import { requiredRule, rulePositiveNumberOnly } from '@/utils/rules'
import { usePosStore } from '../store/pos'
import { useDisplay } from 'vuetify'

const store = usePosStore()
</script>

<template>
  <v-container fluid class="h-100 pa-0">
    <v-card class="pa-2 h-100" rounded="xl">
      <v-table fixed-header :height="useDisplay().xlAndUp.value ? 420 : 255">
        <template #top>
          <v-row>
            <v-col>
              <h2 class="mx-5">Order List</h2>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn
                :disabled="!store.hasLastOrder()"
                variant="text"
                @click="store.getLastOrderItems()"
              >
                <template #prepend>
                  <v-icon icon="mdi-clock"></v-icon>
                </template>
                last order
              </v-btn>
            </v-col>
          </v-row>
          <v-divider class="ma-2"></v-divider>
        </template>
        <thead v-if="store.hasOrderList">
          <tr class="bg-grey-darken-4">
            <td>Amount</td>
            <td>Name</td>
            <td>Price</td>
            <td></td>
          </tr>
        </thead>
        <thead v-else>
          <h3 class="text-center text-grey">No items yet</h3>
        </thead>
        <tbody>
          <tr v-for="(item, index) in store.orderList" :key="index">
            <td :width="120">
              <v-text-field
                min="0"
                :rules="[requiredRule, rulePositiveNumberOnly]"
                hide-details
                density="compact"
                variant="outlined"
                type="number"
                v-model.number="item.amount"
                @update:model-value="
                  (v) => (item.price = (v as unknown as number) * item.product?.price!)
                "
              ></v-text-field>
            </td>
            <td>{{ item.product?.name }}</td>
            <td>{{ item.price }} ฿</td>
            <td class="pa-0">
              <v-icon icon="mdi-delete" @click="store.removeOrderItem(index)"></v-icon>
            </td>
          </tr>
        </tbody>
        <template #bottom>
          <v-table density="compact">
            <tbody>
              <tr>
                <td>Total Price</td>

                <td>
                  <p class="text-end">
                    {{ store.getTotalOriginPrice }}
                  </p>
                </td>
              </tr>
              <tr>
                <td>Use D-Points</td>
                <td class="text-grey text-end">
                  <p v-if="store.usedPoint > 0">
                    {{ `-${store.usedPoint} DP  ( -${store.getDiscountPoint}฿ )` }}
                  </p>
                </td>
              </tr>
              <tr>
                <td>Total Discount</td>
                <td class="text-grey text-end">
                  <p v-if="store.getTotalDiscount > 0">-{{ store.getTotalDiscount }}</p>
                </td>
              </tr>
              <tr>
                <td>Received</td>
                <td>
                  <v-text-field
                    reverse
                    hide-spin-buttons
                    min="0"
                    :rules="[requiredRule, rulePositiveNumberOnly]"
                    v-model.number="store.receivedValue"
                    hide-details
                    single-line
                    type="number"
                    density="compact"
                    variant="underlined"
                  ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>Total Net</td>
                <td class="text-end">
                  <u class="font-weight-bold">
                    {{ store.getTotalNetPrice }}
                  </u>
                </td>
              </tr>
            </tbody>
          </v-table>
        </template>
      </v-table>
      <v-divider class="ma-2"></v-divider>
      <v-row class="pa-2">
        <v-col cols="6">
          <v-btn
            prepend-icon="mdi-delete"
            rounded="lg"
            class="w-100"
            variant="outlined"
            color="red-darken-2"
            @click="store.clearAllOrderList"
            text="clear"
          >
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            prepend-icon="mdi-currency-thb"
            :disabled="!(store.receivedValue >= store.getTotalNetPrice)"
            rounded="lg"
            class="w-100"
            color="primary"
            variant="flat"
            @click="store.openProceedDialog()"
            text="proceed"
          >
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            text="Promotion"
            prepend-icon="mdi-ticket"
            rounded="lg"
            class="w-100"
            variant="outlined"
            @click="store.openDialogPromotion"
          >
            <template #append>
              <v-badge v-if="store.hasPromotion" inline dot color="white" />
            </template>
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            prepend-icon="mdi-wallet-membership"
            text="Membership"
            color="secondary"
            rounded="lg"
            class="w-100"
            variant="flat"
            @click="store.isDialogMembershipOpen = true"
          >
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

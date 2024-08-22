<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import WarningDialog from '../components/WarningDialog.vue'
import { useReplenishmentStore } from '../store/replenishment'
import { useInventoryStore } from '../store/inventory'
import { getDateNowString } from '@/utils/date'
import { requiredRule, rulePositiveNumberOnly } from '@/utils/rules'
import { useDisplay } from 'vuetify'

const inv = useInventoryStore()
const store = useReplenishmentStore()
const auth = useAuthStore()
const hasDuplicate = computed(() => inv.hasDuplicateIngredientId(store.repItems))
const isFormValid = ref<boolean | null>()

onMounted(() => {
  inv.fetchIngredient()
})
</script>

<template>
  <v-dialog v-model="store.isDialogOpen" fullscreen persistent transition="dialog-top-transition">
    <v-card class="px-10 py-2">
      <template #title>
        <v-row>
          <v-col>
            <h3>Replenishment Order</h3>
            <h4>Inventory of branch : {{ inv.selectedBranch?.name }}</h4>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <h3>Employee : {{ auth.getCurrentUser()?.fullName }}</h3>
            <h4>
              {{ `Current date: ${getDateNowString()}` }}
            </h4>
          </v-col>
        </v-row>
        <v-divider class="mt-5" thickness="2"></v-divider>
      </template>
      <v-form v-model="isFormValid">
        <v-data-table
          class="px-6"
          :items="store.repItems"
          :headers="store.headers"
          :height="useDisplay().xlAndUp.value ? 700 : 500"
          fixed-header
          :items-per-page="0"
          no-data-text="No items"
        >
          <template #item="{ item, index }">
            <tr>
              <td>{{ index + 1 }}</td>

              <td>
                <v-select
                  class="d-flex"
                  :items="inv.availableIngredient"
                  :item-title="'name'"
                  :rules="[requiredRule, !hasDuplicate || 'Duplicate select found !']"
                  return-object
                  v-model:model-value="item.ingredient"
                  @update:model-value="
                    (val) => {
                      item.ingredientId = val.id!
                    }
                  "
                  variant="outlined"
                ></v-select>
              </td>
              <td>
                <v-text-field
                  v-model.number="item.balance"
                  :rules="[requiredRule, rulePositiveNumberOnly]"
                  variant="outlined"
                  type="number"
                ></v-text-field>
              </td>
              <td>
                {{ item.ingredient?.unit }}
              </td>
              <td>
                <v-text-field
                  v-model.number="item.cost"
                  :rules="[requiredRule, rulePositiveNumberOnly]"
                  min="0"
                  variant="outlined"
                  type="number"
                ></v-text-field>
              </td>
              <td>
                <v-btn variant="plain" icon="mdi-delete" @click="store.removeItem(index)"></v-btn>
              </td>
            </tr>
          </template>
          <template #bottom>
            <v-divider thickness="2"></v-divider>
            <v-row no-gutters class="justify-center mt-3">
              <v-col>
                {{ `Total value : ${store.getTotalCost} ฿` }}
              </v-col>
              <v-col>
                <v-btn
                  color="primary"
                  text="add"
                  prepend-icon="mdi-plus"
                  variant="flat"
                  :disabled="store.repItems.length >= inv.getIngredients.length"
                  @click="store.addItem()"
                >
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-form>
      <v-spacer></v-spacer>
      <v-card-actions class="justify-end ma-2">
        <v-btn variant="outlined" @click="store.closeDialog()"> close </v-btn>
        <WarningDialog :save-callback="store.save">
          <template #activator="{ props }">
            <v-btn
              :disabled="!isFormValid || store.repItems.length === 0 || hasDuplicate"
              color="secondary"
              variant="flat"
              v-bind="props"
            >
              save
            </v-btn>
          </template>
        </WarningDialog>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

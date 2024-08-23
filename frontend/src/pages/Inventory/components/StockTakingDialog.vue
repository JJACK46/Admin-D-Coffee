<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useStockTakingStore } from '../store/stockTaking'
import { useInventoryStore } from '../store/inventory'
import { useAuthStore } from '@/stores/auth'
import WarningDialog from '../components/WarningDialog.vue'
import { getDateNowString } from '@/utils/date'
import { useDisplay } from 'vuetify'
import { requiredRule, rulePositiveNumberOnly } from '@/utils/rules'
const inv = useInventoryStore()
const stock = useStockTakingStore()
const auth = useAuthStore()
const formComplete = ref<boolean | null>()
const hasDuplicate = computed(() => inv.hasDuplicateIngredientId(stock.editItems))

onMounted(() => {
  inv.fetchIngredient()
})

function handleHighlight(min: number, bal: number) {
  if (bal === 0) {
    return 'd-flex text-red my-2'
  }
  if (inv.isLowStock(min, bal)) {
    return 'd-flex text-warning my-2'
  }
  return 'd-flex my-2'
}
</script>

<template>
  <v-dialog v-model="stock.isDialogOpen" fullscreen persistent transition="dialog-top-transition">
    <v-card class="px-10 py-2">
      <template #title>
        <v-row>
          <v-col>
            <h3>Stock-taking</h3>
            <h4>Inventory of branch : {{ inv.selectedBranch?.name }}</h4>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <h3>Employee : {{ auth.getCurrentUser?.fullName }}</h3>
            <h4>
              {{ `Current date: ${getDateNowString()}` }}
            </h4>
          </v-col>
        </v-row>
        <v-divider class="mt-5" thickness="2"></v-divider>
      </template>
      <v-form v-model="formComplete">
        <v-data-table
          class="px-6 row-height-50"
          :items="stock.editItems"
          :headers="stock.dialogHeaders"
          :height="useDisplay().xlAndUp.value ? 700 : 500"
          fixed-header
          :items-per-page="0"
          no-data-text="No items"
        >
          <template #item="{ item, index }">
            <tr>
              <td>
                <v-select
                  :rules="[requiredRule]"
                  class="d-flex"
                  :items="inv.availableIngredient"
                  :item-title="'name'"
                  return-object
                  v-model:model-value="item.ingredient"
                  @update:model-value="(val) => (item.ingredientId = val.id!)"
                  variant="outlined"
                ></v-select>
              </td>
              <td>
                <v-text-field
                  :rules="[requiredRule, rulePositiveNumberOnly]"
                  class="d-flex"
                  v-model.number="item.minBalance"
                  min="0"
                  variant="outlined"
                  type="number"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  :rules="[rulePositiveNumberOnly]"
                  min="0"
                  :class="handleHighlight(item.minBalance, item.balance)"
                  v-model.number="item.balance"
                  variant="outlined"
                  type="number"
                ></v-text-field>
              </td>
              <td>{{ item.ingredient?.unit }}</td>
              <td>
                <v-btn variant="plain" icon="mdi-delete" @click="stock.removeItem(index)"></v-btn>
              </td>
            </tr>
          </template>
          <template #bottom>
            <v-divider thickness="2"></v-divider>
            <v-row no-gutters class="justify-center mx-auto mt-3">
              <v-col>
                <v-btn
                  rounded="lg"
                  text="add"
                  color="primary"
                  prepend-icon="mdi-plus"
                  variant="flat"
                  :disabled="stock.editItems.length >= inv.getIngredients.length"
                  @click="stock.addItem()"
                >
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-form>
      <v-spacer></v-spacer>
      <v-card-actions class="justify-end ma-2">
        <v-btn variant="outlined" @click="stock.closeDialog()"> close </v-btn>
        <WarningDialog :save-callback="stock.save">
          <template #activator="{ props }">
            <v-btn
              :disabled="!formComplete || hasDuplicate"
              variant="flat"
              color="secondary"
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

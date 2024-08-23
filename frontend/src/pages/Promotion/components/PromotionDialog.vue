<script setup lang="ts">
import DatePickerDialog from '@/components/DatePickerDialog.vue'
import { usePromotionStore } from '@/stores/promotion.ts'
import { requiredRule, rulePositiveNumberOnly } from '@/utils/rules.ts'
import { ref } from 'vue'

const store = usePromotionStore()
const formComplete = ref<boolean>()
</script>

<template>
  <v-dialog v-model="store.dialogState" width="512">
    <v-card rounded="lg">
      <h2 class="pt-3 text-center">
        {{ store.titleDialog }}
      </h2>
      <v-divider class="mt-3"></v-divider>
      <v-form v-model="formComplete" class="pa-5">
        <v-row>
          <v-col cols="12">
            <v-text-field :rules="[requiredRule]" v-model="store.tempItem.name" label="Name" />
          </v-col>
          <v-col cols="12">
            <v-textarea
              :rules="[requiredRule]"
              label="Description"
              v-model="store.tempItem.description"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              type="number"
              min="0"
              max="100"
              :rules="[
                requiredRule,
                rulePositiveNumberOnly,
                (v: number) => v <= 100 || 'cannot be more than 100%'
              ]"
              @update:model-value="
                (v) => (store.tempItem.discountPercentage = (v as unknown as number) / 100)
              "
              :placeholder="(store.tempItem.discountPercentage * 100) as unknown as string"
              label="Discount (%)"
            />
          </v-col>
          <v-col cols="6">
            <DatePickerDialog @get-selected-date="(date) => (store.tempItem.endDate = date)">
              <template #activator="{ props }">
                <v-text-field
                  :rules="[requiredRule]"
                  prepend-inner-icon="mdi-calendar"
                  v-bind="props"
                  readonly
                  v-model="store.tempItem.endDate"
                  label="End Date"
                />
              </template>
            </DatePickerDialog>
          </v-col>
          <v-col cols="12">
            <v-expansion-panels>
              <v-expansion-panel title="Advanced Options">
                <template #text>
                  <v-select
                    class="mt-5"
                    chips
                    multiple
                    label="Only Following Products"
                    :items="store.products"
                    item-title="name"
                    item-value="id"
                    v-model="store.tempItem.usableProductsId"
                  ></v-select>
                  <v-switch
                    class="d-flex justify-center"
                    v-model="store.tempItem.combo"
                    color="brown"
                    label="Is combo set ?"
                  ></v-switch>
                </template>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions class="px-5 pb-5">
        <v-spacer></v-spacer>
        <v-btn variant="outlined" @click="store.closeDialog()"> close </v-btn>
        <v-btn :disabled="!formComplete" color="primary" variant="flat" @click="store.save()">
          save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

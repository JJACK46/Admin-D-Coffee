<script setup lang="ts">
import DatePickerDialog from '@/components/DatePickerDialog.vue'
import { usePromotionStore } from '@/stores/promotion.ts'
import { requiredRule, rulePositiveNumberOnly } from '@/utils/rules.ts'
import { ref } from 'vue'
import DefaultDialog from '@/components/DefaultDialog.vue'

const store = usePromotionStore()
const formComplete = ref<boolean>()
</script>

<template>
  <DefaultDialog
    :title="store.titleDialog"
    v-model="store.dialogState"
    :callback-save="store.save"
    v-model:state-form="formComplete"
  >
    <template #content>
      <v-form v-model="formComplete">
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
    </template>
  </DefaultDialog>
</template>

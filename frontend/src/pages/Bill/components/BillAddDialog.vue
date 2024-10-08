<script setup lang="ts">
import { ref } from 'vue'
import type { VForm } from 'vuetify/components'
import { useBillStore } from '@/stores/bill'
import { requiredRule, rulePositiveNumberOnly } from '@/utils/rules'
import DatePickerDialog from '@/components/DatePickerDialog.vue'
import DefaultDialog from '@/components/DefaultDialog.vue'

const store = useBillStore()
const form = ref(false)
const refForm = ref<VForm | null>(null)

// const fieldData: { label: string; value: keyof Bill }[] = [
//   { label: 'Date', value: 'date' },
//   { label: 'Worth', value: 'worth' }
// ]

function onSubmit() {}
</script>

<template>
  <DefaultDialog
    title="New Bill"
    v-model="store.isDialogOpen"
    v-model:state-form="form"
    :callback-save="store.save"
  >
    <template #content>
      <v-form ref="refForm" v-model="form" @submit.prevent="onSubmit">
        <v-row>
          <v-col cols="6">
            <v-select
              :items="['Electric', 'Water', 'Payroll', 'Other']"
              v-model="store.getTempBill.category"
              variant="outlined"
            >
            </v-select>
          </v-col>
          <v-col cols="6">
            <DatePickerDialog
              @getSelectedDate="
                (value) => {
                  store.getTempBill.date = value
                }
              "
            >
              <template #activator="{ props }">
                <v-text-field
                  prepend-icon="mdi-calendar"
                  v-bind="props"
                  clearable
                  variant="outlined"
                  label="Date"
                  readonly
                  v-model="store.getTempBill.date"
                >
                </v-text-field>
              </template>
            </DatePickerDialog>
          </v-col>
          <v-col cols="6">
            <v-text-field
              type="number"
              v-model.number="store.getTempBill.worth"
              :rules="[requiredRule, rulePositiveNumberOnly]"
              clearable
              variant="outlined"
              label="Worth"
              min="0"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-switch
              color="green-darken-3"
              class="d-flex justify-center"
              label="Had paid"
              v-model="store.tempBill.status"
            >
            </v-switch>
          </v-col>
        </v-row>
        <v-divider class="mt-3"></v-divider>
        <v-sheet class="border">
          <v-data-table fixed-header :items="store.getTempBill.lines" :headers="store.headersLines">
            <template #top>
              <h3 class="pa-3 text-center">Lines Details</h3>
              <v-divider></v-divider>
            </template>
            <template #item="{ item, index }">
              <tr>
                <td>
                  <v-text-field v-model="item.name" variant="outlined" rounded="lg"> </v-text-field>
                </td>
                <td>
                  <v-text-field v-model="item.price" variant="outlined" rounded="lg">
                  </v-text-field>
                </td>
                <td>
                  <v-btn @click="store.removeLine(index)" icon="mdi-delete" variant="plain"></v-btn>
                </td>
              </tr>
            </template>
            <template #no-data>
              <v-btn @click="store.addLine" icon="mdi-plus" variant="plain" size="small"> </v-btn>
            </template>
            <template v-if="store.tempBill.lines.length > 0" #[`body.append`]="{ columns }">
              <td :colspan="columns.length">
                <div class="justify-center d-flex">
                  <v-btn @click="store.addLine" icon="mdi-plus" variant="plain" size="small">
                  </v-btn>
                </div>
              </td>
            </template>
            <template #bottom></template>
          </v-data-table>
        </v-sheet>
      </v-form>
    </template>
  </DefaultDialog>
</template>

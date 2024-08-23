<script setup lang="ts">
import { usePayrollStore } from '@/stores/payroll'
import { useAuthStore } from '@/stores/auth'
import { rulePositiveNumberOnly } from '@/utils/rules'
import DatePickerDialog from '@/components/DatePickerDialog.vue'
import { reactive } from 'vue'

const store = usePayrollStore()
const auth = useAuthStore()

const optionsMask = { mask: '#-###-#####-#' }
const maskObject = reactive({})
</script>
<template>
  <v-dialog
    v-model="store.isSlipDialogOpen"
    transition="dialog-bottom-transition"
    fullscreen
    persistent
  >
    <v-card class="pa-10">
      <v-card-title>
        <h3 class="text-center">สลิปเงินเดือน / Salary Slip</h3>
        <div v-if="store.isNewSlip">
          <v-switch
            class="d-flex justify-center"
            color="green-darken-1"
            label="Is had paid / ได้จ่ายแล้ว"
          >
          </v-switch>
        </div>
      </v-card-title>
      <v-card-text>
        <v-row class="px-3">
          <v-col cols="12" md="7">
            <v-row class="border">
              <v-col v-if="store.isNewSlip" cols="12" md="6">
                <v-autocomplete
                  v-model="store.selectEmployee"
                  variant="outlined"
                  hide-details
                  :items="store.getEmployees"
                  return-object
                  item-title="id"
                  density="compact"
                  label="Employee ID"
                >
                </v-autocomplete>
              </v-col>
              <v-col v-else cols="12" md="6">
                รหัสพนักงาน: {{ store.tempSlip?.employee?.id }}
              </v-col>
              <v-col cols="12" md="6">
                ชื่อนามสกุล:
                {{ store.tempSlip?.employee?.fullName ?? store.selectEmployee?.fullName }}
              </v-col>
              <v-col cols="12">
                ตำแหน่ง: {{ store.tempSlip?.employee?.title ?? store.selectEmployee?.title }}
              </v-col>
              <v-divider class="my-1"></v-divider>
              <v-col cols="12" class="py-8">
                <h3>
                  บริษัท ดีคอฟฟี่ จำกัด สาขา :
                  {{ store.tempSlip?.branch?.name ?? auth.getCurrentUser?.branch.name }}
                </h3>
                <p>
                  D-Coffee Co., Ltd. Branch :
                  {{ store.tempSlip?.branch?.name ?? auth.getCurrentUser?.branch.name }}
                </p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="5">
            <v-row class="border">
              <v-col cols="4" class="text-left">
                รอบเงินเดือน: <br />
                Payroll Period
              </v-col>
              <v-col cols="8" class="text-left"> </v-col>
            </v-row>
            <v-row class="border">
              <v-col cols="4" class="text-left">
                วันที่ชำระ: <br />
                Payment Date
              </v-col>
              <v-col v-if="store.isNewSlip" cols="8" class="text-left">
                <DatePickerDialog @get-selected-date="(value) => (store.tempSlip.dueDate = value)">
                  <template #activator="{ props }">
                    <v-text-field
                      v-model="store.tempSlip.dueDate"
                      density="compact"
                      prepend-inner-icon="mdi-calendar"
                      v-bind="props"
                      readonly
                      variant="outlined"
                    ></v-text-field>
                  </template>
                </DatePickerDialog>
              </v-col>
              <v-col v-else cols="8" class="text-left">
                {{ store.tempSlip?.dueDate }}
              </v-col>
            </v-row>
            <v-row class="border">
              <v-col cols="4" class="text-left">
                เลขที่บัญชี: <br />
                Bank Account
              </v-col>
              <v-col v-if="store.isNewSlip">
                <v-text-field
                  v-maska:[optionsMask]="maskObject"
                  density="compact"
                  variant="outlined"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-table class="border" height="470">
              <thead>
                <tr>
                  <th style="text-align: center">
                    <h2>เงินได้</h2>
                    <p>Earnings</p>
                  </th>
                  <th style="text-align: center">
                    <h2>รายการหัก</h2>
                    <p>Deductions</p>
                  </th>
                  <th style="text-align: center">
                    <h2>ปี</h2>
                    <p>Year</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <v-row
                      v-for="data in store.getFieldsData[0].earning"
                      :key="data.enLabel"
                      no-gutters
                      class="my-2"
                    >
                      <v-col cols="12" md="7">
                        <h3>{{ data.thLabel }}</h3>
                        <p>{{ data.enLabel }}</p>
                      </v-col>
                      <v-col cols="12" md="5">
                        <p class="text-end" v-if="data.enLabel === 'Salary/Wage'">
                          {{ store.getSalaryWage }}
                        </p>
                        <v-text-field
                          v-else
                          density="compact"
                          min="0"
                          :rules="[rulePositiveNumberOnly]"
                          v-model.number="store.tempSlip.payrollDetails[data.key]"
                          type="number"
                          variant="outlined"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </td>
                  <td>
                    <v-row
                      v-for="data in store.getFieldsData[1].deduction"
                      :key="data.enLabel"
                      no-gutters
                      class="my-2"
                    >
                      <v-col cols="12" md="7">
                        <h3>{{ data.thLabel }}</h3>
                        <p>{{ data.enLabel }}</p>
                      </v-col>
                      <v-col cols="12" md="5" class="text-right">
                        <v-text-field
                          density="compact"
                          min="0"
                          :rules="[rulePositiveNumberOnly]"
                          v-model.number="store.tempSlip.payrollDetails[data.key]"
                          type="number"
                          variant="outlined"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </td>
                  <td>
                    <v-row
                      v-for="data in store.getFieldsData[2].summary"
                      :key="data.enLabel"
                      no-gutters
                      class="my-2"
                    >
                      <v-col cols="12" md="7">
                        <h3>{{ data.thLabel }}</h3>
                        <p>{{ data.enLabel }}</p>
                      </v-col>
                      <v-col cols="12" md="5" class="text-right">
                        <h3>{{ store.tempSlip[data.key] }}</h3>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="mx-5">
        <div v-if="store.isNewSlip" class="mx-auto">
          <v-btn variant="outlined" text="Cancel" @click="store.closeSlipDialog()"></v-btn>
          <v-btn color="primary" variant="flat" text="Save"></v-btn>
        </div>
        <div v-else>
          <p>Verified & Paid by {{ auth.getCurrentUser?.fullName }}</p>
          <v-spacer class="mx-1"></v-spacer>
          <v-btn color="grey" variant="outlined" @click="store.closeSlipDialog()"> Cancel </v-btn>
          <v-btn color="primary" variant="flat"> Pay </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
table th + th {
  border-left: 1px solid var(--color-border);
}

table td + td {
  border-left: 1px solid var(--color-border);
}
</style>

<script setup lang="ts">
import { useEmployeeStore } from '../stores/employee'
import { defaultGenders } from '../types/gender'
import { defaultJobTitles } from '../types/jobTitle'
import { reactive, ref, watch } from 'vue'
import { requiredRule } from '@/utils/rules'
import DatePickerDialog from '@/components/DatePickerDialog.vue'
import type { MaskaDetail, MaskOptions } from 'maska'
import type { Employee } from '../types/employee'
import { computed } from 'vue'
import { baseURLImage } from '@/services/http'
const store = useEmployeeStore()
const optionsMask: MaskOptions = {
  mask: '###-###-####',
  eager: true
}
const telMaskObject = reactive<MaskaDetail>({ masked: '', unmasked: '', completed: false })
const formState = ref(true)

const telTextField = ref()

watch(
  () => store.dialogState,
  (v) => {
    if (v) {
      telTextField.value = store.tempItem.tel
    }
  }
)

const fieldData: { name: keyof Employee; label: string; type: string }[] = [
  { name: 'branchId', label: 'Branch', type: 'number' },
  { name: 'title', label: 'Job Title', type: 'text' },
  { name: 'salaryWage', label: 'Salary/Wage', type: 'number' },
  { name: 'minWorkHour', label: 'Minimum work hour', type: 'number' },
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
  { name: 'tel', label: 'Tel.', type: 'text' },
  { name: 'gender', label: 'Gender', type: 'text' }
]

const existImageUrl = computed(() => {
  if (store.tempItem.imageUrl) {
    return `${baseURLImage}/employees/${store.tempItem.imageUrl}`
  }
  return store.tempItem.imageUrl
})
</script>

<template>
  <v-dialog v-model="store.dialogState" persistent width="1024">
    <v-card rounded="lg">
      <h2 class="px-5 py-3"></h2>
      <v-divider></v-divider>
      <v-form v-model="formState" class="pa-5">
        <v-row>
          <v-col cols="12">
            <div>
              <v-img
                :src="existImageUrl"
                :style="{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  background: 'rgba(0, 0, 0, 0.5)'
                }"
                class="mx-auto mb-5"
              >
              </v-img>
              <v-file-input
                @update:model-value="store.handleFileChange"
                type="file"
                show-size
                variant="outlined"
                label="Profile Image"
                prepend-icon="mdi-camera"
                accept="image/png,image/jpeg"
                :rules="[
                  (files) =>
                    !files ||
                    !files.some((file: File) => file.size > 1e6) ||
                    'File size should be less than 1 MB!'
                ]"
              ></v-file-input>
            </div>
          </v-col>
          <v-col cols="3" v-for="(field, index) in fieldData" :key="index">
            <v-select
              variant="outlined"
              v-if="field.name === 'gender'"
              :label="field.label"
              :items="defaultGenders"
              :rules="[requiredRule]"
              v-model="store.tempItem.gender"
            ></v-select>
            <v-select
              variant="outlined"
              v-else-if="field.name === 'title'"
              :label="field.label"
              :items="defaultJobTitles"
              :rules="[requiredRule]"
              v-model="store.tempItem.title"
            ></v-select>
            <v-select
              variant="outlined"
              v-else-if="field.name === 'branchId'"
              :label="field.label"
              :items="store.getBranch"
              item-title="name"
              item-value="id"
              :rules="[requiredRule]"
              v-model="store.tempItem.branchId"
            ></v-select>
            <v-text-field
              v-else-if="field.name === 'tel'"
              v-model="telTextField"
              variant="outlined"
              v-maska:[optionsMask]="telMaskObject"
              :label="field.label"
              :rules="[requiredRule, (v) => v.length == 12 || 'Invalid number format']"
              @update:model-value="
                () => {
                  store.tempItem.tel = telMaskObject.unmasked
                }
              "
            ></v-text-field>

            <v-text-field
              v-else-if="field.type === 'number'"
              variant="outlined"
              :type="field.type"
              v-model.number="(store.tempItem as Record<string, any>)[field.name]"
              :label="field.label"
              :rules="[requiredRule]"
              clearable
            >
            </v-text-field>
            <v-text-field
              variant="outlined"
              v-else
              :type="field.type"
              v-model="(store.tempItem as Record<string, any>)[field.name]"
              :label="field.label"
              :rules="[requiredRule]"
              clearable
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-textarea
              variant="outlined"
              label="Biography"
              :rules="[
                (v: string) => v.length <= 255 || 'Text cannot exceed 255 length',
                requiredRule
              ]"
              v-model="store.tempItem.biography"
            ></v-textarea>
          </v-col>
          <v-col>
            <DatePickerDialog @get-selected-date="(val) => (store.tempItem.birthDate = val)">
              <template #activator="{ props }">
                <v-text-field
                  v-bind="props"
                  :rules="[requiredRule]"
                  prepend-inner-icon="mdi-cake"
                  variant="outlined"
                  readonly
                  label="Birth Date"
                  v-model="store.tempItem.birthDate"
                ></v-text-field>
              </template>
            </DatePickerDialog>
          </v-col>
          <v-col>
            <DatePickerDialog @get-selected-date="(val) => (store.tempItem.startDate = val)">
              <template #activator="{ props }">
                <v-text-field
                  v-bind="props"
                  :rules="[requiredRule]"
                  prepend-inner-icon="mdi-calendar"
                  variant="outlined"
                  readonly
                  label="Start Work Date"
                  v-model="store.tempItem.startDate"
                ></v-text-field>
              </template>
            </DatePickerDialog>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="outlined" @click="store.closeDialog" text="close"> </v-btn>
          <v-btn
            :disabled="!formState"
            color="primary"
            variant="flat"
            @click="store.save()"
            text="Save"
          >
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

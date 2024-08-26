<script setup lang="ts">
import { requiredRule } from '@/utils/rules'
import { useCustomerStore } from '@/stores/customer'
import DatePickerDialog from '@/components/DatePickerDialog.vue'
import type { MaskaDetail } from 'maska'
import { telOptions } from '@/utils/maska'
import { formatLabel } from '@/utils/constants'
import DefaultDialog from '@/components/DefaultDialog.vue'
import { ref } from 'vue'

const store = useCustomerStore()
const maskObject: MaskaDetail = { masked: '', unmasked: '', completed: false }
const form = ref(false)
</script>

<template>
  <DefaultDialog
    :title="store.titleDialog"
    :callback-save="store.save"
    v-model="store.dialogState"
    v-model:state-form="form"
  >
    <template #content>
      <v-form v-model="form">
        <v-row>
          <v-col cols="12">
            <v-img
              :src="store.tempItem.imageUrl"
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
          </v-col>
          <v-col cols="6" v-for="(value, key) in store.getEditCustomer" :key="key">
            <DatePickerDialog
              v-if="key === 'birthDate'"
              @get-selected-date="(val) => (store.tempItem.birthDate = val)"
            >
              <template #activator="{ props }">
                <v-text-field
                  v-bind="props"
                  :rules="[requiredRule]"
                  prepend-inner-icon="mdi-calendar"
                  label="Birth date"
                  readonly
                  v-model="store.tempItem.birthDate"
                >
                </v-text-field>
              </template>
            </DatePickerDialog>
            <v-text-field
              v-else-if="key === 'tel'"
              v-maska:[telOptions]="maskObject"
              :label="formatLabel(key)"
              :rules="[requiredRule]"
              clearable
              @update:model-value="() => (store.tempItem.tel = maskObject.unmasked)"
            >
            </v-text-field>
            <div v-else-if="key === 'imageFile' || key === 'imageUrl'" hidden></div>
            <v-text-field
              v-else
              v-model:model-value="store.tempItem[key]"
              :label="formatLabel(key)"
              :rules="[requiredRule]"
              clearable
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </template>
  </DefaultDialog>
</template>

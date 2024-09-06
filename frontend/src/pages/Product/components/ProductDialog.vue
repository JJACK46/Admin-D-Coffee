<script setup lang="ts">
import { requiredRule, rulePositiveNumberOnly } from '@/utils/rules'
import { useProductStore } from '@/stores/product'
import { typesOfProducts } from '../../../types/product'
import { ref } from 'vue'
import DefaultDialog from '@/components/DefaultDialog.vue'
import { useLocale } from 'vuetify'
import DragAndDrop from '@/components/DragAndDrop.vue'

const store = useProductStore()
const { t } = useLocale()
const formComplete = ref<boolean>()
</script>

<template>
  <DefaultDialog
    :title="store.titleDialog"
    :state-form="formComplete"
    v-model="store.dialogState"
    :callback-save="store.save"
  >
    <template #content>
      <v-form v-model="formComplete">
        <v-stepper :items="['Upload Image', 'Details']" flat>
          <template #[`item.1`]>
            <v-card flat>
              <v-img
                v-if="store.imageUrl"
                :style="{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                  background: 'rgba(0,0,0,0.5)'
                }"
                draggable="false"
                class="mx-auto"
                :src="store.imageUrl"
              >
              </v-img>
              <DragAndDrop
                v-else
                v-model="store.tempItem.files"
                @update="(v) => (store.imageUrl = v)"
              ></DragAndDrop>
              <v-btn
                v-if="store.imageUrl.length > 0"
                class="mx-auto d-flex mt-5"
                variant="flat"
                color="error"
                @click="store.resetItem"
              >
                {{ t('cancel') }}
              </v-btn>
            </v-card>
          </template>
          <template #[`item.2`]>
            <v-card title="" flat>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    variant="outlined"
                    v-model:model-value="store.tempItem.name"
                    label="Name"
                    :rules="[requiredRule]"
                    clearable
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    variant="outlined"
                    v-model.number="store.tempItem.price"
                    label="Price"
                    min="0"
                    type="number"
                    :rules="[requiredRule, rulePositiveNumberOnly]"
                    clearable
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    variant="outlined"
                    label="Type"
                    :rules="[requiredRule]"
                    v-model="store.tempItem.type"
                    :items="typesOfProducts"
                    clearable
                  >
                  </v-select>
                </v-col>
              </v-row>
            </v-card>
          </template>
        </v-stepper>
      </v-form>
    </template>
  </DefaultDialog>
</template>

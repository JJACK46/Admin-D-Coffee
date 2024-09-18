<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import { monthsWithNum } from '@/utils/date'
import type { SortItem } from '@/utils/types'
import { onMounted, ref } from 'vue'

const selectedMonth = defineModel('month', { type: Number })
const selectedYear = defineModel('year', { type: Number })

const props = defineProps<{
  title: string
  items: Array<any>
  headers: ReadonlyArray<{
    title: string
    key: object | string
    value?: string | Function
    sortable?: boolean
  }>
  search?: string
  callbackFunc?: Function
  reloadFunc?: Function
  customColumnName?: string
  hasCustomItems?: true
  hasAction?: true
  showExpand?: true
  sortDesc?: true
  hasFilter?: true
}>()

onMounted(() => {
  if (props.callbackFunc) {
    props.callbackFunc()
  }
})

const skip = ref(0)
const take = ref(10)

function loadItems({
  page,
  itemsPerPage,
  sortBy
}: {
  page: number
  itemsPerPage: number
  sortBy: any
}) {
  if (props.callbackFunc) {
    // const start = (page - 1) * itemsPerPage
    // const end = start + itemsPerPage
    skip.value = (page - 1) * itemsPerPage
    take.value = itemsPerPage

    props.callbackFunc(skip.value, take.value)
  }
}

const loader = useLoadingStore()
const expands = ref([])
</script>

<template>
  <v-container fluid class="h-100">
    <v-card rounded="lg" class="h-100 elevation-0">
      <v-data-table
        :loading="loader.isLoading"
        :sort-by="sortDesc ? ([{ key: 'id', order: 'desc' }] as Readonly<SortItem[]>) : []"
        :search="$props.search"
        :items="$props.items"
        v-model:expanded="expands"
        :headers="
          $props.headers.concat(
            $props.hasAction ? [{ title: 'Actions', key: 'actions' }] : []
          ) as ReadonlyArray<any>
        "
        class="h-100 overflow-x-auto"
        :show-expand="$props.showExpand"
        @update:options="loadItems"
      >
        <template #top>
          <v-card class="pa-5 elevation-0">
            <v-card-title>
              <h2 class="py-1">
                {{ $props.title }}
              </h2>
            </v-card-title>
            <v-card-text class="mt-2">
              <v-row no-gutters>
                <v-col cols="12" v-if="hasFilter">
                  <v-row>
                    <v-col>
                      <v-select
                        variant="outlined"
                        rounded="lg"
                        density="compact"
                        label="Month"
                        :items="monthsWithNum"
                        item-title="label"
                        item-value="number"
                        @update:model-value="(v) => (selectedMonth = v ?? 0)"
                        clearable
                      >
                      </v-select>
                    </v-col>
                    <v-col>
                      <v-select
                        variant="outlined"
                        rounded="lg"
                        density="compact"
                        label="Year"
                        :items="[2023, 2024]"
                        @update:model-value="(v) => (selectedYear = v ?? 0)"
                        clearable
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="auto">
                      <v-btn
                        :loading="loader.isLoading"
                        text="reload"
                        prepend-icon="mdi-autorenew"
                        variant="flat"
                        rounded="pill"
                        color="primary"
                        @click="reloadFunc"
                      ></v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <slot name="topCardText" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-divider thickness="1"></v-divider>
        </template>
        <template v-if="$props.hasCustomItems" #item="{ item }">
          <slot name="item" :item="item"> </slot>
        </template>
        <template #[`item.${$props.customColumnName}`]="{ item }">
          <slot :name="$props.customColumnName" :item="item"> </slot>
        </template>
        <template v-if="$props.hasAction" #[`item.actions`]="{ item }">
          <slot name="actions" :item="item"></slot>
        </template>
        <template #expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length">
              <v-container fluid>
                <slot name="expanded-row" :item="item"></slot>
              </v-container>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

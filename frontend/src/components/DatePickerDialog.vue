<script setup lang="ts">
const modelDate = defineModel<Date>()

const emit = defineEmits<{
  getSelectedDate: [date: string]
}>()

function closeDialog() {}

function saveDate() {
  emit('getSelectedDate', modelDate.value!.toLocaleDateString('fr-CA'))
  closeDialog()
}
</script>

<template>
  <v-dialog>
    <template #activator="{ props }">
      <slot name="activator" :props="props"></slot>
    </template>
    <template #default="{ isActive }">
      <v-row justify="center">
        <v-date-picker rounded="lg" width="400" v-model="modelDate">
          <template #actions>
            <v-btn @click="isActive.value = false"> close </v-btn>
            <v-btn
              @click="
                () => {
                  isActive.value = false
                  saveDate()
                }
              "
            >
              save
            </v-btn>
          </template>
        </v-date-picker>
      </v-row>
    </template>
  </v-dialog>
</template>

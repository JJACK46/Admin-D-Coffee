<template>
  <v-row no-gutters>
    <v-col>
      <v-text-field
        v-model="searchText"
        density="compact"
        variant="outlined"
        label="Search"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="emitSearchText"
        @keydown.enter="emitSearchText"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits<{
  getSearchText: [string]
}>()

const searchText = ref('')

function emitSearchText() {
  emit('getSearchText', searchText.value.trim())
}

watch(
  () => searchText.value,
  (blank) => {
    if (searchText.value.trim().length === 0) {
      emit('getSearchText', blank)
    }
  }
)
</script>

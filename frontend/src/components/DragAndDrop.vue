<script setup lang="ts">
import { ruleFiles } from '@/utils/rules'
import { useDropZone } from '@vueuse/core'
import { ref, watch } from 'vue'
import { useLocale } from 'vuetify'

const dropZoneRef = ref<HTMLDivElement>()
const filesModel = defineModel<File[] | null>()
const imageUrl = ref<string>('')
const { t } = useLocale()

const emit = defineEmits<{
  update: [value: string]
}>()

function onDrop(f: File[] | null) {
  filesModel.value = f
  handleFileChange(f)
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ['image/jpeg', 'image/png', 'image/webp']
})

function handleFileChange(files: File[] | File | null) {
  if (!files) return
  const fileArray = Array.isArray(files) ? files : [files]
  if (fileArray.length < 1) {
    return
  }
  const reader = new FileReader()
  reader.onload = (event: any) => {
    imageUrl.value = event.target.result
  }
  reader.readAsDataURL(fileArray[0])
}

watch(imageUrl, () => {
  emit('update', imageUrl.value)
})
</script>

<template>
  <div ref="dropZoneRef" class="border-md border-dashed pa-5 text-center rounded-lg">
    {{ isOverDropZone ? 'Drop here' : 'Drag file here' }}
    <p class="mb-2">or</p>
    <v-file-input
      class="mx-auto"
      accept="image/png,image/jpeg,image/webp"
      v-model="filesModel"
      hide-details
      single-line
      :label="`${t('Click to upload')}`"
      variant="solo-filled"
      flat
      width="200"
      prepend-icon=""
      show-size
      @update:model-value="handleFileChange"
      :rules="[ruleFiles]"
      clearable
    >
    </v-file-input>
  </div>
</template>

<style scoped>
.v-input .v-label .v-field__field {
  align-items: center;
  text-align: center;
  justify-content: center;
  justify-self: center;
}
</style>

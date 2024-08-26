<template>
  <v-dialog v-model="stateDialog" min-width="512" max-width="1000" persistent>
    <v-card :prepend-icon="prependIcon">
      <template #title>
        {{ title }}
      </template>
      <template #text>
        <slot name="content"></slot>
      </template>
      <v-card-actions class="pa-5">
        <v-btn variant="text" @click="handleClose" text="Close"> </v-btn>
        <v-btn
          :disabled="!stateForm"
          color="success"
          variant="text"
          @click="callbackSave()"
          text="Save"
        >
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const stateDialog = defineModel<boolean>({ required: true })
const stateForm = defineModel<boolean>('stateForm', { default: false, required: false })

const props = defineProps<{
  title: string
  prependIcon?: string
  callbackSave: Function
  callbackClose?: Function
}>()

const handleClose = () => {
  if (props.callbackClose) {
    props.callbackClose()
  } else {
    stateDialog.value = false
  }
}
</script>

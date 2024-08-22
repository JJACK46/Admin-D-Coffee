<template>
  <v-menu location="center">
    <template #default>
      <v-card>
        <v-img height="400" width="400" cover :src="imageUrl">
          <div class="justify-end d-flex">
            <v-btn size="small" class="ma-2" icon="mdi-close"></v-btn>
          </div>
        </v-img>
      </v-card>
    </template>
    <template #activator="{ props }">
      <v-img
        v-bind="props"
        style="border-radius: 50%; margin: 10px 0 10px 0"
        height="50"
        width="50"
        cover
        :src="imageUrl"
      ></v-img>
    </template>
  </v-menu>
</template>

<script setup lang="ts">
defineProps<{
  imageUrl: string
}>()
</script>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { requiredRule } from '@/utils/rules'
import DefaultDialog from '@/components/DefaultDialog.vue'

const store = useUserStore()
const formComplete = ref<boolean>()
const customerAcc = ref<boolean>(false)

watch(
  () => customerAcc.value,
  (val) => {
    if (val) {
      store.tempItem.roleId = 4
    } else {
      store.tempItem.roleId = undefined
    }
  }
)

const selectCustomer = computed(() => customerAcc.value)

onMounted(() => {
  store.fetchCustomer()
})
</script>

<template>
  <DefaultDialog
    v-model="store.dialogState"
    :title="store.formTitle"
    :callback-save="store.save"
    v-model:state-form="formComplete"
  >
    <template #content>
      <v-form class="px-5" v-model="formComplete">
        <v-row>
          <v-col cols="12">
            <v-text-field
              :rules="[requiredRule]"
              variant="outlined"
              v-model="store.tempItem.username"
              label="Username"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-switch
              v-model="customerAcc"
              flat
              inline
              density="compact"
              color="primary"
              label="Customer Account"
              class="d-flex justify-center"
            ></v-switch>
          </v-col>
          <v-col cols="12" v-if="!selectCustomer">
            <v-select
              :disabled="customerAcc"
              :rules="[requiredRule]"
              variant="outlined"
              v-model="store.tempItem.employeeId"
              :items="store.employees"
              item-title="fullName"
              item-value="id"
              label="Employee"
            >
            </v-select>
          </v-col>
          <v-col cols="12" v-if="selectCustomer">
            <v-select
              :disabled="!customerAcc"
              :rules="[requiredRule]"
              variant="outlined"
              v-model="store.tempItem.customerId"
              :items="store.customers"
              item-title="fullName"
              item-value="id"
              label="Customer"
            >
            </v-select>
          </v-col>
          <v-col cols="12" v-if="!selectCustomer">
            <v-select
              :rules="[requiredRule]"
              variant="outlined"
              label="Roles"
              :disabled="customerAcc"
              v-model="store.tempItem.roleId"
              :items="store.getRoles"
              item-value="id"
              item-title="name"
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
    </template>
  </DefaultDialog>
</template>

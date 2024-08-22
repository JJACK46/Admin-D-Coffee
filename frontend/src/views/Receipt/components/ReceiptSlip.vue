<script setup lang="ts">
import type { Receipt } from '@views/Receipt/types/receipt'
import { computed } from 'vue'

const headers = [
  { title: 'Qty', value: 'amount' },
  { title: 'Name', value: 'name' },
  { title: 'Price', value: 'totalPrice' }
]

const props = defineProps<{
  receipt: Receipt
  lightMode?: true
}>()

const hasCustomer = computed(() => props.receipt.customerId! > 0 || props.receipt.customer != null)
const hasPromotion = computed(
  () => props.receipt.promotionId! > 0 || props.receipt.promotion != null
)
</script>

<template>
  <v-data-table
    class="elevation-0"
    :theme="lightMode ? 'light' : 'default'"
    :headers="headers"
    :items="receipt.receiptItemsShort as unknown as ReadonlyArray<any>"
    fixed-header
  >
    <template #top>
      <v-container class="text-center pa-0 mb-5 elevation-0">
        <div class="mb-2">
          <v-img
            inline
            :class="lightMode ? 'mx-auto bg-black' : 'mx-auto'"
            src="src\assets\MainLogo.png"
            width="50"
          ></v-img>
          <p>
            D-Coffee <br />
            คณะสหเวชศาสตร์ มหาวิทยาลัยบูรพา <br />
            ประเทศไทย จ.ชลบุรี 20130<br />
            โทร 095 332 5290
          </p>
        </div>
        <div class="text-left">
          <p>Tax ID : {{ Math.round(Math.random() * 123456789) }}</p>
          <p>Queue : {{ 1 }}</p>
          <p>Date : {{ receipt.createdDate }}</p>
          <p>Time : {{ receipt.createdTime }}</p>
          <p>ผู้ออกใบเสร็จ : {{ receipt.employeeName }}</p>
        </div>
      </v-container>
      <v-divider thickness="1"></v-divider>
    </template>
    <template #item="{ item }">
      <tr>
        <td>{{ item.amount }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.price }} ฿</td>
      </tr>
    </template>
    <template #[`body.append`]>
      <tr>
        <td>รวม</td>
        <td></td>
        <td>{{ receipt?.totalPrice }} ฿</td>
      </tr>
      <tr v-if="receipt.usedPoint">
        <td>ใช้ D-Point</td>
        <td>{{ receipt.usedPoint }} DP</td>
        <td>{{ receipt.usedPoint / 100 }} ฿</td>
      </tr>
      <tr v-if="hasPromotion">
        <td>ส่วนลดจากโปรโมชั่น:</td>
        <td>{{ receipt.promotion?.name }}</td>
        <td>{{ receipt.promotion?.discountPercentage! * receipt.totalPrice }} ฿</td>
      </tr>
      <tr v-if="receipt.totalDiscount">
        <td>ส่วนลดทั้งหมด</td>
        <td></td>
        <td>{{ receipt.totalDiscount }} ฿</td>
      </tr>
      <tr>
        <td>จ่ายด้วย {{ receipt?.paymentType }}</td>
        <td></td>
        <td>{{ receipt.receivedAmount }} ฿</td>
      </tr>
      <tr>
        <td>ราคาสุทธิ</td>
        <td></td>
        <td>{{ receipt.totalNet }} ฿</td>
      </tr>
      <tr>
        <td>เงินทอน</td>
        <td></td>
        <td>{{ receipt.change }} ฿</td>
      </tr>
      <tr v-if="hasCustomer">
        <td>สมาชิก :</td>
        <td>{{ receipt.customer?.fullName }}</td>
        <td></td>
      </tr>
      <tr v-if="hasCustomer">
        <td>คุณได้รับ Point :</td>
        <td>{{ receipt.earnPoint }} DP</td>
        <td></td>
      </tr>
      <tr v-if="hasCustomer">
        <td>Point สะสม :</td>
        <td>{{ receipt.totalPoint }} DP</td>
        <td></td>
      </tr>
    </template>
    <template #bottom>
      <div>
        <v-divider class="mb-5"></v-divider>
        <p style="text-align: center">
          Thank you for shopping with us. <v-icon icon="mdi-heart"></v-icon>
        </p>
      </div>
    </template>
  </v-data-table>
</template>

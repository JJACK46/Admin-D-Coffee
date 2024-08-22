import { ProductService } from '@/services/product'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Promotion } from '@/pages/Promotion/types/Promotion'
import { useAuthStore } from '@/stores/auth'
import { typesOfProducts, type Product, type TypeOfProduct } from '@/pages/Product/types/product'
import {
  defaultReceipt,
  type PaymentTypes,
  type Receipt,
  type ReceiptItem,
  type receiptItemsShort
} from '@/pages/Receipt/types/receipt'
import { ReceiptService } from '@/services/receipt'
import { PromotionService } from '@/services/promotion'
import { getDateNowString, getTimeNowString } from '@/utils/date'
import type { Customer } from '@/pages/Customer/types/Customer'
import { CustomerService } from '@/services/customer'

type StatusObject = {
  text: string
  icon: string
  color: string
}

export const usePosStore = defineStore('pos', {
  state() {
    return {
      statusObject: ref<StatusObject | null>({
        text: '',
        icon: '',
        color: ''
      }),
      isDialogStatusOpen: ref(false),
      dialogReceipt: ref(false),
      auth: useAuthStore(),
      allMenu: ref<Product[]>([]),
      orderList: ref<ReceiptItem[]>([]),
      typesOfProducts: ref<TypeOfProduct[]>(typesOfProducts),
      filterList: ref<number[]>([]),
      tab: ref('Drinks'),
      searchText: ref<string>(''),
      promotions: ref<Promotion[]>([]),
      promotionDialog: ref(false),
      selectedPromotion: ref<Promotion | null>(null),
      receivedValue: ref(0),
      paymentType: ref<PaymentTypes>('cash'),
      receipt: ref<Receipt>({ ...defaultReceipt }),
      availablePromotions: ref<Promotion[]>([]),
      showSnackbar: ref<boolean>(false),
      snackbarMsg: ref<string>(''),
      isDialogMembershipOpen: ref<boolean>(false),
      availableMemberships: ref<Customer[]>(),
      selectMembership: ref<Customer | null>(null),
      usedPoint: ref(0),
      updatedPoint: ref(0),
      earnPoint: ref(50)
    }
  },
  getters: {
    hasOrderList: (s) => s.orderList.length > 0,
    getChange(): number {
      return Number((this.receivedValue - this.getTotalNetPrice).toFixed(2))
    },
    getTotalUnit(): number {
      return this.orderList.reduce((sum, item) => item.amount + sum, 0)
    },
    getDiscountPoint(): number {
      return Math.round(this.usedPoint / 100)
    },
    getTotalDiscount(): number {
      const discount =
        (this.selectedPromotion?.discountPercentage || 0) * this.getTotalOriginPrice +
        this.getDiscountPoint
      return Number(discount.toFixed(2))
    },
    getAllDrinks(): Product[] | undefined {
      if (this.allMenu) return this.allMenu.filter((item) => item.type == 'Drinks')
      return undefined
    },
    getAllAppetizer(): Product[] | undefined {
      if (this.allMenu) return this.allMenu.filter((item) => item.type == 'Appetizer')
      return undefined
    },
    getAllFoods(): Product[] | undefined {
      if (this.allMenu) return this.allMenu.filter((item) => item.type == 'Foods')
      return undefined
    },
    getSearchMenu(): Product[] {
      return this.allMenu.filter((item) =>
        item.name.toLowerCase().includes(this.searchText.toLowerCase())
      )
    },
    getTotalNetPrice(): number {
      const net = this.getTotalOriginPrice - this.getTotalDiscount
      return Number(net.toFixed(2))
    },
    getTotalOriginPrice(): number {
      const total = this.orderList.reduce(
        (sum, item) => sum + item.amount * item.product?.price!,
        0
      )
      return Number(total.toFixed(2))
    },
    getAvailablePromotion: (state) => state.availablePromotions,
    getAvailableMembership: (state) => state.availableMemberships,
    hasPromotion: (state) => state.availablePromotions.length > 0
  },
  actions: {
    // async fetchMembershipReceipts() {
    //   this.selectMembership!.receipts = await ReceiptService.getAllWhereCustomer(
    //     this.selectMembership?.id!
    //   )
    // },
    async fetchAvailableMembership() {
      this.availableMemberships = await CustomerService.getAllWithPurchase()
    },
    async fetchMenu() {
      this.allMenu = await ProductService.getAll()
    },
    async fetchPromotion() {
      this.promotions = await PromotionService.getAll()
    },
    addOrderItem(product: Product) {
      const existItem = this.orderList.find((item) => item.product?.id == product.id)
      if (existItem) {
        this.updateAmount(existItem.product?.id!, existItem.amount + 1)
      } else {
        this.orderList.push(<ReceiptItem>{
          productId: product.id,
          product: product,
          amount: 1,
          price: product.price
        })
      }
      this.checkAvailablePromotion()
    },
    removeOrderItem(index: number) {
      this.orderList.splice(index, 1)
      this.checkAvailablePromotion()
    },
    updateAmount(id: number, newAmount: number) {
      const targetIndex = this.orderList.findIndex((item) => item.product?.id == id)
      const target = this.orderList[targetIndex]
      target.amount = newAmount
      target.price = target.amount * target.product?.price!
    },
    unselectPromotion() {
      this.selectedPromotion = null
      this.showSnackbar = true
      this.snackbarMsg = 'Promotion Unselected'
    },
    checkAvailablePromotion() {
      const productsID = this.orderList.map((item) => item.product?.id)
      this.availablePromotions = []
      if (this.selectedPromotion) {
        this.unselectPromotion()
      }
      if (this.promotions) {
        this.promotions.forEach((item) => {
          if (item.combo) {
            if (item.usableProductsId.every((id) => productsID.includes(id))) {
              this.availablePromotions.push(item)
            }
          } else {
            if (item.usableProductsId.some((id) => productsID.includes(id))) {
              this.availablePromotions.push(item)
            }
          }
        })
      }
    },
    clearAllOrderList() {
      if (confirm('Are you sure to clear all items ?')) this.orderList = []
      this.checkAvailablePromotion()
    },
    updateFilter(value: number) {
      if (!this.filterList.includes(value)) {
        this.filterList.push(value)
      } else {
        const targetIndex = this.filterList.indexOf(value)
        this.filterList.splice(targetIndex, 1)
      }
    },
    openDialogPromotion() {
      if (this.orderList.length > 0) {
        this.promotionDialog = true
      } else {
        alert('Please check order list')
      }
    },
    closeDialogPromotion() {
      this.unselectPromotion()
      this.promotionDialog = false
    },
    saveSelectPromotion() {
      this.promotionDialog = false
    },
    async proceedOrder() {
      try {
        const status = await ReceiptService.create(this.receipt)
        if (status === 201 && this.selectMembership) {
          await CustomerService.updatePoints(this.selectMembership?.id!, this.updatedPoint)
        }

        this.openDialogStatus({
          text: 'Order successful !',
          icon: 'mdi-check-circle-outline',
          color: 'green'
        })
        localStorage.setItem('lastOrderItems', JSON.stringify(this.orderList))
        this.resetData()
      } catch (e) {
        this.openDialogStatus({
          text: 'Order fail !',
          icon: 'mdi-cancel',
          color: 'red'
        })
        console.log(e)
      } finally {
        this.closeDialogReceipt()
      }
    },
    resetData() {
      this.resetReceipt()
      this.orderList = []
      this.receivedValue = 0
      this.selectedPromotion = null
      this.availablePromotions = []
      this.usedPoint = 0
    },
    closeDialogReceipt() {
      this.dialogReceipt = false
    },
    openProceedDialog() {
      if (this.receivedValue >= this.getTotalNetPrice && this.orderList.length > 0) {
        // const receiptItems: ReceiptItem[] = this.orderList.map(
        //   (item) =>
        //     <ReceiptItem>{
        //       ...item,
        //       productId: item.product?.id,
        //     }
        // )
        const receiptItemsShort: receiptItemsShort[] = this.orderList.map(
          (item) =>
            <receiptItemsShort>{
              name: item.product?.name,
              amount: item.amount,
              price: item.amount * item.product?.price!
            }
        )
        this.receipt = {
          createdDate: getDateNowString(),
          createdTime: getTimeNowString(),
          receivedAmount: this.receivedValue,
          totalPrice: this.getTotalOriginPrice,
          totalDiscount: this.getTotalDiscount,
          change: this.getChange,
          totalNet: this.getTotalNetPrice,
          employeeId: this.auth.getCurrentUser()?.employeeId!,
          paymentType: this.paymentType,
          receiptItems: this.orderList,
          receiptItemsShort: receiptItemsShort,
          branchId: this.auth.getCurrentUser()?.branch.id!,
          employeeName: this.auth.getCurrentUser()?.fullName
        }
        if (this.selectedPromotion) {
          this.receipt.promotion = this.selectedPromotion
          this.receipt.promotionId = this.selectedPromotion.id
        }
        if (this.usedPoint > 0) {
          this.receipt.usedPoint = this.usedPoint
        }
        if (this.selectMembership) {
          this.receipt.customer = this.selectMembership
          this.receipt.customerId = this.selectMembership.id
          this.receipt.earnPoint = this.earnPoint
          const oldPoint = this.selectMembership.point ?? 0
          this.updatedPoint = oldPoint + this.earnPoint - this.usedPoint
          this.receipt.totalPoint = this.updatedPoint
        }
        this.dialogReceipt = true
      } else {
        alert('Please check order list and receive money !')
      }
    },
    resetReceipt() {
      this.receipt = { ...defaultReceipt }
    },
    openDialogStatus(object: StatusObject) {
      this.statusObject = object
      this.isDialogStatusOpen = true
    },
    closeDialogStatus() {
      this.statusObject = null
      this.isDialogStatusOpen = false
    },
    hasLastOrder() {
      return localStorage.getItem('lastOrderItems') ? true : false
    },
    getLastOrderItems() {
      try {
        const savedItems = localStorage.getItem('lastOrderItems') as string
        this.orderList = JSON.parse(savedItems)
      } catch {
        throw new Error()
      }
    }
  }
})

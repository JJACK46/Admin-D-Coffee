import { defineStore } from 'pinia'
import { defaultReceipt, type Receipt } from '@/types/receipt'
import { nextTick, reactive, ref } from 'vue'
import { ReceiptService } from '@/services/receipt'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const useReceiptStore = defineStore('receipt', {
  state() {
    return {
      filterQuery: reactive({ month: 0, year: 0 }),
      tempItem: ref<Receipt>({ ...defaultReceipt }),
      titleDialog: ref(''),
      dialogPreview: ref(false),
      receipts: ref<Receipt[]>([]),
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Date', key: 'createdDate', sortable: false },
        { title: 'Time', key: 'createdTime', sortable: false },
        { title: 'Total Net', key: 'totalNet', sortable: false },
        { title: 'Payment Type', key: 'paymentType', sortable: false },
        { title: 'Employee', key: 'employeeName', sortable: false },
        { title: 'Branch', key: 'branchName', sortable: false }
      ],
      skipItems: ref(0),
      limitItems: ref(10)
    }
  },
  getters: {
    getTempReceiptItemsShort: (state) => state.tempItem.receiptItemsShort ?? []
  },
  actions: {
    openDialog(item: Receipt) {
      this.tempItem = item
      this.dialogPreview = true
    },
    closeDialog() {
      this.resetItem()
      this.dialogPreview = false
    },
    async fetchReceipts(skip: number, take: number) {
      this.receipts = await ReceiptService.getAll(skip, take)
    },
    async fetchFilterReceipts() {
      if (this.filterQuery.month > 0 || this.filterQuery.year > 0) {
        this.receipts = await ReceiptService.getAllWithFilter(
          this.filterQuery.year,
          this.filterQuery.month
        )
      } else {
        this.fetchReceipts(this.skipItems, this.limitItems)
      }
    },
    async deleteItem(index: number) {
      if (confirm('Are you sure to delete ?')) {
        await ReceiptService.delete(index)
        this.resetItem()
      }
      this.fetchReceipts(this.skipItems, this.limitItems)
    },
    resetItem() {
      this.tempItem = { ...defaultReceipt }
    },
    async save(item: Receipt) {
      if (item) {
        await ReceiptService.create(item)
      }
      this.fetchReceipts(this.skipItems, this.limitItems)
      this.closeDialog()
    },
    exportOnePdf(pdfRef: HTMLElement) {
      nextTick(() => {
        const input = pdfRef
        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL('image/png')
          const pdf = new jsPDF('p', 'mm', 'a5', true)
          const pdfWidth = pdf.internal.pageSize.getWidth()
          const pdfHeight = pdf.internal.pageSize.getHeight()
          const imgWidth = canvas.width
          const imgHeight = canvas.height
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
          const imgX = (pdfWidth - imgWidth * ratio) / 2
          const imgY = 0
          pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
          pdf.save(`receipt-${new Date().toISOString()}.pdf`)
        })
      })
    }
  }
})

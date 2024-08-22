import type { Invoice } from '@/views/Invoice/types/Invoice'

export type LastTransactionItem = Pick<Invoice, 'createDate' | 'id' | 'total' | 'user'>

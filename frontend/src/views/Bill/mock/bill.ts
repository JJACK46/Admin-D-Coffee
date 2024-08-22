import type { Bill } from '../types/Bill.ts'

export const mockBills: Bill[] = [
  {
    id: 1,
    name: 'Bill 1',
    date: '2024-03-12',
    worth: 100,
    status: false,
    category: 'Category 1',
    lines: [
      { id: 1, billId: 1, name: 'Item 1', price: 10 },
      { id: 2, billId: 1, name: 'Item 2', price: 20 },
      { id: 3, billId: 1, name: 'Item 3', price: 30 }
    ]
  },
  {
    id: 2,
    name: 'Bill 2',
    date: '2024-03-13',
    worth: 200,
    status: true,
    category: 'Category 2',
    lines: [
      { id: 4, billId: 2, name: 'Item 4', price: 40 },
      { id: 5, billId: 2, name: 'Item 5', price: 50 }
    ]
  },
  {
    id: 3,
    name: 'Bill 3',
    date: '2024-03-14',
    worth: 300,
    status: false,
    category: 'Category 3',
    lines: [{ id: 6, billId: 3, name: 'Item 6', price: 60 }]
  },
  {
    id: 4,
    name: 'Bill 4',
    date: '2024-03-15',
    worth: 400,
    status: true,
    category: 'Category 4',
    lines: [
      { id: 7, billId: 4, name: 'Item 7', price: 70 },
      { id: 8, billId: 4, name: 'Item 8', price: 80 },
      { id: 9, billId: 4, name: 'Item 9', price: 90 }
    ]
  },
  {
    id: 5,
    name: 'Bill 5',
    date: '2024-03-16',
    worth: 500,
    status: false,
    category: 'Category 5',
    lines: [{ id: 10, billId: 5, name: 'Item 10', price: 100 }]
  }
]

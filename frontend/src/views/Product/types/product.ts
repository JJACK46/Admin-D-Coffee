export type Product = {
  id?: number
  name: string
  price: number
  type: TypeOfProduct | undefined
  imageName: string
  category?: string
}

export const defaultProduct: Product = {
  name: '',
  price: 0,
  type: undefined,
  imageName: ''
}

export type TypeOfProduct = 'Drinks' | 'Appetizer' | 'Foods'

export const typesOfProducts: TypeOfProduct[] = ['Drinks', 'Appetizer', 'Foods']

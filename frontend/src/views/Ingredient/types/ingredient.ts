export type UnitTypes = 'Kilogram' | 'Litre'

export const defaultUnitTypes: UnitTypes[] = ['Kilogram', 'Litre']

export type Ingredient = {
  id?: number
  name: string
  unit: UnitTypes
}

export const defaultIngredient: Ingredient = {
  name: '',
  unit: 'Kilogram'
}

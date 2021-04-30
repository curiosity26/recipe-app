import { Unit } from '../../api'

export const unitLabels: Record<Unit, string> = {
  [Unit.CUP]: 'cup',
  [Unit.FLUID_CUP]: 'fl. cup',
  [Unit.OUNCE]: 'oz.',
  [Unit.FLUID_OUNCE]: 'fl. oz.',
  [Unit.GALLON]: 'gal.',
  [Unit.QUART]: 'qt.',
  [Unit.PINT]: 'pt.',
  [Unit.POUND]: 'lbs.',
  [Unit.TABLESPOON]: 'tbsp.',
  [Unit.TEASPOON]: 'tsp.',
  [Unit.DASH]: 'dash',
  [Unit.PINCH]: 'pinch',
}

export const getUnitLabel = (unit: Unit) => unitLabels[unit]

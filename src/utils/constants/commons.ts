import { Person } from '../../types/bankState'

export const DATE_PARTS_SEPARATOR = '-'

export const IMG_PATHS = {
  [Person.AGATA]: `/images/${Person.AGATA}.png`,
  [Person.KAZU]: `/images/${Person.KAZU}.png`,
}

export enum Currency {
  PLN = 'PLN',
  YEN = 'YEN',
}
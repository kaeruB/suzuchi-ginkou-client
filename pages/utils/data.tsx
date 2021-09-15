import { BankState } from './types'

export const BankStateTemporaryMock: BankState = {
  summary: {
    amount: 60000,
    borrowedBy: 'Kazu',
    borrowedFrom: 'Agata',
  },
  history: [
    {
      amount: 100,
      borrowedBy: 'Kazu',
      category: 'Sklep',
      description: 'jajka',
    },
    {
      amount: 100,
      borrowedBy: 'Kazu',
      category: 'Sklep',
      description: 'ikea stół',
    },
    {
      amount: 120,
      borrowedBy: 'Agata',
      category: 'Sklep',
      description: 'truskawki',
    },
    {
      amount: 100,
      borrowedBy: 'Kazu',
      category: 'Restauracja',
      description: 'risotto',
    },
    {
      amount: 100,
      borrowedBy: 'Kazu',
      category: 'Bilet',
      description: null,
    },
  ],
}

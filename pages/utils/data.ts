import { BankState } from './types'

export const BankStateTemporaryMock: BankState = {
  summary: {
    Kazu: 60000,
    Agata: 4
  },
  history: [
    {
      amount: 100,
      borrowedBy: 'Kazu',
      category: 'Sklep',
      description: 'jajka',
      timestamp: 1639699200000
    },
    {
      amount: 100,
      borrowedBy: 'Kazu',
      category: 'Sklep',
      description: 'ikea stół',
      timestamp: 1639699200000
    },
    {
      amount: 120,
      borrowedBy: 'Agata',
      category: 'Sklep',
      description: 'truskawki',
      timestamp: 1639699200000
    },
    {
      amount: 100,
      borrowedBy: 'Kazu',
      category: 'Restauracja',
      description: 'risotto',
      timestamp: 1639699200000
    },
    {
      amount: 100,
      borrowedBy: 'Kazu',
      category: 'Bilet',
      description: '-',
      timestamp: 1639699200000
    },
  ],
}

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
      date: '2021-12-03'
    },
    {
      amount: 100,
      borrowedBy: 'Kazu',
      category: 'Sklep',
      description: 'ikea stół',
      date: '2021-12-03'
    },
    {
      amount: 120,
      borrowedBy: 'Agata',
      category: 'Sklep',
      description: 'truskawki',
      date: '2021-12-03'
    },
    {
      amount: 100,
      borrowedBy: 'Kazu',
      category: 'Restauracja',
      description: 'risotto',
      date: '2021-12-03'
    },
    {
      amount: 100,
      borrowedBy: 'Kazu',
      category: 'Bilet',
      description: '-',
      date: '2021-12-03'
    },
  ],
}

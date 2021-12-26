import { BankState, Category, Person } from './types'

export const BankStateTemporaryMock: BankState = {
  summary: {
    Kazu: 60000,
    Agata: 4,
  },
  history: [
    {
      amount: 100,
      borrowedBy: Person.KAZU,
      category: Category.SHOPPING,
      description: 'ikea stół',
      timestamp: 1639699200000,
    },
    {
      amount: 120,
      borrowedBy: Person.AGATA,
      category: Category.SHOPPING,
      description: 'truskawki',
      timestamp: 1639699200000,
    },
    {
      amount: 100,
      borrowedBy: Person.KAZU,
      category: Category.ENTERTAINMENT,
      description: 'risotto',
      timestamp: 1639699200000,
    },
    {
      amount: 100,
      borrowedBy: Person.KAZU,
      category: Category.OTHER,
      description: '-',
      timestamp: 1639699200000,
    },
    {
      amount: 100,
      borrowedBy: Person.KAZU,
      category: Category.SHOPPING,
      description: 'jajka',
      timestamp: 1639799200000,
    },
  ],
}

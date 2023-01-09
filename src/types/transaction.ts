import { UserIdToDetails } from './user'

export enum Category {
  SHOPPING = 'Shopping',
  HOME = 'Home',
  HEALTH = 'Health',
  ENTERTAINMENT = 'Entertainment',
  OTHER = 'Other',
}

export type Transaction = {
  amount: number
  borrowedBy: string
  category: Category
  description: string
  timestamp: number
  _id?: string
  pairId?: string
}
export type Summary = { [borrowedBy: string]: number }

export type TransactionsWithUsersDetails = {
  transactions: Array<Transaction>
  summary: Summary
  usersDetails: UserIdToDetails
}

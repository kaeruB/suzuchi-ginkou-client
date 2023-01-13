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
  userWhoPaid: string
  category: Category
  description: string
  timestamp: number
  _id?: string
  pairId?: string
}
export type Summary = { [userWhoPaid: string]: number }

export type TransactionsWithUsersDetails = {
  transactions: Array<Transaction>
  summary: Summary
  usersDetails: UserIdToDetails
}

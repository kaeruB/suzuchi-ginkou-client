export type Transaction = {
  amount: number
  borrowedBy: string
  category: string
  description: string,
  date: string,
  _id?: string
}

export type BankState = {
  summary: { [borrowedBy: string]: number }
  history: Array<Transaction>
}

export enum Currency {
  PLN = 'PLN',
  YEN = 'YEN',
}

export enum RequestMethod {
  PATCH = 'PATCH',
  POST = 'POST',
  DELETE = 'DELETE',
}
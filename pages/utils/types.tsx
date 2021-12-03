export type Transaction = {
  amount: number
  borrowedBy: string
}

export type TransactionDetails = Transaction & {
  category: string
  description: string,
  date: string,
  _id?: string
}

export type BankState = {
  summary: { [borrowedBy: string]: number } //Transaction & { borrowedFrom: string }
  history: Array<TransactionDetails>
}

export enum Currency {
  PLN = 'PLN',
  YEN = 'YEN',
}

export enum RequestType {
  PATCH = 'PATCH',
  POST = 'POST',
  DELETE = 'DELETE',
}
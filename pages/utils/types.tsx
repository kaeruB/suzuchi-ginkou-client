export type Transaction = {
  amount: number
  borrowedBy: string
}

export type TransactionDetails = Transaction & {
  category: string
  description: string | null
}

export type BankState = {
  summary: Transaction & { borrowedFrom: string }
  history: Array<TransactionDetails>
}

export enum Currency {
  PLN = 'PLN',
  YEN = 'YEN',
}

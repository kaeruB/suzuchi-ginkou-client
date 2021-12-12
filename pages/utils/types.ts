export type Transaction = {
  amount: number
  borrowedBy: string
  category: string
  description: string
  date: string
  _id?: string
}

export enum Person {
  KAZU = 'Kazu',
  AGATA = 'Agata',
}

export type Summary = { [borrowedBy: string]: number }

export type BankState = {
  summary: Summary
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

export enum PopupType {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
}

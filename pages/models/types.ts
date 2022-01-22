export enum Person {
  KAZU = 'Kazu',
  AGATA = 'Agata',
}

export enum IconId {
  DELETE = 'Delete',
  EDIT = 'Edit',
  CLOSE = 'Close',
}

export enum Category {
  SHOPPING = 'Shopping',
  HOME = 'Home',
  HEALTH = 'Health',
  ENTERTAINMENT = 'Entertainment',
  OTHER = 'Other',
}

export type Transaction = {
  amount: number
  borrowedBy: Person
  category: Category
  description: string
  timestamp: number
  _id?: string
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

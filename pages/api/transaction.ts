import { DataApi } from './dataApi'
import { BankState, Transaction } from '../models/types'

export const fetchTransactions = async (url: string): Promise<BankState> => {
  const { data } = await DataApi.get(url)
  return data?.data
}

export const patchTransaction = async (
  url: string,
  body: Transaction,
): Promise<Transaction> => {
  const { data } = await DataApi.patch(url, body)
  return data?.data
}

export const postTransaction = async (
  url: string,
  body: Transaction,
): Promise<Transaction> => {
  const { data } = await DataApi.post(url, body)
  return data?.data
}

export const deleteTransaction = async (url: string): Promise<boolean> => {
  const tmp = await DataApi.delete(url)
  return tmp.status === 200
}

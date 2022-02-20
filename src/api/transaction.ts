import { DataApi } from './dataApi'
import { BankState, Transaction } from '../types/bankState'

export const fetchTransactions = async (
  url: string,
  historyListLength: number,
): Promise<BankState> => {
  const { data } = await DataApi.get(url, { params: { historyListLength } })
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

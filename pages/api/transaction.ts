import { DataApi } from './dataApi'
import { BankState, Transaction } from '../models/types'

export const fetchTransactions = async (url: string): Promise<BankState> => {
  const { data } = await DataApi.get(url)
  return data?.data
}

export const patchTransaction = async (
  url: string,
  body: string,
): Promise<Transaction> => {
  const { data } = await DataApi.patch(url, body)
  return data?.data
}

export const postTransaction = async (
  url: string,
  body: string,
): Promise<Transaction> => {
  const { data } = await DataApi.post(url, body)
  return data?.data
}

export const deleteTransaction = async (url: string): Promise<boolean> => {
  const tmp = await DataApi.delete(url)
  console.log('tmp', tmp)
  return tmp.status === 200
}

import axios, { AxiosInstance } from 'axios'
import { DEFAULT_HOSTNAME } from './env'
import { BankState, RequestMethod, Transaction } from '../models/types'

const DataApi: AxiosInstance = axios.create({
  baseURL: DEFAULT_HOSTNAME,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const fetchTransactions = async (url: string): Promise<BankState> => {
  const { data } = await DataApi.get(url)
  return data?.data
}

export const addOrUpdateTransaction = async (
  url: string,
  requestMethod: RequestMethod,
  transactionDetails: Transaction,
): Promise<Transaction> => {
  const body = JSON.stringify(transactionDetails)
  const { data } =
    requestMethod === RequestMethod.PATCH
      ? await DataApi.patch(url, body)
      : await DataApi.post(url, body)
  return data?.data
}

export const deleteTransaction = async (url: string): Promise<boolean> => {
  const { status } = await DataApi.delete(url)
  return status === 200
}

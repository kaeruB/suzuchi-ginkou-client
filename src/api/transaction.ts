import { DataApi } from './dataApi'
import { BankState, Transaction } from '../types/bankState'
import { RequestResult } from '../types/request'

export const fetchTransactions = async (
  url: string,
  historyListLength: number,
): Promise<RequestResult<BankState>> =>
  await DataApi.get(url, {
    params: { historyListLength },
  })

export const patchTransaction = async (
  url: string,
  body: Transaction,
): Promise<RequestResult<Transaction>> => await DataApi.patch(url, body)

export const postTransaction = async (
  url: string,
  body: Transaction,
): Promise<RequestResult<Transaction>> => await DataApi.post(url, body)

export const deleteTransaction = async (
  url: string,
): Promise<RequestResult<boolean>> => await DataApi.delete(url)

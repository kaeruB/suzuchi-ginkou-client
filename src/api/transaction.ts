import { DataApi } from './dataApi'
import { RequestResult } from '../types/request'
import { Transaction, TransactionsWithUsersDetails } from '../types/transaction'

export const fetchTransactions = async (
  url: string,
  historyListLength: number,
): Promise<RequestResult<TransactionsWithUsersDetails>> =>
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

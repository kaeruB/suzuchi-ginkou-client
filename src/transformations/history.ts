import { Transaction } from '../types/transaction'

export const createTimestampToTransactionsMapping = (
  historyDataDescending: Array<Transaction>,
): { [timestamp: string]: Array<Transaction> } =>
  historyDataDescending.reduce(
    (acc: { [timestamp: string]: Array<Transaction> }, t: Transaction) => {
      const timestampAsString = t.timestamp.toString()
      if (!acc[timestampAsString]) {
        acc[timestampAsString] = []
      }
      acc[timestampAsString].push(t)
      return acc
    },
    {},
  )

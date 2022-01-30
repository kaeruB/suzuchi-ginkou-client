import {Transaction} from "../models/types";

export const getDateTimestampToTransactionsArrayObject = (
    historyData: Array<Transaction>,
): { [timestamp: string]: Array<Transaction> } => {
    const historyDataDescending = historyData

    const dateTimestampToTransactions: {
        [timestamp: string]: Array<Transaction>
    } = {}
    historyDataDescending.forEach((t) => {
        const timestampAsString = t.timestamp.toString()
        if (!dateTimestampToTransactions[timestampAsString]) {
            dateTimestampToTransactions[timestampAsString] = []
        }
        dateTimestampToTransactions[timestampAsString].push(t)
    })
    return dateTimestampToTransactions
}

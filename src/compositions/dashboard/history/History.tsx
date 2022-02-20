import { FC, useEffect, useState } from 'react'
import { Transaction } from '../../../types/bankState'
import HistoryList from './HistoryList'
import {getDateTimestampToTransactionsArrayObject} from "../../../transformations/history";
import {Currency} from "../../../utils/constants/commons";

interface HistoryProps {
  historyData: Array<Transaction>
  currency: Currency
  onShowEditModal: (transactionId: string) => void
  fetchDashboardData: () => void
}

export const History: FC<HistoryProps> = (props: HistoryProps) => {
  const [splitByDateTransactions, setSplitByDateTransactions] = useState<{
    [timestamp: string]: Array<Transaction>
  } | null>(null)

  useEffect(() => {
    const dateTimestampToTransactionsObject = getDateTimestampToTransactionsArrayObject(props.historyData)
    setSplitByDateTransactions(dateTimestampToTransactionsObject)
  }, [props.historyData])

  const historyLists = () => {
    return splitByDateTransactions &&
      Object.keys(splitByDateTransactions).length > 0 ? (
      Object.keys(splitByDateTransactions).map((timestamp: string) => (
        <HistoryList
          key={timestamp}
          historyData={splitByDateTransactions[timestamp]}
          currency={props.currency}
          onShowEditModal={props.onShowEditModal}
          fetchDashboardData={props.fetchDashboardData}
        />
      ))
    ) : (
      <span>No Transactions</span>
    )
  }

  return <> {historyLists()} </>
}

export default History

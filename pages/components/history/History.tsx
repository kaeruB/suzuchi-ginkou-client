import { FC, MouseEvent, useEffect, useState } from 'react'
import { Currency, PopupType, Transaction } from '../../utils/types'
import HistoryList from './HistoryList'
import { getDateTimestampToTransactionsObject } from '../../utils/functions'

interface HistoryProps {
  historyData: Array<Transaction>
  currency: Currency
  showAddOrEditPopup: (e: MouseEvent, popupType: PopupType) => void
  fetchDashboardData: () => void
}

export const History: FC<HistoryProps> = (props: HistoryProps) => {
  const [splitByDateTransactions, setSplitByDateTransactions] = useState<{
    [timestamp: string]: Array<Transaction>
  } | null>(null)

  useEffect(() => {
    const historyDataDescending = props.historyData.reverse()
    const dateTimestampToTransactionsObject: {
      [timestamp: string]: Array<Transaction>
    } = getDateTimestampToTransactionsObject(historyDataDescending)

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
          showAddOrEditPopup={props.showAddOrEditPopup}
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

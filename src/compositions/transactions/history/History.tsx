import { FC, useEffect, useState } from 'react'
import HistoryList from './HistoryList'
import { createTimestampToTransactionsMapping } from '../../../transformations/history'
import { Currency } from '../../../utils/constants/commons'
import { UserIdToDetails } from '../../../types/user'
import { Transaction } from '../../../types/transaction'

interface HistoryProps {
  historyData: Array<Transaction>
  currency: Currency
  onShowEditModal: (transactionId: string) => void
  fetchTransactionsAndUserDetails: () => void
  userIdToDetails: UserIdToDetails
  pairId: string
}

export const History: FC<HistoryProps> = (props: HistoryProps) => {
  const [transactionsSplitByDate, setSplitByDateTransactions] = useState<{
    [timestamp: string]: Array<Transaction>
  } | null>(null)

  useEffect(() => {
    const dateTimestampToTransactionsObject =
      createTimestampToTransactionsMapping(props.historyData)
    setSplitByDateTransactions(dateTimestampToTransactionsObject)
  }, [props.historyData])

  const historyLists = () =>
    transactionsSplitByDate &&
    Object.keys(transactionsSplitByDate).length > 0 ? (
      Object.keys(transactionsSplitByDate).map((timestamp: string) => (
        <HistoryList
          key={timestamp}
          historyData={transactionsSplitByDate[timestamp]}
          currency={props.currency}
          onShowEditModal={props.onShowEditModal}
          fetchTransactionsAndUserDetails={props.fetchTransactionsAndUserDetails}
          pairId={props.pairId}
          userIdToDetails={props.userIdToDetails}
        />
      ))
    ) : (
      <span>No Transactions</span>
    )

  return <> {historyLists()} </>
}

export default History

import { useEffect, useState } from 'react'
import { URL_TRANSACTION_SUMMARY } from '../../utils/constants/endpoints'
import { fetchTransactions } from '../../api/transaction'
import { DEFAULT_HISTORY_ITEMS } from '../../api/env'
import TransactionsLayout from './TransactionsLayout'
import Loading from '../commons/loading/Loading'
import { useAuthContext } from '../../context/AuthContextWrapper'
import { RequestResult } from '../../types/request'
import { UNAUTHORIZED } from '../../utils/constants/responseStatuses'
import { TransactionsWithUsersDetails } from '../../types/transaction'

interface TransactionsProps {
  pairId: string
}

export const Transactions = (props: TransactionsProps) => {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext()
  const [transactionsAndUserDetails, setTransactionsAndUserDetails] =
    useState<TransactionsWithUsersDetails | null>(null)
  const [historyListLength, setHistoryListLength] = useState<number>(
    DEFAULT_HISTORY_ITEMS,
  )

  const fetchTransactionsAndUserDetails = async () => {
    const result: RequestResult<TransactionsWithUsersDetails> =
      await fetchTransactions(
        URL_TRANSACTION_SUMMARY(props.pairId),
        historyListLength,
      )

    if (result.error && result.error.status === UNAUTHORIZED) {
      setIsAuthenticated(false)
    } else if (result.response) {
      setTransactionsAndUserDetails(result.response.data)
    }
  }

  useEffect(() => {
    fetchTransactionsAndUserDetails()
  }, [historyListLength])

  const loadMoreData = () => {
    const newHistoryListLength = historyListLength + DEFAULT_HISTORY_ITEMS
    setHistoryListLength(newHistoryListLength)
  }

  return isAuthenticated && transactionsAndUserDetails ? (
    <TransactionsLayout
      transactionsAndUserDetails={transactionsAndUserDetails}
      fetchTransactionsAndUserDetails={fetchTransactionsAndUserDetails}
      loadMoreData={loadMoreData}
      pairId={props.pairId}
    />
  ) : (
    <Loading />
  )
}

export default Transactions

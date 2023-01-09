import { useEffect, useState, VFC } from 'react'
import { URL_TRANSACTION_SUMMARY } from '../../utils/constants/endpoints'
import { fetchTransactions } from '../../api/transaction'
import { DEFAULT_HISTORY_ITEMS } from '../../api/env'
import DashboardLayout from './DashboardLayout'
import LoadingPage from '../loading/LoadingPage'
import { useAuthContext } from '../../context/AuthContextWrapper'
import { RequestResult } from '../../types/request'
import { UNAUTHORIZED } from '../../utils/constants/responseStatuses'
import { usePairContext } from '../../context/PairContextWrapper'
import { TransactionsWithUsersDetails } from '../../types/transaction'

export const Dashboard: VFC = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext()
  const { pairId } = usePairContext()
  const [dashboardData, setDashboardData] =
    useState<TransactionsWithUsersDetails | null>(null)
  const [historyListLength, setHistoryListLength] = useState<number>(
    DEFAULT_HISTORY_ITEMS,
  )

  const fetchDashboardData = async () => {
    const result: RequestResult<TransactionsWithUsersDetails> =
      await fetchTransactions(
        URL_TRANSACTION_SUMMARY(pairId),
        historyListLength,
      )

    if (result.error && result.error.status === UNAUTHORIZED) {
      setIsAuthenticated(false)
    } else if (result.response) {
      setDashboardData(result.response.data)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [historyListLength])

  const loadMoreData = () => {
    const newHistoryListLength = historyListLength + DEFAULT_HISTORY_ITEMS
    setHistoryListLength(newHistoryListLength)
  }

  // isAuthenticated
  return dashboardData ? (
    <DashboardLayout
      dashboardData={dashboardData}
      fetchDashboardData={fetchDashboardData}
      loadMoreData={loadMoreData}
      pairId={pairId}
    />
  ) : (
    <LoadingPage />
  )
}

export default Dashboard

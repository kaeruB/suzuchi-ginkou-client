import { useEffect, useState, VFC } from 'react'
import { BankState } from '../../types/bankState'
import { URL_TRANSACTION_SUMMARY } from '../../utils/constants/endpoints'
import { fetchTransactions } from '../../api/transaction'
import { DEFAULT_HISTORY_ITEMS } from '../../api/env'
import DashboardLayout from './DashboardLayout'
import LoadingPage from '../loading/LoadingPage'
import { useAuthContext } from '../../context/AuthContextWrapper'
import { RequestResult } from '../../types/request'
import { UNAUTHORIZED } from '../../utils/constants/responseStatuses'

export const Dashboard: VFC = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext()
  const [dashboardData, setDashboardData] = useState<BankState | null>(null)
  const [historyListLength, setHistoryListLength] = useState<number>(
    DEFAULT_HISTORY_ITEMS,
  )

  const fetchDashboardData = async () => {
    const result: RequestResult<BankState> = await fetchTransactions(
      URL_TRANSACTION_SUMMARY,
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

  return isAuthenticated && dashboardData ? (
    <DashboardLayout
      dashboardData={dashboardData}
      fetchDashboardData={fetchDashboardData}
      loadMoreData={loadMoreData}
    />
  ) : (
    <LoadingPage />
  )
}

export default Dashboard

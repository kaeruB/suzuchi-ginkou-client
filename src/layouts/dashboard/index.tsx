import { VFC, useEffect, useState } from 'react'
import { BankState } from '../../types/bankState'
import { URL_TRANSACTION_SUMMARY } from '../../utils/constants/endpoints'
import { fetchTransactions } from '../../api/transaction'
import { DEFAULT_HISTORY_ITEMS } from '../../api/env'
import DashboardLayout from './DashboardLayout'

export const Dashboard: VFC = () => {
  const [dashboardData, setDashboardData] = useState<BankState | null>(null)
  const [historyListLength, setHistoryListLength] = useState<number>(
    DEFAULT_HISTORY_ITEMS,
  )

  const fetchDashboardData = async () => {
    const responseData = await fetchTransactions(
      URL_TRANSACTION_SUMMARY,
      historyListLength,
    )
    responseData && setDashboardData(responseData)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [historyListLength])

  const loadMoreData = () => {
    const newHistoryListLength = historyListLength + DEFAULT_HISTORY_ITEMS
    setHistoryListLength(newHistoryListLength)
  }

  return dashboardData ? (
    <DashboardLayout
      dashboardData={dashboardData}
      fetchDashboardData={fetchDashboardData}
      loadMoreData={loadMoreData}
    />
  ) : (
    <h2>Loading...</h2>
  )
}

export default Dashboard

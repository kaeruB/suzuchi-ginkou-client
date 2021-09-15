import { useEffect, useState, VFC } from 'react'
import { BankState, Currency } from './utils/types'
import { BankStateTemporaryMock } from './utils/data'
import { numberWithSpaces } from './utils/functions'

export const Dashboard: VFC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dashboardData, setDashboardData] = useState<BankState | null>(null)
  const [currency, setCurrency] = useState<Currency>(Currency.PLN)

  useEffect(() => {
    async function fetchDashboardData() {
      // TODO fetch BankState from API, write request
      // const response = await fetch('http://localhost:3005')
      // const data = await response.json()
      setDashboardData(BankStateTemporaryMock)
      setIsLoading(false)
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return dashboardData ? (
    <div>
      <h2>
        {dashboardData.summary.borrowedBy} should return{' '}
        {numberWithSpaces(dashboardData.summary.amount)} {currency} to{' '}
        {dashboardData.summary.borrowedFrom}.
      </h2>
      <div>
        <h4>New transaction</h4>
        Borrowed By Amount Category Description
      </div>
    </div>
  ) : null
}

export default Dashboard

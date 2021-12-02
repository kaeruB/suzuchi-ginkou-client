import { SyntheticEvent, useEffect, useState, VFC } from 'react'
import { BankState, Currency, TransactionDetails } from './utils/types'
import { BankStateTemporaryMock } from './utils/data'
import {getCurrentDate, numberWithSpaces} from './utils/functions'

export const Dashboard: VFC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dashboardData, setDashboardData] = useState<BankState | null>(null)
  const [currency, setCurrency] = useState<Currency>(Currency.PLN)

  async function addTransaction(event: SyntheticEvent) {
    event.preventDefault()
    const eventTarget: EventTarget | any = event.target
    const body = JSON.stringify({
      amount: eventTarget.amount.value,
      borrowedBy: eventTarget.borrowedBy.value,
      category: eventTarget.category.value,
      description: eventTarget.description.value,
      date: eventTarget.date.value
    })

    const res = await fetch('http://localhost:3005/api/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    const result = await res.json()
  }

  useEffect(() => {
    async function fetchDashboardData() {
      const response = await fetch(
        'http://localhost:3005/api/v1/transactions/summary',
      )
      const data = await response.json()

      if (data && data.data) {
        setDashboardData(data.data)
      } else {
        setDashboardData(BankStateTemporaryMock)
      }
      setIsLoading(false)
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return dashboardData ? (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {Object.keys(dashboardData.summary).map((borrowedBy: string) => (
          <div key={borrowedBy}>
            {numberWithSpaces(dashboardData.summary[borrowedBy])} {currency}{' '}
            borrowed by {borrowedBy}
          </div>
        ))}
      </div>
      <div>
        <h1>Past Transactions:</h1>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {dashboardData.history.map(
            (history: TransactionDetails, i: number) => (
              <div key={i}>
                {numberWithSpaces(history.amount)} {currency} borrowed by{' '}
                {history.borrowedBy}. {history.category}, {history.description} on {history.date}
              </div>
            ),
          )}
        </div>
      </div>
      <div>
        <h4>New transaction</h4>

        <form onSubmit={addTransaction}>
          <label htmlFor="borrowedBy">Borrowed By:</label>
          <input
            type="text"
            id="borrowedBy"
            autoComplete="borrowedBy"
            name="borrowedBy"
            required
          />

          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            autoComplete="amount"
            name="amount"
            required
          />

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            autoComplete="category"
            name="category"
            required
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            autoComplete="description"
            name="description"
            required
          />

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={getCurrentDate()}
            autoComplete="date"
          />

          <button type="submit">Add Transaction</button>
        </form>
      </div>
    </div>
  ) : null
}

export default Dashboard

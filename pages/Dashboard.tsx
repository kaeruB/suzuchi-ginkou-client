import { FC, MouseEvent, SyntheticEvent, useEffect, useState } from 'react'
import {
  BankState,
  Currency,
  RequestMethod,
  Transaction,
} from './utils/types'
import { BankStateTemporaryMock } from './utils/data'
import { numberWithSpaces } from './utils/functions'
import CreateTransactionForm from './components/CreateOrUpdateTransactionForm'

// TODO https://stackoverflow.com/questions/51791163/warning-prop-classname-did-not-match-when-using-styled-components-with-seman

export const Dashboard: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dashboardData, setDashboardData] = useState<BankState | null>(null)
  const [currency, setCurrency] = useState<Currency>(Currency.PLN)
  const [isTransactionInUpdateMode, setIsTransactionInUpdateMode] = useState<
    string | null
  >(null)

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

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const toggleUpdateMode = (e?: MouseEvent) => {
    if (isTransactionInUpdateMode) {
      setIsTransactionInUpdateMode(null)
    } else {
      const transactionId = (e?.target as HTMLButtonElement).id
      setIsTransactionInUpdateMode(transactionId)
    }
  }

  async function removeTransaction(event: SyntheticEvent) {
    event.preventDefault()

    const transactionId = (event?.target as HTMLButtonElement).id
    const res = await fetch(
      `http://localhost:3005/api/v1/transactions/${transactionId}`,
      {
        method: RequestMethod.DELETE,
      },
    )

    const result = await res.json()
    if (result) {
      fetchDashboardData()
    }
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  const renderHistoryItem = (historyItem: Transaction) => {
    return isTransactionInUpdateMode === historyItem._id ? (
      <CreateTransactionForm
        requestMethod={RequestMethod.PATCH}
        defaultValues={historyItem}
        toggleUpdateMode={toggleUpdateMode}
        key={historyItem._id}
        fetchDashboardData={fetchDashboardData}
      />
    ) : (
      <div key={historyItem._id}>
        <div>
          {numberWithSpaces(historyItem.amount)} {currency} borrowed by{' '}
          {historyItem.borrowedBy}. {historyItem.category},{' '}
          {historyItem.description} on {historyItem.date}
        </div>
        <button
          id={historyItem._id}
          onClick={(e: MouseEvent) => toggleUpdateMode(e)}
        >
          Edit
        </button>
        <button
          id={historyItem._id}
          onClick={(e: MouseEvent) => removeTransaction(e)}
        >
          Remove
        </button>
      </div>
    )
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
          {dashboardData.history.map((history: Transaction) =>
            renderHistoryItem(history),
          )}
        </div>
      </div>
      <CreateTransactionForm
        requestMethod={RequestMethod.POST}
        fetchDashboardData={fetchDashboardData}
      />
    </div>
  ) : null
}

export default Dashboard

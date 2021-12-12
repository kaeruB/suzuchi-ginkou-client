import { FC, MouseEvent, useEffect } from 'react'
import { Currency, PopupType, Transaction } from '../../utils/types'
import HistoryList from './HistoryList'

interface HistoryProps {
  historyData: Array<Transaction>
  currency: Currency
  showAddOrEditPopup: (e: MouseEvent, popupType: PopupType) => void
  fetchDashboardData: () => void
}

export const History: FC<HistoryProps> = (props: HistoryProps) => {
  useEffect(() => {
  }, [props.historyData])

  return (
    <>
      <HistoryList
        historyData={props.historyData}
        currency={props.currency}
        showAddOrEditPopup={props.showAddOrEditPopup}
        fetchDashboardData={props.fetchDashboardData}
      />
    </>
  )
}

export default History

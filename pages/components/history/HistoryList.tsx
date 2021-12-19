import { MouseEvent, VFC } from 'react'
import styled from 'styled-components'
import { Currency, PopupType, Transaction } from '../../utils/types'
import HistoryListItem from './HistoryListItem'
import { FONT_SIZE_PRIMARY } from '../../utils/styles/constants/fontSizes'
import { convertTimestampToDateString } from '../../utils/functions'

interface HistoryListProps {
  historyData: Array<Transaction>
  currency: Currency
  showAddOrEditPopup: (e: MouseEvent, popupType: PopupType) => void
  fetchDashboardData: () => void
}

export const HistoryList: VFC<HistoryListProps> = (props: HistoryListProps) => {
  const renderHistoryListItem = (transactionData: Transaction) => {
    return (
      <HistoryListItem
        transactionData={transactionData}
        key={transactionData._id}
        currency={props.currency}
        showAddOrEditPopup={props.showAddOrEditPopup}
        fetchDashboardData={props.fetchDashboardData}
      />
    )
  }

  return (
    <>
      <DateHeader>
        {convertTimestampToDateString(props.historyData[0].timestamp)}
      </DateHeader>
      <HistoryListItemsWrapper>
        {props.historyData.map((historyData: Transaction) =>
          renderHistoryListItem(historyData),
        )}
      </HistoryListItemsWrapper>
    </>
  )
}

const DateHeader = styled.span`
  font-size: ${FONT_SIZE_PRIMARY};
`

const HistoryListItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3rem;
`

export default HistoryList

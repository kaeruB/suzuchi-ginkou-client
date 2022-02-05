import { VFC } from 'react'
import styled from 'styled-components'
import { Transaction } from '../../../types/bankState'
import HistoryListItem from './HistoryListItem'
import { FONT_SIZE_PRIMARY } from '../../../../styles/constants/fontSizes'
import { convertTimestampToDateString } from '../../../utils/functions/commons'
import {Currency} from "../../../utils/constants/commons";

interface HistoryListProps {
  historyData: Array<Transaction>
  currency: Currency
  onShowEditModal: (transactionId: string) => void
  fetchDashboardData: () => void
}

export const HistoryList: VFC<HistoryListProps> = (props: HistoryListProps) => {
  const renderHistoryListItem = (transactionData: Transaction) => {
    return (
      <HistoryListItem
        transactionData={transactionData}
        key={transactionData._id}
        currency={props.currency}
        onShowEditModal={props.onShowEditModal}
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
  max-width: 60rem;
`

export default HistoryList

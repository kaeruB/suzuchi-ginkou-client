import { VFC } from 'react'
import styled from 'styled-components'
import HistoryListItem from './HistoryListItem'
import { FONT_SIZE_PRIMARY } from '../../../../styles/constants/fontSizes'
import { convertTimestampToDateString } from '../../../utils/functions/commons'
import { Currency } from '../../../utils/constants/commons'
import { UserEmailToDetails } from '../../../types/user'
import { Transaction } from '../../../types/transaction'

interface HistoryListProps {
  historyData: Array<Transaction>
  currency: Currency
  onShowEditModal: (transactionId: string) => void
  fetchTransactionsAndUserDetails: () => void
  userEmailToDetails: UserEmailToDetails
  pairId: string
}

export const HistoryList: VFC<HistoryListProps> = (props: HistoryListProps) => {
  const renderHistoryListItem = (transactionData: Transaction) => {
    return (
      <HistoryListItem
        transactionData={transactionData}
        key={transactionData._id}
        currency={props.currency}
        onShowEditModal={props.onShowEditModal}
        fetchTransactionsAndUserDetails={props.fetchTransactionsAndUserDetails}
        pairId={props.pairId}
        userEmailToDetails={props.userEmailToDetails}
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

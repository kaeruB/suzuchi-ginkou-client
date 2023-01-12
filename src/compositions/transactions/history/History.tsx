import { FC, useEffect, useState } from 'react'
import HistoryList from './HistoryList'
import { createTimestampToTransactionsMapping } from '../../../transformations/history'
import { Currency } from '../../../utils/constants/commons'
import { UserIdToDetails } from '../../../types/user'
import { Transaction } from '../../../types/transaction'
import styled from "styled-components";
import {FONT_SIZE_HEADER_TERTIARY} from "../../../../styles/constants/fontSizes";
import {COLOR_FONT_SECONDARY} from "../../../../styles/constants/colors";

interface HistoryProps {
  historyData: Array<Transaction>
  currency: Currency
  onShowEditModal: (transactionId: string) => void
  fetchTransactionsAndUserDetails: () => void
  userIdToDetails: UserIdToDetails
  pairId: string
}

export const History: FC<HistoryProps> = (props: HistoryProps) => {
  const [transactionsSplitByDate, setSplitByDateTransactions] = useState<{
    [timestamp: string]: Array<Transaction>
  } | null>(null)

  useEffect(() => {
    const dateTimestampToTransactionsObject =
      createTimestampToTransactionsMapping(props.historyData)
    setSplitByDateTransactions(dateTimestampToTransactionsObject)
  }, [props.historyData])

  const historyLists = () =>
    transactionsSplitByDate &&
    Object.keys(transactionsSplitByDate).length > 0 ? (
      Object.keys(transactionsSplitByDate).map((timestamp: string) => (
        <HistoryList
          key={timestamp}
          historyData={transactionsSplitByDate[timestamp]}
          currency={props.currency}
          onShowEditModal={props.onShowEditModal}
          fetchTransactionsAndUserDetails={props.fetchTransactionsAndUserDetails}
          pairId={props.pairId}
          userIdToDetails={props.userIdToDetails}
        />
      ))
    ) : (
      <NoTransactionsInfo>No transactions found</NoTransactionsInfo>
    )

  return <> {historyLists()} </>
}

const NoTransactionsInfo = styled.div`
  font-size: ${FONT_SIZE_HEADER_TERTIARY};
  color: ${COLOR_FONT_SECONDARY};
  margin-top: 3rem;
`

export default History

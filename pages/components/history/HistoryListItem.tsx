import { MouseEvent, SyntheticEvent, useEffect, useState, VFC } from 'react'
import styled from 'styled-components'
import {
  Category,
  Currency,
  IconId,
  Person,
  Transaction,
} from '../../models/types'
import RoundPicture from '../common/RoundPicture'
import { IMG_PATHS } from '../../utils/constants/commons'
import { IconFactory } from '../IconFactory'
import { URL_TRANSACTION_PATCH } from '../../utils/constants/endpoints'
import { formatNumberWithSpaces } from '../../utils/functions/commons'
import { deleteTransaction } from '../../api/transaction'

interface HistoryListItemProps {
  transactionData: Transaction
  currency: Currency
  onShowEditModal: (transactionId: string) => void
  fetchDashboardData: () => void
}

export const HistoryListItem: VFC<HistoryListItemProps> = (
  props: HistoryListItemProps,
) => {
  const [personWhoPaid, setPersonWhoPaid] = useState<Person>(Person.KAZU)

  useEffect(() => {
    setPersonWhoPaid(
      props.transactionData.borrowedBy === Person.KAZU
        ? Person.KAZU
        : Person.AGATA,
    )
  }, [props.transactionData])

  return (
    <HistoryListItemElement>
      <HistoryListItemLeftContainer
        personWhoPaid={personWhoPaid}
        category={props.transactionData.category}
        description={props.transactionData.description}
      />
      <HistoryListItemRightContainer
        amount={props.transactionData.amount}
        currency={props.currency}
        transactionId={props.transactionData._id!}
        onShowEditModal={props.onShowEditModal}
        fetchDashboardData={props.fetchDashboardData}
      />
    </HistoryListItemElement>
  )
}

interface HistoryListItemLeftContainerProps {
  personWhoPaid: Person
  category: Category
  description: string
}

const HistoryListItemLeftContainer: VFC<HistoryListItemLeftContainerProps> = (
  props: HistoryListItemLeftContainerProps,
) => {
  return (
    <LeftContainer>
      <PhotoAndCategoryWrapper>
        <RoundPicture
          size={4}
          src={IMG_PATHS[props.personWhoPaid]}
          alt={props.personWhoPaid}
        />
        <CategoryWrapper>
          <IconFactory size={2} iconId={props.category} />
        </CategoryWrapper>
      </PhotoAndCategoryWrapper>

      {props.description}
    </LeftContainer>
  )
}

interface HistoryListItemRightContainerProps {
  transactionId: string
  amount: number
  currency: Currency
  onShowEditModal: (transactionId: string) => void
  fetchDashboardData: () => void
}

const HistoryListItemRightContainer: VFC<HistoryListItemRightContainerProps> = (
  props: HistoryListItemRightContainerProps,
) => {
  const deleteTransactionOnClick = async (
    event: SyntheticEvent,
    transactionId: string,
  ) => {
    event.preventDefault()
    const result = await deleteTransaction(URL_TRANSACTION_PATCH(transactionId))
    if (result) {
      props.fetchDashboardData()
    }
  }

  return (
    <RightContainer>
      <span>
        {formatNumberWithSpaces(props.amount)} {props.currency}
      </span>
      <IconButton
        id={props.transactionId}
        onClick={() => props.onShowEditModal(props.transactionId)}
      >
        <IconFactory iconId={IconId.EDIT} size={2} />
      </IconButton>
      <IconButton
        id={props.transactionId}
        onClick={(e: MouseEvent) =>
          deleteTransactionOnClick(e, props.transactionId!)
        }
      >
        <IconFactory iconId={IconId.DELETE} size={2} />
      </IconButton>
    </RightContainer>
  )
}

const HistoryListItemElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 60rem;
`

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`

const PhotoAndCategoryWrapper = styled.div`
  margin: 1rem;
  position: relative;
`

const CategoryWrapper = styled.div`
  position: absolute;
  bottom: -4px;
  right: -7px;
`

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`

const IconButton = styled.button`
  width: 20px;
  background: none;
  border: none;
  margin: 0 5px;
  cursor: pointer;
`

export default HistoryListItem

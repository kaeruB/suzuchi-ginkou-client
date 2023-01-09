import { MouseEvent, SyntheticEvent, useEffect, useState, VFC } from 'react'
import styled from 'styled-components'
import RoundPicture from '../../commons/RoundPicture'
import { Currency, IMG_PATHS } from '../../../utils/constants/commons'
import { IconFactory } from '../../commons/IconFactory'
import { URL_TRANSACTION_PATCH_OR_DELETE } from '../../../utils/constants/endpoints'
import { formatNumberWithSpaces } from '../../../utils/functions/commons'
import { deleteTransaction } from '../../../api/transaction'
import { IconId } from '../../../types/icon'
import { RequestResult } from '../../../types/request'
import {
  SUCCESS,
  UNAUTHORIZED,
} from '../../../utils/constants/responseStatuses'
import { useAuthContext } from '../../../context/AuthContextWrapper'
import { UserDetails, UserIdToDetails } from '../../../types/user'
import { Category, Transaction } from '../../../types/transaction'

interface HistoryListItemProps {
  transactionData: Transaction
  currency: Currency
  onShowEditModal: (transactionId: string) => void
  fetchDashboardData: () => void
  userIdToDetails: UserIdToDetails
  pairId: string
}

export const HistoryListItem: VFC<HistoryListItemProps> = (
  props: HistoryListItemProps,
) => {
  const [personWhoBorrowed, setPersonWhoBorrowed] =
    useState<UserDetails | null>(null)

  useEffect(() => {
    const personWhoBorrowed: UserDetails =
      props.userIdToDetails[props.transactionData.borrowedBy]

    setPersonWhoBorrowed(personWhoBorrowed)
  }, [props.transactionData])

  return (
    personWhoBorrowed && (
      <HistoryListItemElement>
        <HistoryListItemLeftContainer
          personWhoBorrowed={personWhoBorrowed}
          category={props.transactionData.category}
          description={props.transactionData.description}
        />
        <HistoryListItemRightContainer
          amount={props.transactionData.amount}
          currency={props.currency}
          transactionId={props.transactionData._id!}
          onShowEditModal={props.onShowEditModal}
          fetchDashboardData={props.fetchDashboardData}
          pairId={props.pairId}
        />
      </HistoryListItemElement>
    )
  )
}

interface HistoryListItemLeftContainerProps {
  personWhoBorrowed: UserDetails
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
          src={IMG_PATHS(props.personWhoBorrowed.avatar)}
          alt={props.personWhoBorrowed.name}
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
  pairId: string
}

const HistoryListItemRightContainer: VFC<HistoryListItemRightContainerProps> = (
  props: HistoryListItemRightContainerProps,
) => {
  const { setIsAuthenticated } = useAuthContext()

  const afterResponseReceived = (result: RequestResult<boolean>) => {
    if (result.error && result.error?.status === UNAUTHORIZED) {
      setIsAuthenticated(false)
    } else if (result.response && result.response.status === SUCCESS) {
      props.fetchDashboardData()
    }
  }

  const deleteTransactionOnClick = async (
    event: SyntheticEvent,
    transactionId: string,
  ) => {
    event.preventDefault()
    const result: RequestResult<boolean> = await deleteTransaction(
      URL_TRANSACTION_PATCH_OR_DELETE(props.pairId, transactionId),
    )
    afterResponseReceived(result)
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

import { useEffect, useState } from 'react'
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
import { UserDetails, UserEmailToDetails } from '../../../types/user'
import { Category, Transaction } from '../../../types/transaction'

interface HistoryListItemProps {
  transactionData: Transaction
  currency: Currency
  onShowEditModal: (transactionId: string) => void
  fetchTransactionsAndUserDetails: () => void
  userEmailToDetails: UserEmailToDetails
  pairId: string
}

export const HistoryListItem = (props: HistoryListItemProps) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

  useEffect(() => {
    const userDetails: UserDetails =
      props.userEmailToDetails[props.transactionData.userWhoPaid]

    setUserDetails(userDetails)
  }, [props.transactionData, props.userEmailToDetails])

  return (
    userDetails && (
      <HistoryListItemElement>
        <HistoryListItemLeftContainer
          userDetails={userDetails}
          category={props.transactionData.category}
          description={props.transactionData.description}
        />
        <HistoryListItemRightContainer
          amount={props.transactionData.amount}
          currency={props.currency}
          transactionId={props.transactionData._id!}
          onShowEditModal={props.onShowEditModal}
          fetchTransactionsAndUserDetails={
            props.fetchTransactionsAndUserDetails
          }
          pairId={props.pairId}
        />
      </HistoryListItemElement>
    )
  )
}

interface HistoryListItemLeftContainerProps {
  userDetails: UserDetails
  category: Category
  description: string
}

const HistoryListItemLeftContainer = (
  props: HistoryListItemLeftContainerProps,
) => {
  return (
    <LeftContainer>
      <PhotoAndCategoryWrapper>
        <RoundPicture
          size={4}
          src={IMG_PATHS(props.userDetails.avatar)}
          alt={props.userDetails.name}
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
  fetchTransactionsAndUserDetails: () => void
  pairId: string
}

const HistoryListItemRightContainer = (
  props: HistoryListItemRightContainerProps,
) => {
  const { setIsAuthenticated } = useAuthContext()

  const afterResponseReceived = (result: RequestResult<boolean>) => {
    if (result.error && result.error?.status === UNAUTHORIZED) {
      setIsAuthenticated(false)
    } else if (result.response && result.response.status === SUCCESS) {
      props.fetchTransactionsAndUserDetails()
    }
  }

  const deleteTransactionIfConfirmed = async (transactionId: string) => {
    const isDeleteConfirmed = window.confirm(
      'Are you sure you want to delete this transaction?',
    )

    if (isDeleteConfirmed) {
      const result: RequestResult<boolean> = await deleteTransaction(
        URL_TRANSACTION_PATCH_OR_DELETE(props.pairId, transactionId),
      )
      afterResponseReceived(result)
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
        onClick={() => deleteTransactionIfConfirmed(props.transactionId!)}
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

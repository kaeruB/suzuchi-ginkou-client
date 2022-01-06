import { MouseEvent, SyntheticEvent, useEffect, useState, VFC } from 'react'
import styled from 'styled-components'
import {
  Category,
  Currency,
  IconId,
  Person,
  PopupType,
  RequestMethod,
  Transaction,
} from '../../utils/types'
import RoundPicture from '../common/RoundPicture'
import { IMG_PATHS } from '../../utils/constants'
import { IconFactory } from '../IconFactory'
import {
  getUrl,
  LOCALHOST,
  URL_MODIFY_TRANSACTION,
} from '../../utils/endpoints'
import { formatNumberWithSpaces } from '../../utils/functions'

interface HistoryListItemProps {
  transactionData: Transaction
  currency: Currency
  showAddOrEditPopup: (
    e: MouseEvent,
    popupType: PopupType,
    transactionId: string,
  ) => void
  fetchDashboardData: () => void
}

interface HistoryListItemLeftContainerProps {
  personWhoPaid: Person
  category: Category
  description: string
}

interface HistoryListItemRightContainerProps {
  transactionId: string
  amount: number
  currency: Currency
  showAddOrEditPopup: (
    e: MouseEvent,
    popupType: PopupType,
    transactionId: string,
  ) => void
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
        showAddOrEditPopup={props.showAddOrEditPopup}
        fetchDashboardData={props.fetchDashboardData}
      />
    </HistoryListItemElement>
  )
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

const HistoryListItemRightContainer: VFC<HistoryListItemRightContainerProps> = (
  props: HistoryListItemRightContainerProps,
) => {
  async function deleteTransaction(
    event: SyntheticEvent,
    transactionId: string,
  ) {
    event.preventDefault()

    const res = await fetch(
      getUrl(LOCALHOST, URL_MODIFY_TRANSACTION(transactionId)),
      {
        method: RequestMethod.DELETE,
      },
    )

    const result = await res.json()
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
        onClick={(e: MouseEvent) =>
          props.showAddOrEditPopup(e, PopupType.UPDATE, props.transactionId!)
        }
      >
        <IconFactory iconId={IconId.EDIT} size={2} />
      </IconButton>
      <IconButton
        id={props.transactionId}
        onClick={(e: MouseEvent) => deleteTransaction(e, props.transactionId!)}
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

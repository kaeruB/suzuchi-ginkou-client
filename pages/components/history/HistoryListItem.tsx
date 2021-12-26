import { MouseEvent, SyntheticEvent, useEffect, useState, VFC } from 'react'
import styled from 'styled-components'
import {
  Currency,
  IconId,
  Person,
  PopupType,
  RequestMethod,
  Transaction,
} from '../../utils/types'
import RoundPicture from '../common/RoundPicture'
import { formatNumberWithSpaces } from '../../utils/functions'
import {
  getUrl,
  LOCALHOST,
  URL_MODIFY_TRANSACTION,
} from '../../utils/endpoints'
import { IMG_PATHS } from '../../utils/constants'
import { IconFactory } from '../IconFactory'

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
    <HistoryListItemElement>
      <LeftContainer>
        <PhotoAndCategoryWrapper>
          <RoundPicture
            size={4}
            src={IMG_PATHS[personWhoPaid]}
            alt={personWhoPaid}
          />
          <CategoryWrapper>
            <IconFactory size={2} iconId={props.transactionData.category} />
          </CategoryWrapper>
        </PhotoAndCategoryWrapper>

        {props.transactionData.description}
      </LeftContainer>
      <RightContainer>
        <MoneyAmount>
          {formatNumberWithSpaces(props.transactionData.amount)}{' '}
          {props.currency}
        </MoneyAmount>
        <IconButton
          id={props.transactionData._id}
          onClick={(e: MouseEvent) =>
            props.showAddOrEditPopup(
              e,
              PopupType.UPDATE,
              props.transactionData._id!,
            )
          }
        >
          <IconFactory iconId={IconId.EDIT} size={2} />
        </IconButton>
        <IconButton
          id={props.transactionData._id}
          onClick={(e: MouseEvent) =>
            deleteTransaction(e, props.transactionData._id!)
          }
        >
          <IconFactory iconId={IconId.DELETE} size={2} />
        </IconButton>
      </RightContainer>
    </HistoryListItemElement>
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

const RightContainer = styled.div`
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

const IconButton = styled.button`
  width: 20px;
  background: none;
  border: none;
  margin: 0 5px;
  cursor: pointer;
`

const MoneyAmount = styled.span``

export default HistoryListItem

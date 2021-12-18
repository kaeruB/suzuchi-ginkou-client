import { MouseEvent, SyntheticEvent, useEffect, useState, VFC } from 'react'
import styled from 'styled-components'
import {
  PopupType,
  Currency,
  Person,
  Transaction,
  RequestMethod,
} from '../../utils/types'
import RoundPicture from '../common/RoundPicture'
import { numberWithSpaces } from '../../utils/functions'
import {
  getUrl,
  LOCALHOST,
  URL_MODIFY_TRANSACTION,
} from '../../utils/endpoints'

interface HistoryListItemProps {
  transactionData: Transaction
  currency: Currency
  showAddOrEditPopup: (e: MouseEvent, popupType: PopupType) => void
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

  async function deleteTransaction(event: SyntheticEvent) {
    event.preventDefault()

    const transactionId = (event?.target as HTMLButtonElement).id
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
          <RoundPicture size={3} person={personWhoPaid} />
        </PhotoAndCategoryWrapper>

        {props.transactionData.description}
      </LeftContainer>
      <RightContainer>
        <MoneyAmount>
          {numberWithSpaces(props.transactionData.amount)} {props.currency}
        </MoneyAmount>
        <EditButton
          id={props.transactionData._id}
          onClick={(e: MouseEvent) =>
            props.showAddOrEditPopup(e, PopupType.UPDATE)
          }
        >
          Edit
        </EditButton>
        <DeleteButton
          id={props.transactionData._id}
          onClick={(e: MouseEvent) => deleteTransaction(e)}
        >
          Delete
        </DeleteButton>
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

const RightContainer = styled.div``

const PhotoAndCategoryWrapper = styled.div`
  margin: 1rem;
`

const EditButton = styled.button``

const DeleteButton = styled.button``

const MoneyAmount = styled.span``

export default HistoryListItem

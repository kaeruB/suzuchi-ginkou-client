import { SyntheticEvent, useState, VFC } from 'react'
import {
  convertDateToTimestamp,
  convertTimestampToDateString,
  getCurrentDate,
} from '../utils/functions/commons'
import { Category, Person, RequestMethod, Transaction } from '../models/types'
import styled from 'styled-components'
import { FONT_SIZE_PRIMARY } from '../styles/constants/fontSizes'
import { CustomButton } from '../styles/components/button'
import {
  URL_TRANSACTION_PATCH,
  URL_TRANSACTION_POST,
} from '../utils/constants/endpoints'
import RoundPicture from './common/RoundPicture'
import { COLOR_MEDIUM } from '../styles/constants/colors'
import { IMG_PATHS } from '../utils/constants/commons'
import { IconFactory } from './IconFactory'
import { patchTransaction, postTransaction } from '../api/transaction'

interface TransactionFormProps {
  requestMethod: RequestMethod
  defaultValues: Transaction | null
  fetchDashboardData: () => void
  setShowModal: (show: boolean) => void
}

export const TransactionForm: VFC<TransactionFormProps> = (
  props: TransactionFormProps,
) => {
  const [selectedPerson, setSelectedPerson] = useState<Person>(
    props.defaultValues ? props.defaultValues.borrowedBy : Person.AGATA,
  )
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    props.defaultValues ? props.defaultValues.category : Category.SHOPPING,
  )

  const createRequestBody = (event: SyntheticEvent) => {
    event.preventDefault()
    const eventTarget: EventTarget | any = event.target
    const timestamp = convertDateToTimestamp(eventTarget.date.value)

    const transactionDetails: Transaction = {
      amount: parseInt(eventTarget.amount.value),
      borrowedBy: selectedPerson,
      category: selectedCategory,
      description: eventTarget.description.value,
      timestamp,
    }
    return JSON.stringify(transactionDetails)
  }

  const afterSubmit = (result: Transaction) => {
    if (result) {
      props.fetchDashboardData()
      props.setShowModal(false)
    }
  }

  async function patchTransactionOnSubmit(event: SyntheticEvent) {
    const body = createRequestBody(event)
    const transactionId = (props.defaultValues && props.defaultValues._id) || ''
    const url = URL_TRANSACTION_PATCH(transactionId)
    const result = await patchTransaction(url, body)
    afterSubmit(result)
  }

  async function postTransactionOnSubmit(event: SyntheticEvent) {
    const body = createRequestBody(event)
    const result = await postTransaction(URL_TRANSACTION_POST, body)
    afterSubmit(result)
  }

  const renderCategoryButton = (category: Category) => {
    return (
      <FormButton
        onClick={() => setSelectedCategory(category)}
        isActive={selectedCategory === category}
        type={'button'}
      >
        <IconFactory size={4} iconId={category} />
      </FormButton>
    )
  }

  const renderPersonButton = (person: Person) => {
    return (
      <FormButton
        onClick={() => setSelectedPerson(person)}
        isActive={selectedPerson === person}
        type={'button'}
      >
        <RoundPicture size={5} src={IMG_PATHS[person]} alt={person} />
      </FormButton>
    )
  }

  return (
    <div
      key={props.defaultValues ? props.defaultValues._id : 'transaction-input'}
    >
      <TransactionFormWrapper
        onSubmit={
          props.requestMethod === RequestMethod.PATCH
            ? patchTransactionOnSubmit
            : postTransactionOnSubmit
        }
      >
        <FormRow>
          <Column>
            <FormRowLabel htmlFor="borrowedBy">Borrowed By</FormRowLabel>
          </Column>
          <DoubleColumn>
            <FlexRow>
              {renderPersonButton(Person.AGATA)}
              {renderPersonButton(Person.KAZU)}
            </FlexRow>
          </DoubleColumn>
        </FormRow>

        <FormRow>
          <Column>
            <FormRowLabel htmlFor="amount">Amount</FormRowLabel>
          </Column>
          <DoubleColumn>
            <FormRowInput
              type="number"
              id="amount"
              autoComplete="amount"
              name="amount"
              required
              defaultValue={
                props.defaultValues ? props.defaultValues.amount : ''
              }
            />
          </DoubleColumn>
        </FormRow>
        <FormRow>
          <Column>
            <FormRowLabel htmlFor="category">Category</FormRowLabel>
          </Column>
          <DoubleColumn>
            <FlexRow>
              {renderCategoryButton(Category.SHOPPING)}
              {renderCategoryButton(Category.HOME)}
              {renderCategoryButton(Category.HEALTH)}
              {renderCategoryButton(Category.ENTERTAINMENT)}
              {renderCategoryButton(Category.OTHER)}
            </FlexRow>
          </DoubleColumn>
        </FormRow>
        <FormRow>
          <Column>
            <FormRowLabel htmlFor="description">Description</FormRowLabel>
          </Column>
          <DoubleColumn>
            <FormRowInput
              type="text"
              id="description"
              autoComplete="description"
              name="description"
              required
              defaultValue={
                props.defaultValues ? props.defaultValues.description : ''
              }
            />
          </DoubleColumn>
        </FormRow>
        <FormRow>
          <Column>
            <FormRowLabel htmlFor="date">Date</FormRowLabel>
          </Column>
          <DoubleColumn>
            <FormRowInput
              type="date"
              id="date"
              name="date"
              defaultValue={
                props.defaultValues
                  ? convertTimestampToDateString(props.defaultValues?.timestamp)
                  : getCurrentDate()
              }
              autoComplete="date"
            />
          </DoubleColumn>
        </FormRow>

        <CustomButton type="submit">
          {props.requestMethod === RequestMethod.POST
            ? 'Add Transaction'
            : 'Save'}
        </CustomButton>
      </TransactionFormWrapper>
    </div>
  )
}

const TransactionFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  font-size: ${FONT_SIZE_PRIMARY};
`

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  margin: 1rem 0 1rem;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`

const DoubleColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`

const FormRowLabel = styled.label`
  width: 100%;
`

const FormRowInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 6px;
  height: 3rem;
  padding: 5px;
`

const FlexRow = styled.div`
  display: flex;
`

const FormButton = styled.button<{ isActive: boolean }>`
  border: none;
  background: none;
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;
  filter: brightness(80%);

  ${(props) =>
    props.isActive &&
    `
    border: 3px solid ${COLOR_MEDIUM};
    padding: 0;
    filter: none;
  `}
`

export default TransactionForm

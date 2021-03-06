import { ChangeEvent, useState, VFC } from 'react'
import {
  convertDateToTimestamp,
  convertTimestampToDateString,
} from '../../../utils/functions/commons'
import { Category, Person, Transaction } from '../../../types/bankState'
import styled from 'styled-components'
import { FONT_SIZE_PRIMARY } from '../../../../styles/constants/fontSizes'
import { CustomButton } from '../../../../styles/components/button'
import RoundPicture from '../../commons/RoundPicture'
import { COLOR_MEDIUM } from '../../../../styles/constants/colors'
import { IMG_PATHS } from '../../../utils/constants/commons'
import { IconFactory } from '../../commons/IconFactory'

interface TransactionFormLayoutProps {
  onSubmit: (body: Transaction) => void
  submitButtonName: string
  defaultValues: Transaction
}

export const TransactionFormLayout: VFC<TransactionFormLayoutProps> = (
  props: TransactionFormLayoutProps,
) => {
  const [borrowedBy, setBorrowedBy] = useState<Person>(
    props.defaultValues.borrowedBy,
  )
  const [category, setCategory] = useState<Category>(
    props.defaultValues.category,
  )
  const [amount, setAmount] = useState<number>(props.defaultValues.amount)
  const [description, setDescription] = useState<string>(
    props.defaultValues.description,
  )
  const [date, setDate] = useState<string>(
    convertTimestampToDateString(props.defaultValues.timestamp),
  )

  const createRequestBody = () => ({
    amount,
    borrowedBy,
    category,
    description,
    timestamp: convertDateToTimestamp(date),
  })

  const renderCategoryButton = (buttonCategory: Category) => {
    return (
      <FormButton
        onClick={() => setCategory(buttonCategory)}
        isActive={category === buttonCategory}
        type={'button'}
      >
        <IconFactory size={4} iconId={buttonCategory} />
      </FormButton>
    )
  }

  const renderPersonButton = (buttonPerson: Person) => {
    return (
      <FormButton
        onClick={() => setBorrowedBy(buttonPerson)}
        isActive={borrowedBy === buttonPerson}
        type={'button'}
      >
        <RoundPicture
          size={5}
          src={IMG_PATHS[buttonPerson]}
          alt={buttonPerson}
        />
      </FormButton>
    )
  }

  return (
    <TransactionFormWrapper>
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
            min="0"
            id="amount"
            autoComplete="amount"
            name="amount"
            required
            defaultValue={amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAmount(Number(e.target.value))
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
            defaultValue={description}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
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
            defaultValue={date}
            autoComplete="date"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDate(e.target.value)
            }
          />
        </DoubleColumn>
      </FormRow>
      <CustomButton
        disabled={amount.toString() === '' || description === ''}
        onClick={() => props.onSubmit(createRequestBody())}
      >
        {props.submitButtonName}
      </CustomButton>
    </TransactionFormWrapper>
  )
}

const TransactionFormWrapper = styled.div`
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

export default TransactionFormLayout

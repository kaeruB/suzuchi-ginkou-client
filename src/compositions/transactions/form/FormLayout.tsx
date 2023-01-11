import { ChangeEvent, useState, VFC } from 'react'
import {
  convertDateToTimestamp,
  convertTimestampToDateString,
} from '../../../utils/functions/commons'
import RoundPicture from '../../commons/RoundPicture'
import { IMG_PATHS } from '../../../utils/constants/commons'
import { IconFactory } from '../../commons/IconFactory'
import {
  FormButton,
  FormColumn,
  FormDoubleColumn,
  FormFlexRow,
  FormRow,
  FormRowInput,
  FormRowLabel,
  FormSubmitButton,
  FormWrapper,
} from '../../../../styles/components/form'
import { usePairContext } from '../../../context/PairContextWrapper'
import { UserIdToDetails } from '../../../types/user'
import { Category, Transaction } from '../../../types/transaction'

interface FormLayoutProps {
  onSubmit: (body: Transaction) => void
  submitButtonName: string
  defaultValues: Transaction
  userIdToDetails: UserIdToDetails
}

export const FormLayout: VFC<FormLayoutProps> = (
  props: FormLayoutProps,
) => {
  const { pairUsersIds } = usePairContext()

  const [borrowedBy, setBorrowedBy] = useState<string>(
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

  const renderPersonButton = (buttonPerson: string) => (
    <FormButton
      onClick={() => setBorrowedBy(buttonPerson)}
      isActive={borrowedBy === buttonPerson}
      type={'button'}
    >
      <RoundPicture
        size={5}
        src={IMG_PATHS(props.userIdToDetails[buttonPerson].avatar)}
        alt={props.userIdToDetails[buttonPerson].name}
      />
    </FormButton>
  )

  return (
    <FormWrapper>
      <FormRow>
        <FormColumn>
          <FormRowLabel htmlFor="borrowedBy">Borrowed By</FormRowLabel>
        </FormColumn>
        <FormDoubleColumn>
          <FormFlexRow>
            {renderPersonButton(pairUsersIds[0])}
            {renderPersonButton(pairUsersIds[1])}
          </FormFlexRow>
        </FormDoubleColumn>
      </FormRow>

      <FormRow>
        <FormColumn>
          <FormRowLabel htmlFor="amount">Amount</FormRowLabel>
        </FormColumn>
        <FormDoubleColumn>
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
        </FormDoubleColumn>
      </FormRow>
      <FormRow>
        <FormColumn>
          <FormRowLabel htmlFor="category">Category</FormRowLabel>
        </FormColumn>
        <FormDoubleColumn>
          <FormFlexRow>
            {renderCategoryButton(Category.SHOPPING)}
            {renderCategoryButton(Category.HOME)}
            {renderCategoryButton(Category.HEALTH)}
            {renderCategoryButton(Category.ENTERTAINMENT)}
            {renderCategoryButton(Category.OTHER)}
          </FormFlexRow>
        </FormDoubleColumn>
      </FormRow>
      <FormRow>
        <FormColumn>
          <FormRowLabel htmlFor="description">Description</FormRowLabel>
        </FormColumn>
        <FormDoubleColumn>
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
        </FormDoubleColumn>
      </FormRow>
      <FormRow>
        <FormColumn>
          <FormRowLabel htmlFor="date">Date</FormRowLabel>
        </FormColumn>
        <FormDoubleColumn>
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
        </FormDoubleColumn>
      </FormRow>
      <FormSubmitButton
        disabled={amount.toString() === '' || description === ''}
        onClick={() => props.onSubmit(createRequestBody())}
      >
        {props.submitButtonName}
      </FormSubmitButton>
    </FormWrapper>
  )
}

export default FormLayout

import { ChangeEvent, useState } from 'react'
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
import { UserEmailToDetails } from '../../../types/user'
import { Category, Transaction } from '../../../types/transaction'

interface FormLayoutProps {
  onSubmit: (body: Transaction) => void
  submitButtonName: string
  defaultValues: Transaction
  userEmailToDetails: UserEmailToDetails
  pairUserIds: [string, string]
}

export const FormLayout = (props: FormLayoutProps) => {
  const [userWhoPaid, setUserWhoPaid] = useState<string>(
    props.defaultValues.userWhoPaid,
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
    userWhoPaid,
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
      onClick={() => setUserWhoPaid(buttonPerson)}
      isActive={userWhoPaid === buttonPerson}
      type={'button'}
    >
      <RoundPicture
        size={5}
        src={IMG_PATHS(props.userEmailToDetails[buttonPerson].avatar)}
        alt={props.userEmailToDetails[buttonPerson].name}
      />
    </FormButton>
  )

  return (
    <FormWrapper>
      <FormRow>
        <FormColumn>
          <FormRowLabel htmlFor="userWhoPaid">Paid by</FormRowLabel>
        </FormColumn>
        <FormDoubleColumn>
          <FormFlexRow>
            {renderPersonButton(props.pairUserIds[0])}
            {renderPersonButton(props.pairUserIds[1])}
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

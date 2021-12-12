import { SyntheticEvent, VFC } from 'react'
import { getCurrentDate } from '../utils/functions'
import { RequestMethod, Transaction } from '../utils/types'
import styled from 'styled-components'
import { FONT_SIZE_PRIMARY } from '../utils/styles/constants/fontSizes'
import { CustomButton } from '../utils/styles/components/button'

interface TransactionFormProps {
  requestMethod: string
  defaultValues: Transaction | null
  fetchDashboardData: () => void,
  setShowModal: (show: boolean) => void
}

export const TransactionForm: VFC<TransactionFormProps> =
  (props: TransactionFormProps) => {

    const deleteUnchangedDetailsForPatchRequest = (
      transactionDetails: Transaction,
    ): Transaction => {
      Object.keys(transactionDetails).forEach((detailsKey: string) => {
        if (
          (transactionDetails as any)[detailsKey] ===
          (props.defaultValues as any)[detailsKey]
        ) {
          delete (transactionDetails as any)[detailsKey]
        }
      })
      return transactionDetails
    }

    async function addTransaction(event: SyntheticEvent) {
      event.preventDefault()
      const eventTarget: EventTarget | any = event.target
      let transactionDetails: Transaction = {
        amount: parseInt(eventTarget.amount.value),
        borrowedBy: eventTarget.borrowedBy.value,
        category: eventTarget.category.value,
        description: eventTarget.description.value,
        date: eventTarget.date.value,
      }

      if (props.requestMethod === RequestMethod.PATCH) {
        transactionDetails =
          deleteUnchangedDetailsForPatchRequest(transactionDetails)
      }

      const body = JSON.stringify(transactionDetails)

      const requestPostfix = (props.requestMethod === RequestMethod.PATCH) && props.defaultValues
        ? `/${props.defaultValues._id}`
        : ''
      const res = await fetch(
        `http://localhost:3005/api/v1/transactions${requestPostfix}`,
        {
          method: props.requestMethod,
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        },
      )

      const result = await res.json()
      if (result) {
        props.fetchDashboardData()
        props.setShowModal(false)
      }
    }

    return (
      <div
        key={
          props.defaultValues ? props.defaultValues._id : 'transaction-input'
        }
      >
        <TransactionFormWrapper onSubmit={addTransaction}>
          <FormRow>
            <Column>
              <FormRowLabel htmlFor="borrowedBy">Borrowed By</FormRowLabel>
            </Column>
            <DoubleColumn>
              <FormRowInput
                type="text"
                id="borrowedBy"
                autoComplete="borrowedBy"
                name="borrowedBy"
                required
                defaultValue={
                  props.defaultValues ? props.defaultValues.borrowedBy : ''
                }
              />
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
              <FormRowInput
                type="text"
                id="category"
                autoComplete="category"
                name="category"
                required
                defaultValue={
                  props.defaultValues ? props.defaultValues.category : ''
                }
              />
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
                    ? props.defaultValues?.date
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

export default TransactionForm

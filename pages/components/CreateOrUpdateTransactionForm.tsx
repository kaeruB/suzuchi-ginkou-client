import { SyntheticEvent, VFC } from 'react'
import { getCurrentDate } from '../utils/functions'
import { RequestMethod, TransactionDetails } from '../utils/types'

interface CreateOrUpdateTransactionFormProps {
  requestMethod: string
  defaultValues?: TransactionDetails
  toggleUpdateMode?: () => void
  fetchDashboardData: () => void
}

export const CreateOrUpdateTransactionForm: VFC<CreateOrUpdateTransactionFormProps> =
  (props: CreateOrUpdateTransactionFormProps) => {
    const deleteUnchangedDetailsForPatchRequest = (
      transactionDetails: TransactionDetails,
    ): TransactionDetails => {
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
      let transactionDetails: TransactionDetails = {
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

      const requestPostfix = props.defaultValues
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

      if (props.toggleUpdateMode) {
        props.toggleUpdateMode()
      }

      const result = await res.json()
      if (result) {
        props.fetchDashboardData()
      }
    }

    return (
      <div
        key={
          props.defaultValues ? props.defaultValues._id : 'transaction-input'
        }
      >
        <h4>New transaction {props.requestMethod} </h4>

        <form onSubmit={addTransaction}>
          <label htmlFor="borrowedBy">Borrowed By:</label>
          <input
            type="text"
            id="borrowedBy"
            autoComplete="borrowedBy"
            name="borrowedBy"
            required
            defaultValue={
              props.defaultValues ? props.defaultValues.borrowedBy : ''
            }
          />

          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            autoComplete="amount"
            name="amount"
            required
            defaultValue={props.defaultValues ? props.defaultValues.amount : ''}
          />

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            autoComplete="category"
            name="category"
            required
            defaultValue={
              props.defaultValues ? props.defaultValues.category : ''
            }
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            autoComplete="description"
            name="description"
            required
            defaultValue={
              props.defaultValues ? props.defaultValues.description : ''
            }
          />

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={
              props.defaultValues ? props.defaultValues?.date : getCurrentDate()
            }
            autoComplete="date"
          />

          <button type="submit">
            {props.requestMethod === RequestMethod.POST
              ? 'Add Transaction'
              : 'Save'}
          </button>
        </form>
      </div>
    )
  }

export default CreateOrUpdateTransactionForm

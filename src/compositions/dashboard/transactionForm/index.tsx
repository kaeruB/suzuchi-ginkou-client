import { VFC } from 'react'
import { getCurrentTimestamp } from '../../../utils/functions/commons'
import { Category, Person, Transaction } from '../../../types/bankState'
import {
  URL_TRANSACTION_PATCH,
  URL_TRANSACTION_POST,
} from '../../../utils/constants/endpoints'
import { patchTransaction, postTransaction } from '../../../api/transaction'
import TransactionFormLayout from './TransactionFormLayout'

interface TransactionFormProps {
  isEditMode: boolean
  defaultValues: Transaction | null
  fetchDashboardData: () => void
  setShowModal: (show: boolean) => void
}

export const TransactionForm: VFC<TransactionFormProps> = (
  props: TransactionFormProps,
) => {
  const afterSubmit = (result: Transaction) => {
    if (result) {
      props.fetchDashboardData()
      props.setShowModal(false)
    }
  }

  const patchTransactionOnSubmit = async (body: Transaction) => {
    const transactionId = (props.defaultValues && props.defaultValues._id) || ''
    const url = URL_TRANSACTION_PATCH(transactionId)
    const result = await patchTransaction(url, body)
    afterSubmit(result)
  }

  const postTransactionOnSubmit = async (body: Transaction) => {
    const result = await postTransaction(URL_TRANSACTION_POST, body)
    afterSubmit(result)
  }

  const transactionFormInitialValues = (): Transaction => ({
    borrowedBy: props.defaultValues
      ? props.defaultValues.borrowedBy
      : Person.AGATA,
    category: props.defaultValues
      ? props.defaultValues.category
      : Category.SHOPPING,
    amount: props.defaultValues ? props.defaultValues.amount : 0,
    description: props.defaultValues ? props.defaultValues.description : '',
    timestamp: props.defaultValues
      ? props.defaultValues.timestamp
      : getCurrentTimestamp(),
  })

  return (
    <TransactionFormLayout
      onSubmit={
        props.isEditMode ? patchTransactionOnSubmit : postTransactionOnSubmit
      }
      submitButtonName={props.isEditMode ? 'Save' : 'Add Transaction'}
      defaultValues={transactionFormInitialValues()}
    />
  )
}

export default TransactionForm

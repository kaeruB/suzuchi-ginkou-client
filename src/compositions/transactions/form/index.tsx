import { VFC } from 'react'
import { getCurrentTimestamp } from '../../../utils/functions/commons'
import {
  URL_TRANSACTION_PATCH_OR_DELETE,
  URL_TRANSACTION_POST,
} from '../../../utils/constants/endpoints'
import { patchTransaction, postTransaction } from '../../../api/transaction'
import { RequestResult } from '../../../types/request'
import { UNAUTHORIZED } from '../../../utils/constants/responseStatuses'
import { useAuthContext } from '../../../context/AuthContextWrapper'
import { usePairContext } from '../../../context/PairContextWrapper'
import { UserIdToDetails } from '../../../types/user'
import { Category, Transaction } from '../../../types/transaction'
import FormLayout from "./FormLayout";

interface TransactionFormProps {
  isEditMode: boolean
  defaultValues: Transaction | null
  fetchTransactionsAndUserDetails: () => void
  setShowModal: (show: boolean) => void
  userIdToDetails: UserIdToDetails
}

export const TransactionForm: VFC<TransactionFormProps> = (
  props: TransactionFormProps,
) => {
  const { setIsAuthenticated } = useAuthContext()
  const { pairUsersIds, pairId } = usePairContext()

  const afterResponseReceived = (result: RequestResult<Transaction>) => {
    if (result.error && result.error?.status === UNAUTHORIZED) {
      setIsAuthenticated(false)
    } else if (result.response) {
      props.fetchTransactionsAndUserDetails()
      props.setShowModal(false)
    }
  }

  const patchTransactionOnSubmit = async (body: Transaction) => {
    const transactionId = (props.defaultValues && props.defaultValues._id) || ''
    const url = URL_TRANSACTION_PATCH_OR_DELETE(pairId, transactionId)
    const result: RequestResult<Transaction> = await patchTransaction(url, body)
    afterResponseReceived(result)
  }

  const postTransactionOnSubmit = async (body: Transaction) => {
    const result = await postTransaction(URL_TRANSACTION_POST(pairId), body)
    afterResponseReceived(result)
  }

  const transactionFormInitialValues = (): Transaction => ({
    borrowedBy: props.defaultValues
      ? props.defaultValues.borrowedBy
      : pairUsersIds
      ? pairUsersIds[0]
      : '',
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
    <FormLayout
      onSubmit={
        props.isEditMode ? patchTransactionOnSubmit : postTransactionOnSubmit
      }
      submitButtonName={props.isEditMode ? 'Save' : 'Add Transaction'}
      defaultValues={transactionFormInitialValues()}
      userIdToDetails={props.userIdToDetails}
    />
  )
}

export default TransactionForm

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
import { UserEmailToDetails } from '../../../types/user'
import { Category, Transaction } from '../../../types/transaction'
import FormLayout from './FormLayout'
import Loading from '../../commons/loading/Loading'

interface TransactionFormProps {
  isEditMode: boolean
  defaultValues: Transaction | null
  fetchTransactionsAndUserDetails: () => void
  setShowModal: (show: boolean) => void
  userEmailToDetails: UserEmailToDetails
  pairId: string
}

export const TransactionForm = (props: TransactionFormProps) => {
  const { setIsAuthenticated } = useAuthContext()
  const { pairUsersIds } = usePairContext()

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
    const url = URL_TRANSACTION_PATCH_OR_DELETE(props.pairId, transactionId)
    const result: RequestResult<Transaction> = await patchTransaction(url, body)
    afterResponseReceived(result)
  }

  const postTransactionOnSubmit = async (body: Transaction) => {
    const result = await postTransaction(
      URL_TRANSACTION_POST(props.pairId),
      body,
    )
    afterResponseReceived(result)
  }

  const transactionFormInitialValues = (): Transaction => ({
    userWhoPaid: props.defaultValues
      ? props.defaultValues.userWhoPaid
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

  return pairUsersIds ? (
    <FormLayout
      onSubmit={
        props.isEditMode ? patchTransactionOnSubmit : postTransactionOnSubmit
      }
      submitButtonName={props.isEditMode ? 'Save' : 'Add Transaction'}
      defaultValues={transactionFormInitialValues()}
      userEmailToDetails={props.userEmailToDetails}
      pairUsersIds={pairUsersIds}
    />
  ) : (
    <Loading />
  )
}

export default TransactionForm

import type { NextPage } from 'next'
import Transactions from '../src/compositions/transactions'
import { usePairContext } from '../src/context/PairContextWrapper'
import Loading from '../src/compositions/commons/loading/Loading'

const TransactionsPage: NextPage = () => {
  const { pairId } = usePairContext()

  return pairId ? <Transactions pairId={pairId} /> : <Loading />
}

export default TransactionsPage

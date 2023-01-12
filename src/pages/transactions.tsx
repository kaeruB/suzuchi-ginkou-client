import type { NextPage } from 'next'
import Transactions from '../compositions/transactions'
import { usePairContext } from '../context/PairContextWrapper'
import Loading from '../compositions/commons/loading/Loading'

const TransactionsPage: NextPage = () => {
  const { pairId } = usePairContext()

  return pairId ? <Transactions pairId={pairId} /> : <Loading />
}

export default TransactionsPage

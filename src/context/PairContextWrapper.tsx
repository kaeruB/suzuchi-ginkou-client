import { createContext, useContext, useEffect, useState, VFC } from 'react'
import { useRouter } from 'next/router'
import { TRANSACTIONS_PATH, PAIRS_PATH } from '../utils/constants/routerPaths'
import { retrieveUsersIdsFromPairId } from '../utils/functions/commons'
import { useAuthContext } from './AuthContextWrapper'

interface PairContextProps {
  pairId: string | null
  setPairId: (pairId: string) => void
  pairUsersIds: [string, string] | null
}

const PairContext = createContext<PairContextProps>({
  pairId: null,
  setPairId: (pairId: string) => {},
  pairUsersIds: null,
})

interface PairContextWrapperProps {
  children: any
}

export const PairContextWrapper: VFC<PairContextWrapperProps> = (
  props: PairContextWrapperProps,
) => {
  const router = useRouter()
  const [pairId, setPairId] = useState<string | null>(null)
  const [pairUsersIds, setPairUsersIds] = useState<[string, string] | null>(
    null,
  )
  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    if (isAuthenticated) {
      if (pairId) {
        const userIds = retrieveUsersIdsFromPairId(pairId)
        setPairUsersIds(userIds)
        router.push(TRANSACTIONS_PATH)
      } else {
        router.push(PAIRS_PATH)
      }
    }
  }, [pairId])

  return (
    <PairContext.Provider value={{ pairId, setPairId, pairUsersIds }}>
      {props.children}
    </PairContext.Provider>
  )
}

export function usePairContext() {
  return useContext(PairContext)
}

import { createContext, useContext, useEffect, useState, VFC } from 'react'
import { useRouter } from 'next/router'
import { TRANSACTIONS_PATH, PAIRS_PATH } from '../utils/constants/routerPaths'
import { retrieveUsersIdsFromPairId } from '../utils/functions/commons'
import {useAuthContext} from "./AuthContextWrapper";

const PairContext = createContext({
  pairId: '',
  setPairId: (pairId: string) => {},
  pairUsersIds: ['', ''],
})

interface PairContextWrapperProps {
  children: any
}

export const PairContextWrapper: VFC<PairContextWrapperProps> = (
  props: PairContextWrapperProps,
) => {
  const router = useRouter()
  const [pairId, setPairId] = useState<string>('')
  const [pairUsersIds, setPairUsersIds] = useState<Array<string>>(['', ''])
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

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { TRANSACTIONS_PATH, PAIRS_PATH } from '../utils/constants/routerPaths'
import { decodePairIdToUserIds } from '../utils/functions/commons'
import { useAuthContext } from './AuthContextWrapper'

interface PairContextProps {
  pairId: string | null
  setPairId: (pairId: string | null) => void
  pairUserIds: [string, string] | null
}

const PairContext = createContext<PairContextProps>({
  pairId: null,
  setPairId: (pairId: string | null) => {},
  pairUserIds: null,
})

interface PairContextWrapperProps {
  children: any
}

export const PairContextWrapper = (props: PairContextWrapperProps) => {
  const router = useRouter()
  const [pairId, setPairId] = useState<string | null>(null)
  const [pairUserIds, setPairUserIds] = useState<[string, string] | null>(
    null,
  )
  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    if (isAuthenticated) {
      if (pairId) {
        setPairUserIds(decodePairIdToUserIds(pairId))
        router.push(TRANSACTIONS_PATH)
      } else {
        router.push(PAIRS_PATH)
      }
    }
  }, [pairId])

  return (
    <PairContext.Provider value={{ pairId, setPairId, pairUserIds }}>
      {props.children}
    </PairContext.Provider>
  )
}

export function usePairContext() {
  return useContext(PairContext)
}

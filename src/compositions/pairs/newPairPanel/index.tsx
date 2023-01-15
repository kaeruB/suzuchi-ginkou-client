import { FC, useContext, useState } from 'react'
import NewPairPanelLayout from './NewPairPanelLayout'
import { postNewPair } from '../../../api/pair'
import { RequestResult } from '../../../types/request'
import { URL_PAIRS_POST } from '../../../utils/constants/endpoints'
import { UNAUTHORIZED } from '../../../utils/constants/responseStatuses'
import { useAuthContext } from '../../../context/AuthContextWrapper'
import { usePairContext } from '../../../context/PairContextWrapper'

interface NewPairPanelProps {}

export const NewPairPanel: FC<NewPairPanelProps> = (
  props: NewPairPanelProps,
) => {
  const { setIsAuthenticated } = useAuthContext()
  const { setPairId } = usePairContext()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const addNewPair = async (body: { partnerEmail: string }) => {
    const result: RequestResult<{ pairId: string }> = await postNewPair(
      URL_PAIRS_POST,
      body,
    )
    if (result.error) {
      if (result.error.status === UNAUTHORIZED) {
        setIsAuthenticated(false)
      } else {
        setErrorMsg(result.error.message)
      }
    } else if (result.response) {
      setPairId(result.response.data.pairId)
    }
  }

  return <NewPairPanelLayout onSubmit={addNewPair} errorMsg={errorMsg} />
}

export default NewPairPanel

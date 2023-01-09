import { FC, useEffect, useState } from 'react'
import SummaryPageLayout from '../compositions/summary/SummaryPageLayout'
import { useAuthContext } from '../context/AuthContextWrapper'
import LoadingPage from '../compositions/loading/LoadingPage'
import { RequestResult } from '../types/request'
import { fetchPairsSummary } from '../api/pair'
import { URL_PAIRS_GET } from '../utils/constants/endpoints'
import { UNAUTHORIZED } from '../utils/constants/responseStatuses'
import { PairsSummariesWithUsersDetails } from '../types/pair'

interface SummaryPageProps {}

export const SummaryPage: FC<SummaryPageProps> = (props: SummaryPageProps) => {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext()
  const [pairsSummariesWithUserDetails, setPairsSummaries] =
    useState<PairsSummariesWithUsersDetails | null>(null)
  const [pairsIdsList, setPairsIdsList] = useState<Array<string> | null>(null)

  const fetchPairsSummaryData = async () => {
    const result: RequestResult<PairsSummariesWithUsersDetails> =
      await fetchPairsSummary(URL_PAIRS_GET)
    if (result.error && result.error.status === UNAUTHORIZED) {
      setIsAuthenticated(false)
    } else if (result.response) {
      const pairsIdsList = Object.keys(result.response.data.pairsSummaries)

      setPairsSummaries(result.response.data)
      setPairsIdsList(pairsIdsList)
    }
  }

  useEffect((): void => {
    fetchPairsSummaryData()
  }, [])

  // todo isAuthenticated &&
  return pairsSummariesWithUserDetails && pairsIdsList ? (
    <SummaryPageLayout
      pairsSummariesWithUserDetails={pairsSummariesWithUserDetails}
      pairsIdsList={pairsIdsList}
    />
  ) : (
    <LoadingPage />
  )
}

export default SummaryPage

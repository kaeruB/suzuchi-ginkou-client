import { FC, useEffect, useState } from 'react'
import PairsLayout from "./PairsLayout";
import Loading from "../commons/loading/Loading";
import {useAuthContext} from "../../context/AuthContextWrapper";
import {PairsSummariesWithUsersDetails} from "../../types/pair";
import {RequestResult} from "../../types/request";
import {fetchPairsSummary} from "../../api/pair";
import {URL_PAIRS_GET} from "../../utils/constants/endpoints";
import {UNAUTHORIZED} from "../../utils/constants/responseStatuses";

interface PairsProps {}

export const Pairs: FC<PairsProps> = (props: PairsProps) => {
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

  useEffect(() => {
    fetchPairsSummaryData()
  }, [])

  return isAuthenticated && pairsSummariesWithUserDetails && pairsIdsList ? (
    <PairsLayout
      pairsSummariesWithUserDetails={pairsSummariesWithUserDetails}
      pairsIdsList={pairsIdsList}
    />
  ) : (
    <Loading />
  )
}

export default Pairs

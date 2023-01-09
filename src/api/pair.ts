import { RequestResult } from '../types/request'
import { DataApi } from './dataApi'
import { PairsSummariesWithUsersDetails } from '../types/pair'

export const fetchPairsSummary = async (
  url: string,
): Promise<RequestResult<PairsSummariesWithUsersDetails>> =>
  await DataApi.get(url)

export const postNewPair = async (
  url: string,
  body: any,
): Promise<RequestResult<{ pairId: string }>> => await DataApi.post(url, body)

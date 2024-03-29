import { User, UserCredits } from '../types/user'
import { DataApi } from './dataApi'
import { RequestResult } from '../types/request'

export const postUser = async (
  url: string,
  body: User | UserCredits,
): Promise<RequestResult> => await DataApi.post(url, body)

export const postUserLogout = async (url: string): Promise<RequestResult> =>
  await DataApi.post(url)

import { SUCCESS, FAIL } from '../utils/constants/responseStatuses'

export type ResponseFromServer<T = any> = {
  status: typeof SUCCESS | typeof FAIL
  data: T
  results?: number
}

export type RequestResult<T = any> = {
  response: ResponseFromServer<T> | null
  error: {
    message: string
    status: number | undefined
  } | null
}

import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { DEFAULT_HOSTNAME } from './env'

export const DataApi: AxiosInstance = axios.create({
  baseURL: DEFAULT_HOSTNAME,
  headers: {
    'Content-Type': 'application/json',
  },
})

DataApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    console.error('Error on request:', error)
  },
)

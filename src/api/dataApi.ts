import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { DEFAULT_HOSTNAME } from './env'
import { RequestResult } from '../types/request'

export const DataApi: AxiosInstance = axios.create({
  baseURL: DEFAULT_HOSTNAME,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

DataApi.interceptors.response.use(
  (response: AxiosResponse): RequestResult => ({
    response: response.data,
    error: null,
  }),
  (error: AxiosError): RequestResult => ({
    response: null,
    error: {
      message: error.response?.data.message,
      status: error.response?.status,
    },
  }),
)

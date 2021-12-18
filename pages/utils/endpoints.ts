export const getUrl = (domain: string, url: string) => domain + url

export const LOCALHOST = 'http://localhost:3005'

export const URL_TRANSACTION_SUMMARY = '/api/v1/transactions/summary'
export const URL_MODIFY_TRANSACTION = (transactionId: string) =>
  `/api/v1/transactions/${transactionId}`

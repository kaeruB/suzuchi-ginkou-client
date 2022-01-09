export const getUrl = (domain: string, url: string) => domain + url

export const URL_TRANSACTION_SUMMARY = '/api/v1/transactions/summary'
export const URL_TRANSACTION_PATCH = (transactionId: string) =>
  `/api/v1/transactions/${transactionId}`
export const URL_TRANSACTION_POST = '/api/v1/transactions'

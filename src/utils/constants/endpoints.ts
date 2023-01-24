export const URL_TRANSACTION_SUMMARY = (pairId: string) =>
  `/api/v1/pairs/${pairId}/transactions/summary`
export const URL_TRANSACTION_PATCH_OR_DELETE = (
  pairId: string,
  transactionId: string,
) => `/api/v1/pairs/${pairId}/transactions/${transactionId}`
export const URL_TRANSACTION_POST = (pairId: string) =>
  `/api/v1/pairs/${pairId}/transactions`

export const URL_USER_LOGIN_POST = '/api/v1/users/login'
export const URL_USER_LOGOUT_POST = '/api/v1/users/logout'
export const URL_USER_SIGNUP_POST = '/api/v1/users/signup'
export const URL_USER_UPDATE_POST = '/api/v1/users/update'

export const URL_PAIRS_GET = '/api/v1/pairs'
export const URL_PAIRS_POST = '/api/v1/pairs'

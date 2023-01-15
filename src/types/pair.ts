import { UserEmailToDetails } from './user'
import { Summary } from './transaction'

export type PairIdToSummary = { [pairId: string]: Summary }

export type PairsSummariesWithUsersDetails = {
  pairsSummaries: PairIdToSummary
  usersDetails: UserEmailToDetails
}

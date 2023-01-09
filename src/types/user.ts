export type UserCredits = {
  userId: string
  password: string
}

export type UserDetails = {
  name: string
  avatar: string
}

export type User = UserCredits & UserDetails
export type UserIdToDetails = { [userId: string]: UserDetails }

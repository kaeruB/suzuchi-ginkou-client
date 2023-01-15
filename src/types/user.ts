export type UserCredits = {
  userEmail: string
  password: string
}

export type UserDetails = {
  name: string
  avatar: string
}

export type User = UserCredits & UserDetails
export type UserEmailToDetails = { [userEmail: string]: UserDetails }

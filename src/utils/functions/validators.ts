import { User } from '../../types/user'

const MIN_PASSWORD_LENGTH = 8
const MIN_USERNAME_LENGTH = 3
const MAX_USERNAME_LENGTH = 40

export const isEmptyString = (str: string): boolean => str === ''

export const isStringLongEnough = (
  str: string,
  minStringLength: number,
): boolean => str.length >= minStringLength

export const isStringNotTooLong = (
  str: string,
  maxStringLength: number,
): boolean => str.length <= maxStringLength

export const isPasswordDifferentThanUsername = (user: User): boolean =>
  user.password !== user.username

export const hasPasswordNumber = (password: string): boolean => {
  const NUMBERS_REGEX = /\d/
  return NUMBERS_REGEX.test(password)
}

export const hasPasswordLetter = (password: string): boolean => {
  const LETTERS_REGEX = /[a-zA-Z]/
  return LETTERS_REGEX.test(password)
}

export const getPasswordValidationError = (user: User): string | null => {
  if (isEmptyString(user.password)) {
    return null
  }

  if (!isStringLongEnough(user.password, MIN_PASSWORD_LENGTH)) {
    return `Password should have at least ${MIN_PASSWORD_LENGTH} characters.`
  }
  if (!isPasswordDifferentThanUsername(user)) {
    return "Password shouldn't be the same as username"
  }
  if (!hasPasswordNumber(user.password)) {
    return 'Password should contain at least one number'
  }
  if (!hasPasswordLetter(user.password)) {
    return 'Password should contain at least one letter'
  }
  return null
}

export const getUsernameValidationError = (username: string): string | null => {
  if (isEmptyString(username)) {
    return null
  }

  if (!isStringLongEnough(username, MIN_USERNAME_LENGTH)) {
    return `Username should have at least ${MIN_USERNAME_LENGTH} characters.`
  }
  if (!isStringNotTooLong(username, MAX_USERNAME_LENGTH)) {
    return `Username can have maximum ${MAX_USERNAME_LENGTH} characters.`
  }
  return null
}

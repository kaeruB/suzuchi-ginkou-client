import { UserCredits } from '../../types/user'

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

export const isPasswordDifferentThanUsername = (user: UserCredits): boolean =>
  user.password !== user.userId

export const hasPasswordNumber = (password: string): boolean => {
  const NUMBERS_REGEX = /\d/
  return NUMBERS_REGEX.test(password)
}

export const hasPasswordLetter = (password: string): boolean => {
  const LETTERS_REGEX = /[a-zA-Z]/
  return LETTERS_REGEX.test(password)
}

export const getPasswordValidationError = (
  user: UserCredits,
): string | null => {
  if (isEmptyString(user.password)) {
    return null
  }

  if (!isStringLongEnough(user.password, MIN_PASSWORD_LENGTH)) {
    return `Password should have at least ${MIN_PASSWORD_LENGTH} characters.`
  }
  if (!isPasswordDifferentThanUsername(user)) {
    return "Password shouldn't be the same as user id"
  }
  if (!hasPasswordNumber(user.password)) {
    return 'Password should contain at least one number'
  }
  if (!hasPasswordLetter(user.password)) {
    return 'Password should contain at least one letter'
  }
  return null
}

export const getUserIdValidationError = (userId: string): string | null => {
  if (isEmptyString(userId)) {
    return null
  }

  if (!isStringLongEnough(userId, MIN_USERNAME_LENGTH)) {
    return `User ID should have at least ${MIN_USERNAME_LENGTH} characters.`
  }
  if (!isStringNotTooLong(userId, MAX_USERNAME_LENGTH)) {
    return `User ID can have maximum ${MAX_USERNAME_LENGTH} characters.`
  }
  return null
}

export const getNameValidationError = (name: string): string | null => {
  if (isEmptyString(name)) {
    return null
  }

  if (!isStringLongEnough(name, MIN_USERNAME_LENGTH)) {
    return `User name should have at least ${MIN_USERNAME_LENGTH} characters.`
  }
  if (!isStringNotTooLong(name, MAX_USERNAME_LENGTH)) {
    return `User name can have maximum ${MAX_USERNAME_LENGTH} characters.`
  }
  return null
}

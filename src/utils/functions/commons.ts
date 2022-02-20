import { DATE_PARTS_SEPARATOR } from '../constants/commons'

export const formatNumberWithSpaces = (n: number | null): string | null => {
  if (n == null) return null
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export const parseDateObjToDateString = (d: Date): string => {
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return yyyy + DATE_PARTS_SEPARATOR + mm + DATE_PARTS_SEPARATOR + dd
}

export const getCurrentTimestamp = (): number => +new Date()

export const convertDateToTimestamp = (date: string): number => Date.parse(date)
export const convertTimestampToDateString = (timestamp: number) =>
  parseDateObjToDateString(new Date(timestamp))

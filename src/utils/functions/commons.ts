import { DATE_PARTS_SEPARATOR, PAIR_ID_SEPARATOR } from '../constants/commons'
import { RefObject } from 'react'
import { CLICK_EVENT } from '../constants/events'

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

export const onClickOutsideElement = (
  onClickOutside: () => void,
  element: RefObject<HTMLDivElement>,
) => {
  const listenForClickOutside = (event: MouseEvent) => {
    const eventTargetElement = event.target as HTMLElement
    const isClickOutsideElement =
      element.current && !element.current.contains(eventTargetElement)
    isClickOutsideElement && onClickOutside()
  }

  window.addEventListener(CLICK_EVENT, listenForClickOutside)

  return () => window.removeEventListener(CLICK_EVENT, listenForClickOutside)
}

export const convertDecimalCodeToHtmlSymbol = (decimalCode: number): string =>
  String.fromCharCode(decimalCode)

export const retrieveUsersIdsFromPairId = (pairId: string): Array<string> =>
  pairId.split(PAIR_ID_SEPARATOR)

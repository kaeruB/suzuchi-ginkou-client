import { useEffect, useMemo, useState } from 'react'
import { usePairContext } from '../../../context/PairContextWrapper'
import { UserDetails, UserEmailToDetails } from '../../../types/user'
import SummaryLayout from './SummaryLayout'
import Loading from '../loading/Loading'
import { Summary } from '../../../types/transaction'

interface SummaryHeaderProps {
  summary: Summary
  userEmailToDetails: UserEmailToDetails
  currency: string
  pairId: string
}

export const SummaryHeader = (props: SummaryHeaderProps) => {
  const { setPairId } = usePairContext()
  const [personWithDebt, setPersonWithDebt] = useState<UserDetails | null>(null)
  const [personWithoutDebt, setPersonWithoutDebt] =
    useState<UserDetails | null>(null)
  const [moneyAmountToReturn, setMoneyAmountToReturn] = useState<number | null>(
    null,
  )
  const userIds = useMemo(() => Object.keys(props.summary), [props.summary])

  useEffect(() => {
    const moneyPayedByFirstUser: number = props.summary[userIds[0]]
      ? props.summary[userIds[0]]
      : 0
    const moneyPayedBySecondUser: number = props.summary[userIds[1]]
      ? props.summary[userIds[1]]
      : 0
    const difference: number = Math.abs(
      moneyPayedBySecondUser - moneyPayedByFirstUser,
    )

    const personWithDebt =
      moneyPayedByFirstUser < moneyPayedBySecondUser ? userIds[0] : userIds[1]
    const personWithoutDebt =
      personWithDebt === userIds[0] ? userIds[1] : userIds[0]

    const personWithDebtDetails = props.userEmailToDetails[personWithDebt]
    const personWithoutDebtDetails = props.userEmailToDetails[personWithoutDebt]

    setPersonWithDebt(personWithDebtDetails)
    setPersonWithoutDebt(personWithoutDebtDetails)
    setMoneyAmountToReturn(difference)
  }, [props.summary, props.userEmailToDetails])

  const goToPairsPage = () => props.pairId && setPairId(props.pairId)

  return personWithDebt == null ||
    personWithoutDebt == null ||
    moneyAmountToReturn == null ? (
    <Loading />
  ) : (
    <SummaryLayout
      currency={props.currency}
      personWithDebt={personWithDebt}
      personWithoutDebt={personWithoutDebt}
      moneyAmountToReturn={moneyAmountToReturn}
      goToPairsPage={goToPairsPage}
    />
  )
}

export default SummaryHeader

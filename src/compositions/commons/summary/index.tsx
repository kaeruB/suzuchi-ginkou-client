import { useEffect, useMemo, useState, VFC } from 'react'
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

export const SummaryHeader: VFC<SummaryHeaderProps> = (
  props: SummaryHeaderProps,
) => {
  const { setPairId } = usePairContext()
  const [personWithDebt, setPersonWithDebt] = useState<UserDetails | null>(null)
  const [personWithoutDebt, setPersonWithoutDebt] =
    useState<UserDetails | null>(null)
  const [moneyAmountToReturn, setMoneyAmountToReturn] = useState<number | null>(
    null,
  )
  const usersIds = useMemo(() => Object.keys(props.summary), [props.summary])

  useEffect(() => {
    const moneyPayedByFirstUser: number = props.summary[usersIds[0]]
      ? props.summary[usersIds[0]]
      : 0
    const moneyPayedBySecondUser: number = props.summary[usersIds[1]]
      ? props.summary[usersIds[1]]
      : 0
    const difference: number = Math.abs(
      moneyPayedBySecondUser - moneyPayedByFirstUser,
    )

    const personWithDebt =
      moneyPayedByFirstUser < moneyPayedBySecondUser ? usersIds[0] : usersIds[1]
    const personWithoutDebt =
      personWithDebt === usersIds[0] ? usersIds[1] : usersIds[0]

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

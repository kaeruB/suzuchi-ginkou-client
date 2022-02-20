import { useEffect, useState, VFC } from 'react'
import styled from 'styled-components'
import RoundPicture from '../../commons/RoundPicture'
import { Person, Summary } from '../../../types/bankState'
import Arrow from './Arrow'
import { COLOR_STRONG } from '../../../../styles/constants/colors'
import {
  FONT_SIZE_HEADER_PRIMARY,
  FONT_SIZE_HEADER_SECONDARY,
  FONT_SIZE_HEADER_TERTIARY,
} from '../../../../styles/constants/fontSizes'
import { formatNumberWithSpaces } from '../../../utils/functions/commons'
import { IMG_PATHS } from '../../../utils/constants/commons'

interface HeaderProps {
  summary: Summary
  currency: string
}

export const Header: VFC<HeaderProps> = (props: HeaderProps) => {
  const [personWithDebt, setPersonWithDebt] = useState<string | null>(null)
  const [personWithoutDebt, setPersonWithoutDebt] = useState<string | null>(
    null,
  )
  const [moneyAmountToReturn, setMoneyAmountToReturn] = useState<number | null>(
    null,
  )

  useEffect(() => {
    const borrowedMoneyByAgata = props.summary[Person.AGATA]
      ? props.summary[Person.AGATA]
      : 0
    const borrowedMoneyByKazu = props.summary[Person.KAZU]
      ? props.summary[Person.KAZU]
      : 0
    const difference = Math.abs(borrowedMoneyByAgata - borrowedMoneyByKazu)

    const personWithDebt =
      borrowedMoneyByAgata < borrowedMoneyByKazu ? Person.KAZU : Person.AGATA
    const personWithoutDebt =
      personWithDebt === Person.AGATA ? Person.KAZU : Person.AGATA

    setPersonWithDebt(personWithDebt)
    setPersonWithoutDebt(personWithoutDebt)
    setMoneyAmountToReturn(difference)
  }, [props.summary])

  const renderMoneyTransitionStatus = () => {
    return (
      personWithDebt && (
        <GeneralState>
          <GeneralStateIllustration>
            <RoundPicture
              size={10}
              src={IMG_PATHS[personWithDebt as Person]}
              alt={personWithDebt as Person}
            />
            <MoneyTransition>
              <Amount>
                {formatNumberWithSpaces(moneyAmountToReturn)}
                {props.currency}
              </Amount>
              <Arrow />
            </MoneyTransition>
            <RoundPicture
              size={10}
              src={IMG_PATHS[personWithoutDebt as Person]}
              alt={personWithoutDebt as Person}
            />
          </GeneralStateIllustration>
          <GeneralStateSentence>
            <HighlightedText>{personWithDebt}</HighlightedText> should return{' '}
            <HighlightedText>
              {formatNumberWithSpaces(moneyAmountToReturn)} {props.currency}
            </HighlightedText>{' '}
            to {personWithoutDebt}
          </GeneralStateSentence>
        </GeneralState>
      )
    )
  }

  const renderNoMoneyToReturnMessage = () => {
    return (
      <GeneralStateSentence>
        <HighlightedText>No money to return.</HighlightedText>
      </GeneralStateSentence>
    )
  }

  return (
    <>
      <Title>Suzuchi Ginkou</Title>
      {moneyAmountToReturn && moneyAmountToReturn > 0
        ? renderMoneyTransitionStatus()
        : renderNoMoneyToReturnMessage()}
    </>
  )
}

const Title = styled.h1`
  font-size: ${FONT_SIZE_HEADER_PRIMARY};
  padding: 5rem 0;
`

const GeneralState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const GeneralStateIllustration = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const GeneralStateSentence = styled.span`
  font-size: ${FONT_SIZE_HEADER_TERTIARY};
  margin-top: 3rem;
`

const MoneyTransition = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 20rem;
`

const Amount = styled.span`
  font-size: ${FONT_SIZE_HEADER_SECONDARY};
  height: 55%;
`

const HighlightedText = styled.span`
  color: ${COLOR_STRONG};
`

export default Header

import { VFC } from 'react'
import styled from 'styled-components'
import RoundPicture from '../RoundPicture'
import Arrow from './Arrow'
import { COLOR_STRONG } from '../../../../styles/constants/colors'
import {
  FONT_SIZE_HEADER_SECONDARY,
  FONT_SIZE_HEADER_TERTIARY,
} from '../../../../styles/constants/fontSizes'
import { formatNumberWithSpaces } from '../../../utils/functions/commons'
import { IMG_PATHS } from '../../../utils/constants/commons'
import { UserDetails } from '../../../types/user'

interface SummaryLayoutProps {
  currency: string
  personWithDebt: UserDetails
  personWithoutDebt: UserDetails
  moneyAmountToReturn: number
  goToPairDashboard: () => void
}

export const SummaryLayout: VFC<SummaryLayoutProps> = (
  props: SummaryLayoutProps,
) => {
  const renderMoneyToReturnMsg = () => (
    <GeneralStateSentence>
      <HighlightedText>{props.personWithDebt.name}</HighlightedText> should
      return{' '}
      <HighlightedText>
        {formatNumberWithSpaces(props.moneyAmountToReturn)} {props.currency}
      </HighlightedText>{' '}
      to {props.personWithoutDebt.name}
    </GeneralStateSentence>
  )

  const renderNoMoneyToReturnMsg = () => (
    <GeneralStateSentence>
      <HighlightedText>{props.personWithDebt.name}</HighlightedText> and{' '}
      <HighlightedText>{props.personWithoutDebt.name}</HighlightedText> do not
      have to return any money.
    </GeneralStateSentence>
  )

  return (
    <GeneralState onClick={props.goToPairDashboard}>
      <GeneralStateIllustration>
        <RoundPicture
          size={10}
          src={IMG_PATHS(props.personWithDebt.avatar)}
          alt={props.personWithDebt.name}
        />
        <MoneyTransition>
          <Amount>
            {formatNumberWithSpaces(props.moneyAmountToReturn)}
            {props.currency}
          </Amount>
          <Arrow withArrowhead={props.moneyAmountToReturn! > 0} />
        </MoneyTransition>
        <RoundPicture
          size={10}
          src={IMG_PATHS(props.personWithoutDebt.avatar)}
          alt={props.personWithoutDebt.name}
        />
      </GeneralStateIllustration>
      {props.moneyAmountToReturn! > 0
        ? renderMoneyToReturnMsg()
        : renderNoMoneyToReturnMsg()}
    </GeneralState>
  )
}

const GeneralState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0 2rem 0;
  cursor: pointer;
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

export default SummaryLayout

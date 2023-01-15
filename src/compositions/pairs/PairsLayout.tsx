import { FC } from 'react'
import {
  FlexPageLayout,
  PageSizing,
  StyledWidget,
} from '../../../styles/utils/layout'
import styled from 'styled-components'
import NewPairPanel from './newPairPanel'
import { PairsSummariesWithUsersDetails } from '../../types/pair'
import { Summary } from '../../types/transaction'
import SummaryHeader from '../commons/summary'
import Header from '../commons/header'
import Footer from '../commons/footer'
import { FONT_SIZE_HEADER_TERTIARY } from '../../../styles/constants/fontSizes'
import { COLOR_FONT_PRIMARY } from '../../../styles/constants/colors'
import { convertDecimalCodeToHtmlSymbol } from '../../utils/functions/commons'
import {ARROW_RIGHT_DOTTED_DEC_CODE, SPACE_DEC_CODE} from '../../utils/constants/htmlCodes'

interface PairsLayoutProps {
  pairsSummariesWithUserDetails: PairsSummariesWithUsersDetails
  pairsIdsList: Array<string>
}

export const PairsLayout: FC<PairsLayoutProps> = (props: PairsLayoutProps) => {
  const noPairsFoundForUser = () => props.pairsIdsList.length === 0

  const renderPairSummary = (summary: Summary, pairId: string) => (
    <SummaryHeader
      key={pairId}
      summary={summary}
      userEmailToDetails={props.pairsSummariesWithUserDetails.usersDetails}
      // todo currency
      currency={'PLN'}
      pairId={pairId}
    />
  )

  const renderPairsSummaries = () =>
    props.pairsIdsList.map((pairId: string) =>
      renderPairSummary(
        props.pairsSummariesWithUserDetails.pairsSummaries[pairId],
        pairId,
      ),
    )

  const renderNoPairsMsg = () => (
    <NoPairMessage>
      Add a new pair to get started
      {convertDecimalCodeToHtmlSymbol(SPACE_DEC_CODE)}
      {convertDecimalCodeToHtmlSymbol(ARROW_RIGHT_DOTTED_DEC_CODE)}
    </NoPairMessage>
  )

  return (
    props.pairsSummariesWithUserDetails &&
    props.pairsIdsList && (
      <>
        <Header />
        <PageSizing>
          <FlexPage>
            <LeftPanel>
              <StyledWidget>
                {noPairsFoundForUser()
                  ? renderNoPairsMsg()
                  : renderPairsSummaries()}
              </StyledWidget>
            </LeftPanel>
            <RightPanel>
              <StyledWidget>
                <NewPairPanel />
              </StyledWidget>
            </RightPanel>
          </FlexPage>
        </PageSizing>
        <Footer />
      </>
    )
  )
}

const FlexPage = styled.div`
  ${FlexPageLayout};
  margin: 5rem 0;
  color: ${COLOR_FONT_PRIMARY};

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const LeftPanel = styled.div`
  width: 100%;
`

const RightPanel = styled.div`
  width: 100%;
`

const NoPairMessage = styled.span`
  font-size: ${FONT_SIZE_HEADER_TERTIARY};
`

export default PairsLayout

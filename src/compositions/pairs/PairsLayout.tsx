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
      userIdToDetails={props.pairsSummariesWithUserDetails.usersDetails}
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

  const renderNoPairsMsg = () => <>Add a new pair to get started.</>

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
`

const LeftPanel = styled.div`
  width: 100%;
`

const RightPanel = styled.div`
  width: 100%;
`

export default PairsLayout

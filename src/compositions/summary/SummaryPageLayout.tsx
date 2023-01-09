import { FC } from 'react'
import SummaryHeader from '../dashboard/summary/index'
import Header from '../dashboard/header'
import {
  FlexPageLayout,
  PageSizing,
  StyledWidget,
} from '../../../styles/utils/layout'
import styled from 'styled-components'
import Footer from '../dashboard/footer'
import NewPairPanel from './newPairPanel'
import { PairsSummariesWithUsersDetails } from '../../types/pair'
import { Summary } from '../../types/transaction'

interface SummaryPageLayoutProps {
  pairsSummariesWithUserDetails: PairsSummariesWithUsersDetails
  pairsIdsList: Array<string>
}

export const SummaryPageLayout: FC<SummaryPageLayoutProps> = (
  props: SummaryPageLayoutProps,
) => {
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

export default SummaryPageLayout

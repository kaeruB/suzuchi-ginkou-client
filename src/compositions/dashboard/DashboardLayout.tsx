import { FC, useState } from 'react'
import SummaryHeader from './summary/index'
import styled from 'styled-components'
import { FONT_SIZE_HEADER_SECONDARY } from '../../../styles/constants/fontSizes'
import History from './history/History'
import Modal from '../commons/Modal'
import {
  BigButton,
  ColoredButton,
  CustomButton,
  SmallRoundButton,
} from '../../../styles/components/button'
import { Currency } from '../../utils/constants/commons'
import TransactionForm from './transactionForm'
import Header from './header'
import Footer from './footer'
import {
  FlexCentered,
  FlexPageLayout,
  PageSizing,
  StyledWidget,
} from '../../../styles/utils/layout'
import { convertDecimalCodeToHtmlSymbol } from '../../utils/functions/commons'
import { ARROW_DOWN_DEC_CODE } from '../../utils/constants/htmlCodes'
import { DEFAULT_HISTORY_ITEMS } from '../../api/env'
import {
  Transaction,
  TransactionsWithUsersDetails,
} from '../../types/transaction'

interface DashboardLayoutProps {
  dashboardData: TransactionsWithUsersDetails
  fetchDashboardData: () => void
  loadMoreData: () => void
  pairId: string
}

export const DashboardLayout: FC<DashboardLayoutProps> = (
  props: DashboardLayoutProps,
) => {
  const [currency, setCurrency] = useState<Currency>(Currency.PLN)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [historyItemToEdit, setHistoryItemToEdit] =
    useState<Transaction | null>(null)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  const onShowCreateModal = () => {
    setIsEditMode(false)
    setHistoryItemToEdit(null)
    setShowModal(true)
  }

  const onShowEditModal = (transactionId: string) => {
    setIsEditMode(true)

    const transaction =
      props.dashboardData &&
      props.dashboardData.transactions.find(
        (t: Transaction) => t._id === transactionId,
      )
    transaction ? setHistoryItemToEdit(transaction) : setHistoryItemToEdit(null)

    setShowModal(true)
  }

  const renderShowMoreButton = () =>
    props.dashboardData &&
    props.dashboardData.transactions &&
    props.dashboardData.transactions.length > DEFAULT_HISTORY_ITEMS && (
      <LoadMoreButtonWrapper>
        <LoadMoreButton onClick={() => props.loadMoreData()}>
          {convertDecimalCodeToHtmlSymbol(ARROW_DOWN_DEC_CODE)}
        </LoadMoreButton>
      </LoadMoreButtonWrapper>
    )

  return (
    <>
      <Header />
      <PageSizing>
        <FlexPage>
          <LeftPanel>
            <StyledWidget>
              <SummaryHeader
                summary={props.dashboardData.summary}
                userIdToDetails={props.dashboardData.usersDetails}
                pairId={props.pairId}
                currency={currency}
              />
            </StyledWidget>

            <StyledWidget>
              <SubHeader>
                <span>Transactions</span>
                <CreateButton
                  onClick={() => onShowCreateModal()}
                  data-testid="btn-add-new-transaction"
                >
                  +
                </CreateButton>
              </SubHeader>
              <History
                historyData={props.dashboardData.transactions}
                currency={currency}
                onShowEditModal={onShowEditModal}
                fetchDashboardData={props.fetchDashboardData}
                userIdToDetails={props.dashboardData.usersDetails}
                pairId={props.pairId}
              />
              {renderShowMoreButton()}
            </StyledWidget>
          </LeftPanel>

          <RightPanel>
            <StyledWidget>
              <SubHeader>Statistics</SubHeader>
              <div>Here will be a chart.</div>
            </StyledWidget>
          </RightPanel>
        </FlexPage>
      </PageSizing>

      <Footer />

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={isEditMode ? 'Edit Transaction' : 'Add Transaction'}
      >
        <TransactionForm
          isEditMode={isEditMode}
          defaultValues={historyItemToEdit}
          fetchDashboardData={props.fetchDashboardData}
          setShowModal={setShowModal}
          userIdToDetails={props.dashboardData.usersDetails}
        />
      </Modal>
    </>
  )
}

const LeftPanel = styled.div`
  width: 100%;
`

const RightPanel = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const SubHeader = styled.h2`
  font-size: ${FONT_SIZE_HEADER_SECONDARY};
  display: flex;
  justify-content: space-between;
`

const CreateButton = styled(CustomButton)`
  ${ColoredButton};
  ${SmallRoundButton};
  ${FlexCentered};
`

const LoadMoreButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const LoadMoreButton = styled(CustomButton)`
  ${BigButton};
  padding: 0 2rem;
`

const FlexPage = styled.div`
  ${FlexPageLayout};
  margin: 5rem 0;
`

export default DashboardLayout

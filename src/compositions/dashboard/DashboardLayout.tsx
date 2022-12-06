import { FC, useState } from 'react'
import { BankState, Transaction } from '../../types/bankState'
import SummaryHeader from './summary/SummaryHeader'
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

interface DashboardLayoutProps {
  dashboardData: BankState
  fetchDashboardData: () => void
  loadMoreData: () => void
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
      props.dashboardData.history.find(
        (t: Transaction) => t._id === transactionId,
      )
    transaction ? setHistoryItemToEdit(transaction) : setHistoryItemToEdit(null)

    setShowModal(true)
  }

  return (
    <>
      <Header />
      <PageSizing>
        <FlexPage>
          <LeftPanel>
            <StyledWidget>
              <SummaryHeader
                summary={props.dashboardData.summary}
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
                historyData={props.dashboardData.history}
                currency={currency}
                onShowEditModal={onShowEditModal}
                fetchDashboardData={props.fetchDashboardData}
              />
              <LoadMoreButton onClick={() => props.loadMoreData()}>
                Load More Data
              </LoadMoreButton>
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

const LoadMoreButton = styled(CustomButton)`
  ${ColoredButton};
  ${BigButton};
  max-width: 60rem;
`

const FlexPage = styled.div`
  ${FlexPageLayout};
  margin: 5rem 0;
`

export default DashboardLayout

import { FC, useState } from 'react'
import { BankState, Transaction } from '../../types/bankState'
import Header from './header/Header'
import styled from 'styled-components'
import { FONT_SIZE_HEADER_SECONDARY } from '../../../styles/constants/fontSizes'
import History from './history/History'
import Modal from '../commons/Modal'
import { CustomButton } from '../../../styles/components/button'
import { Currency } from '../../utils/constants/commons'
import TransactionForm from "./transactionForm";

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
      <DashboardWrapper>
        <LeftPanel>
          <Header summary={props.dashboardData.summary} currency={currency} />
          <CreateButton
            onClick={() => onShowCreateModal()}
            data-testid="btn-add-new-transaction"
          >
            Add New Transaction
          </CreateButton>
        </LeftPanel>

        <RightPanel>
          <SubHeader>Transaction History</SubHeader>
          <History
            historyData={props.dashboardData.history}
            currency={currency}
            onShowEditModal={onShowEditModal}
            fetchDashboardData={props.fetchDashboardData}
          />
          <LoadMoreButton onClick={() => props.loadMoreData()}>
            Load More Data
          </LoadMoreButton>
        </RightPanel>
      </DashboardWrapper>

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

const DashboardWrapper = styled.div`
  width: 100%;
`

const LeftPanel = styled.div`
  width: 33%;
  float: left;
`

const RightPanel = styled.div`
  width: 64%;
  float: right;
`

const SubHeader = styled.h2`
  font-size: ${FONT_SIZE_HEADER_SECONDARY};
`

const CreateButton = styled(CustomButton)`
  margin-top: 10rem;
`

const LoadMoreButton = styled(CustomButton)`
  max-width: 60rem;
  margin: 3rem;
`

export default DashboardLayout

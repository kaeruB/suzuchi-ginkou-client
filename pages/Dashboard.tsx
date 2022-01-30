import { FC, useEffect, useState } from 'react'
import { BankState, Currency, Transaction } from './models/types'
import { BankStateTemporaryMock } from './mock/data'
import Header from './components/header/Header'
import styled from 'styled-components'
import { FONT_SIZE_HEADER_SECONDARY } from './styles/constants/fontSizes'
import History from './components/history/History'
import Modal from './components/common/Modal'
import { CustomButton } from './styles/components/button'
import { URL_TRANSACTION_SUMMARY } from './utils/constants/endpoints'
import { fetchTransactions } from './api/transaction'
import TransactionForm from './components/TransactionForm'

export const Dashboard: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dashboardData, setDashboardData] = useState<BankState | null>(null)
  const [currency, setCurrency] = useState<Currency>(Currency.PLN)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [historyItemToEdit, setHistoryItemToEdit] =
    useState<Transaction | null>(null)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  const fetchDashboardData = async () => {
    const responseData = await fetchTransactions(URL_TRANSACTION_SUMMARY)
    responseData
      ? setDashboardData(responseData)
      : setDashboardData(BankStateTemporaryMock)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  const onShowCreateModal = () => {
    setIsEditMode(false)
    setHistoryItemToEdit(null)
    setShowModal(true)
  }

  const onShowEditModal = (transactionId: string) => {
    setIsEditMode(true)

    const transaction =
      dashboardData &&
      dashboardData.history.find((t: Transaction) => t._id === transactionId)
    transaction ? setHistoryItemToEdit(transaction) : setHistoryItemToEdit(null)

    setShowModal(true)
  }

  return (
    dashboardData && (
      <DashboardWrapper>
        <LeftPanel>
          <Header summary={dashboardData.summary} currency={currency} />
          <CustomButton onClick={() => onShowCreateModal()} data-testid="btn-add-new-transaction">
            Add New Transaction
          </CustomButton>
        </LeftPanel>

        <RightPanel>
          <SubHeader>Transaction History</SubHeader>
          <History
            historyData={dashboardData.history}
            currency={currency}
            onShowEditModal={onShowEditModal}
            fetchDashboardData={fetchDashboardData}
          />

          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            title={isEditMode ? 'Edit Transaction' : 'Add Transaction'}
          >
            <TransactionForm
              isEditMode={isEditMode}
              defaultValues={historyItemToEdit}
              fetchDashboardData={fetchDashboardData}
              setShowModal={setShowModal}
            />
          </Modal>
        </RightPanel>
      </DashboardWrapper>
    )
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

export default Dashboard

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
import { DEFAULT_HISTORY_ITEMS } from './api/env'

export const Dashboard: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dashboardData, setDashboardData] = useState<BankState | null>(null)
  const [currency, setCurrency] = useState<Currency>(Currency.PLN)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [historyItemToEdit, setHistoryItemToEdit] =
    useState<Transaction | null>(null)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [historyListLength, setHistoryListLength] = useState<number>(
    DEFAULT_HISTORY_ITEMS,
  )

  const fetchDashboardData = async () => {
    const responseData = await fetchTransactions(
      URL_TRANSACTION_SUMMARY,
      historyListLength,
    )
    responseData
      ? setDashboardData(responseData)
      : setDashboardData(BankStateTemporaryMock)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [historyListLength])

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

  const loadMoreData = () => {
    const newHistoryListLength = historyListLength + DEFAULT_HISTORY_ITEMS
    setHistoryListLength(newHistoryListLength)
  }

  return (
    dashboardData && (
      <>
        <DashboardWrapper>
          <LeftPanel>
            <Header summary={dashboardData.summary} currency={currency} />
            <CreateButton onClick={() => onShowCreateModal()}>
              Add New Transaction
            </CreateButton>
          </LeftPanel>

          <RightPanel>
            <SubHeader>Transaction History</SubHeader>
            <History
              historyData={dashboardData.history}
              currency={currency}
              onShowEditModal={onShowEditModal}
              fetchDashboardData={fetchDashboardData}
            />
            <LoadMoreButton onClick={() => loadMoreData()}>
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
            fetchDashboardData={fetchDashboardData}
            setShowModal={setShowModal}
          />
        </Modal>
      </>
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

const CreateButton = styled(CustomButton)`
  margin-top: 10rem;
`

const LoadMoreButton = styled(CustomButton)`
  max-width: 60rem;
  margin: 3rem;
`

export default Dashboard

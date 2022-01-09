import { FC, MouseEvent, useEffect, useState } from 'react'
import {
  BankState,
  Currency,
  PopupType,
  RequestMethod,
  Transaction,
} from './models/types'
import { BankStateTemporaryMock } from './mock/data'
import CreateTransactionForm from './components/TransactionForm'
import Header from './components/header/Header'
import styled from 'styled-components'
import { FONT_SIZE_HEADER_SECONDARY } from './styles/constants/fontSizes'
import History from './components/history/History'
import Modal from './components/common/Modal'
import { CustomButton } from './styles/components/button'
import { URL_TRANSACTION_SUMMARY } from './utils/constants/endpoints'
import { fetchTransactions } from './api/transaction'

export const Dashboard: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dashboardData, setDashboardData] = useState<BankState | null>(null)
  const [currency, setCurrency] = useState<Currency>(Currency.PLN)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [historyItemToEdit, setHistoryItemToEdit] =
    useState<Transaction | null>(null)
  const [addOrUpdateMode, setAddOrUpdateMode] = useState<PopupType | null>(null)

  async function fetchDashboardData() {
    const responseData = await fetchTransactions(URL_TRANSACTION_SUMMARY)
    responseData
      ? setDashboardData(responseData)
      : setDashboardData(BankStateTemporaryMock) // fixme: mock
    setIsLoading(false)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  const showAddOrEditPopup = (
    e: MouseEvent,
    addOrUpdate: PopupType,
    transactionId?: string,
  ) => {
    setAddOrUpdateMode(addOrUpdate)
    if (addOrUpdate === PopupType.ADD) {
      setHistoryItemToEdit(null)
    } else if (dashboardData) {
      const transaction = dashboardData.history.find(
        (t) => t._id === transactionId,
      )
      if (transaction) {
        setHistoryItemToEdit(transaction)
      } else {
        setHistoryItemToEdit(null)
      }
    }

    setShowModal(true)
  }

  return (
    dashboardData && (
      <DashboardWrapper>
        <LeftPanel>
          <Header summary={dashboardData.summary} currency={currency} />
          <CustomButton
            onClick={(e: MouseEvent) => showAddOrEditPopup(e, PopupType.ADD)}
          >
            Add New Transaction
          </CustomButton>
        </LeftPanel>

        <RightPanel>
          <SubHeader>Transaction History</SubHeader>
          <History
            historyData={dashboardData.history}
            currency={currency}
            showAddOrEditPopup={showAddOrEditPopup}
            fetchDashboardData={fetchDashboardData}
          />

          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            title={
              addOrUpdateMode === PopupType.ADD
                ? 'Add Transaction'
                : 'Edit Transaction'
            }
          >
            <CreateTransactionForm
              requestMethod={
                addOrUpdateMode === PopupType.ADD
                  ? RequestMethod.POST
                  : RequestMethod.PATCH
              }
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

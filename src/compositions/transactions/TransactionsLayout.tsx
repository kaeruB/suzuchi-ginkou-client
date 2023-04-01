import { FC, useState } from 'react'
import SummaryHeader from '../commons/summary/index'
import styled from 'styled-components'
import {
  FONT_SIZE_HEADER_SECONDARY,
  FONT_SIZE_HEADER_TERTIARY,
} from '../../../styles/constants/fontSizes'
import History from './history/History'
import Modal from '../commons/Modal'
import {
  BigButton,
  CreateButton,
  CustomButton,
} from '../../../styles/components/button'
import { Currency } from '../../utils/constants/commons'
import TransactionForm from './form'
import Header from '../commons/header'
import Footer from '../commons/footer'
import {
  FlexPageLayout,
  PageSizing,
  StyledWidget,
} from '../../../styles/utils/layout'
import { convertDecimalCodeToHtmlSymbol } from '../../utils/functions/commons'
import { ARROW_DOWN_DEC_CODE } from '../../utils/constants/htmlCodes'
import {
  Transaction,
  TransactionsWithUsersDetails,
} from '../../types/transaction'
import { COLOR_FONT_SECONDARY } from '../../../styles/constants/colors'
import { downloadTransactionInfoCsvFiles } from '../../utils/functions/csv'

interface TransactionsLayoutProps {
  transactionsAndUserDetails: TransactionsWithUsersDetails
  fetchTransactionsAndUserDetails: () => void
  loadMoreData: () => void
  pairId: string
  showMoreButton: boolean
}

export const TransactionsLayout: FC<TransactionsLayoutProps> = (
  props: TransactionsLayoutProps,
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
      props.transactionsAndUserDetails &&
      props.transactionsAndUserDetails.transactions.find(
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
                summary={props.transactionsAndUserDetails.summary}
                userEmailToDetails={
                  props.transactionsAndUserDetails.usersDetails
                }
                pairId={props.pairId}
                currency={currency}
              />
            </StyledWidget>

            <StyledWidget>
              <SubHeader>
                <span>Transactions</span>
                <ButtonsWrapper>
                  <CreateButton
                    onClick={() =>
                      downloadTransactionInfoCsvFiles(
                        props.transactionsAndUserDetails,
                      )
                    }
                  >
                    CSV
                  </CreateButton>
                  <CreateButton
                    onClick={() => onShowCreateModal()}
                    data-testid="btn-add-new-transaction"
                  >
                    +
                  </CreateButton>
                </ButtonsWrapper>
              </SubHeader>
              <History
                historyData={props.transactionsAndUserDetails.transactions}
                currency={currency}
                onShowEditModal={onShowEditModal}
                fetchTransactionsAndUserDetails={
                  props.fetchTransactionsAndUserDetails
                }
                userEmailToDetails={
                  props.transactionsAndUserDetails.usersDetails
                }
                pairId={props.pairId}
              />
              {props.showMoreButton && (
                <MoreButtonWrapper>
                  <MoreButton onClick={() => props.loadMoreData()}>
                    {convertDecimalCodeToHtmlSymbol(ARROW_DOWN_DEC_CODE)}
                  </MoreButton>
                </MoreButtonWrapper>
              )}
            </StyledWidget>
          </LeftPanel>

          <RightPanel>
            <StyledWidget>
              <SubHeader>Statistics</SubHeader>
              <NoStatisticsInfo>No statistics to display</NoStatisticsInfo>
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
          fetchTransactionsAndUserDetails={
            props.fetchTransactionsAndUserDetails
          }
          setShowModal={setShowModal}
          userEmailToDetails={props.transactionsAndUserDetails.usersDetails}
          pairId={props.pairId}
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
`

const SubHeader = styled.h2`
  font-size: ${FONT_SIZE_HEADER_SECONDARY};
  display: flex;
  justify-content: space-between;
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 1rem;
`

const MoreButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const MoreButton = styled(CustomButton)`
  ${BigButton};
  padding: 0 2rem;
`

const FlexPage = styled.div`
  ${FlexPageLayout};
  margin: 5rem 0;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const NoStatisticsInfo = styled.div`
  font-size: ${FONT_SIZE_HEADER_TERTIARY};
  color: ${COLOR_FONT_SECONDARY};
  margin-top: 3rem;
`

export default TransactionsLayout

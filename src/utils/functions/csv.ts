import {Summary, Transaction, TransactionsWithUsersDetails} from "../../types/transaction";
import {convertTimestampToDateString, getCurrentTimestamp} from "./commons";

const CSV_FILE_HEADER = 'data:text/csv;charset=utf-8,'
const NEW_LINE = '\n'

const joinRowValuesWithComma = (rowValues: Array<string | number>): string => rowValues.join(',')
const makeCsvTitleRow = (columnTitles: Array<string>): string => joinRowValuesWithComma(columnTitles) + NEW_LINE
const joinRowsWithNewLine = (stringRows: Array<string>): string => stringRows.join(NEW_LINE)

const makeCsvContent = (columnIds: Array<string>, rows: Array<Array<string | number>>): string =>
  CSV_FILE_HEADER + makeCsvTitleRow(columnIds) + joinRowsWithNewLine(rows.map(row => joinRowValuesWithComma(row)))

const downloadCsv = (title: string, columnIds: Array<string>, data: Array<Array<string | number>>): void => {
  const csvContent = makeCsvContent(columnIds, data)

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${title}_${convertTimestampToDateString(getCurrentTimestamp())}.csv`);
  document.body.appendChild(link); // Required for FF

  link.click();
}

const downloadTransactions = (transactions: Array<Transaction>): void => {
  const columnIds = transactions.length > 0 ? Object.keys(transactions[0]) : []
  const transactionsData = transactions.map(transaction => Object.values(transaction))
  downloadCsv('Transactions', columnIds, transactionsData)
}

const downloadSummary = (summary: Summary): void => {
  const columnIds = Object.keys(summary)
  const summaryData = [Object.values(summary)]
  downloadCsv('Summary', columnIds, summaryData)
}

export const downloadTransactionInfoCsvFiles = (transactionsAndUserDetails: TransactionsWithUsersDetails) => {
  downloadTransactions(transactionsAndUserDetails.transactions)
  downloadSummary(transactionsAndUserDetails.summary)
}

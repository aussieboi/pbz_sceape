import axios from "axios";

async function useAPI(position, headers) {
  let dateFrom = "01.01.2014.";
  let dateTo = "16.02.2020.";
  let calculatedURL = `https://internetbanking.pbz.hr/web/bankAccountTransactions/fetchBankAccountTransactions?position=${position}&direction=ALL&amountFrom=&amountTo=&dateFrom=${dateFrom}&dateTo=${dateTo}&accountIndex=0&bankAccountMainGroup=PERSONAL_ACCOUNTS&accountCurrencyCode=191&payeeName=&payeeAccountNumber=&transactionType=ALL&accountCurrencyLabel=HRK&filterActivated=true`;
  return await axios.get(calculatedURL, {
    headers
  });
}

const axios = require("axios");
const fs = require("fs");
const parser = require("./useParse");

async function getTransactionsFromAPI(dateFrom, dateTo, pos, headers) {
  let APIPREFIX =
    "https://internetbanking.pbz.hr/web/bankAccountTransactions/fetchBankAccountTransactions";
  let _dateFrom = dateFrom || "01.01.2014.";
  let _dateTo = dateTo || "16.02.2020.";
  let position = pos || "0";
  let APIURL = `${APIPREFIX}?position=${position}&direction=ALL&amountFrom=&amountTo=&dateFrom=${_dateFrom}&dateTo=${_dateTo}&accountIndex=0&bankAccountMainGroup=PERSONAL_ACCOUNTS&accountCurrencyCode=191&payeeName=&payeeAccountNumber=&transactionType=ALL&accountCurrencyLabel=HRK&filterActivated=true`;

  const API = axios.create({
    headers: headers
  });
  let { data } = await API.get(APIURL);
  console.log(
    `Getting data from ${dateFrom} - ${dateTo} : page data ${position}`
  );
  let htmlFileName = `transactions_from_${dateFrom}_to_${dateTo}`;

  if (parser.hasTransactions(data)) {
    fs.writeFileSync(`./tmp/${htmlFileName}.html`, data);
  } else {
    console.warn("No Transaction Data");
    return false;
  }
  return data;
}

module.exports = {
  getTransactionsFromAPI
};

const parser = require("node-html-parser");
const fs = require("fs");
const dialectMap = require("./dialectMap.js");
const toCamelCase = str => {
  let s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join("");
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

const removeDiacritics = str => {
  for (var i = 0; i < dialectMap.length; i++) {
    str = str.replace(dialectMap[i].letters, dialectMap[i].base);
  }
  return str;
};

/* List of Transactions Raw */
function hasTransactions(response) {
  let inputHTML = parser.parse(response);
  let data = inputHTML
    .removeWhitespace()
    .querySelector(".transaction.activityItem");
  return data ? true : false;
}

function startParse(pathToHtml, options) {
  let inputHTML = null;

  if (options && options.isString === true) {
    inputHTML = parser.parse(pathToHtml);
  } else {
    inputHTML = parser.parse(fs.readFileSync(pathToHtml, "utf-8"));
  }

  let parsedTransactions = [];
  let rawTransactions = inputHTML
    .removeWhitespace()
    .querySelectorAll(".transaction.activityItem");
  rawTransactions.forEach(transaction => {
    parsedTransactions.push(getTransactionData(transaction));
  });
  return parsedTransactions;
}

/* Parse Transaction */
function getTransactionData(transaction) {
  let transactionID = getTransactionID(transaction);
  let transactionDetails = getTransactionDetails(transaction);

  return {
    transactionId: String(transactionID),
    ...transactionDetails
  };
}

/* Get Transaction ID */
function getTransactionID(transaction) {
  return transaction
    .querySelector(".collapse-transaction-details")
    .getAttribute("transaction-id");
}

function getTransactionDetails(transaction) {
  let transactionDetailsRowsData = {};
  transaction
    .querySelectorAll(".transaction-details--row")
    .forEach(transactionDetails => {
      transactionDetails
        .querySelectorAll(".transaction-detail")
        .forEach(item => {
          let x = getTransactionDetailItemData(item);
          transactionDetailsRowsData = {
            ...transactionDetailsRowsData,
            ...x
          };
        });
    });
  return transactionDetailsRowsData;
}

function getTransactionDetailItemData(detailItem) {
  let key = detailItem.querySelector(".headling").innerHTML;
  let value = detailItem.querySelector(".cq-inner").innerHTML;

  return {
    [toCamelCase(removeDiacritics(key))]: value
  };
}

module.exports = {
  startParse,
  hasTransactions
};

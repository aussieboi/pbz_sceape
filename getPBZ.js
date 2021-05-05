const parser = require("./src/useParse");
const useAPI = require("./src/getTransactions");
var fs = require("fs");

let headers = {
  Cookie:
    "X-CSRF-Token=fc96cb24-f99f-4ad1-8f47-2d6a8a8fee0a; bmuid=1561209405709-6E5CA5E9-4061-497A-8205-869F5E83EDA1; _ga=GA1.2.885771941.1577667616; WRUID=2582072812896440; tutorialCookieChecked=0; localeCookiePBZ=en_HR; _gid=GA1.2.604505820.1582746603; cdSNum=1582746614677-sji0000755-3b6e2c78-94df-451c-ab74-2b478bf8315e; __CT_Data=gpv=12&ckp=tld&dm=pbz.hr&apv_44_www56=13&cpv_44_www56=13&rpv_44_www56=4; ctm=eydwZ3YnOjQ2NzcxMDE3MjU5NjcxMDl8J3ZzdCc6MTg4MjUzOTE2NDk0ODU3MnwndnN0cic6MzQ3OTg3MzIyMTk2NTQ4NXwnaW50cic6MTU4Mjc0OTE4NjI2Mnwndic6MXwnbHZzdCc6MTI4MjF9; JSESSIONID=0001CGgd8iHF0DnpF2CwZNG9EpJ:1bgfpdg0u; cdContextId=96"
};
let dir = __dirname + "/tmp";

if (fs.existsSync(dir)) {
  fs.rmdirSync(dir, { recursive: true });
}
fs.mkdirSync(dir);

async function awaitAPI() {
  let data = await useAPI.getTransactionsFromAPI(
    "14.08.2016.",
    "16.02.2020.",
    900,
    headers
  );
  let transactionData = parser.startParse(data, { isString: true });
  return transactionData;
}

awaitAPI();

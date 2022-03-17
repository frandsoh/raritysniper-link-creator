const args = process.argv.slice(2);
import fetch from "node-fetch";
import { polygonScanAPI } from "./config.mjs";

async function fetchData(address) {
  let url = [
    "https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=0xe0c6ad7b53227ed95333d9e9f9f15deea4f7f12d&address=",
    address,
    "&startblock=0&endblock=99999999&sort=asc&apikey=",
    polygonScanAPI,
  ].join("");
  let response = await fetch(url);

  if (response.status === 200) {
    let data = await response.json();
    let result = data.result;

    return result;
  }
}

function toAddress(address, resultArray) {
  let tokenIDArray = [];
  for (const x in resultArray) {
    if (resultArray[x].to == address.toLowerCase()) {
      tokenIDArray.push(resultArray[x].tokenID);
    }
  }

  return tokenIDArray;
}

function fromAddress(address, resultArray) {
  let tokenIDArray = [];
  for (const x in resultArray) {
    if (resultArray[x].from == address.toLowerCase()) {
      tokenIDArray.push(resultArray[x].tokenID);
    }
  }
  return tokenIDArray;
}

async function holdsToken(address) {
  let resultArray = await fetchData(address);
  let tokenIn = toAddress(address, resultArray);
  let tokenOut = fromAddress(address, resultArray);

  let holdings = [];
  let count_in = {};
  let count_out = {};
  for (const num of tokenIn) {
    count_in[num] = count_in[num] ? count_in[num] + 1 : 1;
  }
  for (const num of tokenOut) {
    count_out[num] = count_out[num] ? count_out[num] + 1 : 1;
  }

  for (const x in count_in) {
    if (count_in[x] > count_out[x] || typeof count_out[x] === "undefined") {
      holdings.push(x);
    }
  }
  return holdings;
}

async function createRaritySniperURL(address) {
  let URL = "https://raritysniper.com/cryptoburbs";
  const holdings = await holdsToken(address);
  return URL + "?nftId=" + holdings.join("&nftId=");
}

console.log(await createRaritySniperURL(args[0]));

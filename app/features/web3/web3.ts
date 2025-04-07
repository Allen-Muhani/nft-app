import Web3 from "web3";

export let web3Js: Web3 | null = null;

export function setWeb3Js(web3: Web3) {
  web3Js = web3;
}

export const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

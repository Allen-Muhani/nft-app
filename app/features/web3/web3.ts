import Web3 from "web3";
import { CERTIFICATE_ABI } from "./abis/certificate.abi";

export let web3Js: Web3 | null = null;

export function setWeb3Js(web3: Web3) {
  web3Js = web3;
}
export function get_fractional_contract(address: String) {
  if (web3Js == null) {
    return null;
  } else {
    return new web3Js.eth.Contract(CERTIFICATE_ABI, address.toString());
  }
}

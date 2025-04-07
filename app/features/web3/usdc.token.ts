import { FRACTION_ABI } from "./abis/fraction.abi";
import { web3Js } from "./web3";

export const USDC_TOKEN = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

export function get_usdc_contract() {
  if (web3Js == null) {
    return null;
  } else {
    // ABI should work as both are ERC20.
    return new web3Js.eth.Contract(FRACTION_ABI, USDC_TOKEN);
  }
}

export async function usdc_approve(token_address: String, amount: Number) {
  const accs = (await web3Js?.eth.getAccounts()) ?? [];
  const contract = get_usdc_contract();
  const tx = contract?.methods
    .approve(token_address, amount.valueOf() + 1000)
    .send({ from: accs[0] });
  return tx;
}

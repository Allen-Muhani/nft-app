import { FRACTION_ABI } from "./abis/fraction.abi";
import { web3Js } from "./web3";

export function get_fractional_contract(address: String) {
  if (web3Js == null) {
    return null;
  } else {
    return new web3Js.eth.Contract(FRACTION_ABI, address.toString());
  }
}

export async function buy(token_address: String, amount: Number) {
  const accs = (await web3Js?.eth.getAccounts()) ?? [];
  const contract = get_fractional_contract(token_address);
  const tx = contract?.methods.buy(amount).send({ from: accs[0] });
  return tx;
}

export async function sell(token_address: String, amount: Number) {
  const accs = (await web3Js?.eth.getAccounts()) ?? [];
  const contract = get_fractional_contract(token_address);
  const tx = contract?.methods.sell(amount).send({ from: accs[0] });
  return tx;
}

export async function get_token_balance(
  token_address: String,
  owner_address: String
) {
  const contract = get_fractional_contract(token_address);
  const result = await contract?.methods.balanceOf(owner_address).call();
  console.log("result ===>", result);
  return Number(result);
}

export async function get_token_price(token_address: String) {
  const contract = get_fractional_contract(token_address);
  const result = await contract?.methods.priceInUsdc().call();
  return Number(result);
}

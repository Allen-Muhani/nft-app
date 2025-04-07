import type { NFTCert } from "../fetch_nfts/types";
import { CERTIFICATE_ABI } from "./abis/certificate.abi";
import { get_token_balance, get_token_price } from "./fractional.token.utils";
import { EMPTY_ADDRESS, web3Js } from "./web3";

export const CERT_ADDRESS = "0xb9854498394529871D18ECe1F1b5cd5dcAF9a8Ab";

function certificate_nft_contract() {
  if (web3Js == null) {
    return null;
  } else {
    return new web3Js.eth.Contract(CERTIFICATE_ABI, CERT_ADDRESS);
  }
}

export async function mint_cert(code: String) {
  const accs = (await web3Js?.eth.getAccounts()) ?? [];
  const contract = certificate_nft_contract();
  const tx = contract?.methods.safeMint(accs[0], code).send({ from: accs[0] });
  return tx;
}

export async function fetch_cert(id: Number) {
  const contract = certificate_nft_contract();
  const result = await contract?.methods.tokenURI(id).call();
  return (result ?? "").toString();
}

export async function get_next_id() {
  const contract = certificate_nft_contract();
  const result = await contract?.methods.nextCertificateId().call();
  return Number(result?.toString());
}

export async function get_fractional_token_id(id: Number) {
  const contract = certificate_nft_contract();
  const result = await contract?.methods.fractionErc20Token(id).call();
  return (result ?? "").toString();
}

export async function get_token_info(certId: Number) {
  const accs = (await web3Js?.eth.getAccounts()) ?? [];
  const code = await fetch_cert(certId);
  const fractional_address = await get_fractional_token_id(certId);

  if (fractional_address == EMPTY_ADDRESS) {
    const x: NFTCert = {
      id: certId,
      code: code,
      fractionAddress: "",
      dateCreated: "12-12-2024",
      availablekWts: 0,
      myBalance: 0,
      price: 0,
    };

    return x;
  }
  // const my_balance = await get_token_balance(fractional_address, ownerAddress);
  // const available = await get_token_balance(fractional_address, CERT_ADDRESS);
  // const price = await get_token_price(fractional_address);
  // const code = await fetch_cert(certId);

  const [my_balance, available, price] = await Promise.all([
    get_token_balance(fractional_address, accs[0]),
    get_token_balance(fractional_address, CERT_ADDRESS),
    get_token_price(fractional_address),
  ]);

  const cert: NFTCert = {
    id: certId,
    code: code,
    fractionAddress: fractional_address,
    dateCreated: "12-12-2024",
    availablekWts: available,
    myBalance: my_balance,
    price: price,
  };

  return cert;
}

import { CERTIFICATE_ABI } from "./abis/certificate.abi";
import { web3Js } from "./web3";

function certificate_nft_contract() {
  if (web3Js == null) {
    return null;
  } else {
    return new web3Js.eth.Contract(
      CERTIFICATE_ABI,
      "0xdb0A5E3cFC5dA99320a15A1466cbbad45847E238"
    );
  }
}

export async function mint_cert(code: String) {
  const accs = (await web3Js?.eth.getAccounts()) ?? [];
  const contract = certificate_nft_contract();
  const tx = contract?.methods
    .safeMint(accs[0], code, "")
    .send({ from: accs[0] });
  return tx;
}

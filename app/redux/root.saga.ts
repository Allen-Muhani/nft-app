import { spawn } from "redux-saga/effects";
import { buy_sell_sagas } from "~/features/buy_and_sell_tokens/sagas";
import { nft_cert_colletcion_sagas } from "~/features/fetch_nfts/sagas";
import { fractionize_sagas } from "~/features/fractionize_cetificate/sagas";
import { mint_sagas } from "~/features/minting_certificate/sagas";

export function* root_saga() {
  yield spawn(mint_sagas);
  yield spawn(buy_sell_sagas);
  yield spawn(fractionize_sagas);
  yield spawn(nft_cert_colletcion_sagas);
}

import { spawn } from "redux-saga/effects";
import { mint_sagas } from "~/features/minting_certificate/sagas";

export function* root_saga() {
  yield spawn(mint_sagas);
}

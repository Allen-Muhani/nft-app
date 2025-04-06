import { spawn, takeLatest } from "redux-saga/effects";
import { Actions, type ActionStartFetching } from "./actions";

export function* fetch_nft_cert_colletion(action: ActionStartFetching) {
  console.log("===============================>", action);
}

/**
 * Watches the restore existing account action.
 */
export function* watch_fetch_nft_cert_colletion() {
  yield takeLatest(Actions.START, fetch_nft_cert_colletion);
}

/**
 * Root saga of the module/feature.
 */
export function* nft_cert_colletcion_sagas() {
  yield spawn(watch_fetch_nft_cert_colletion);
}

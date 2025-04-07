import { call, put, spawn, takeLatest } from "redux-saga/effects";
import { Actions, type ActionStartFetching } from "./actions";
import { get_next_id, get_token_info } from "../web3/certificate.utils";
import type { NFTCert } from "./types";
import { generateActionSetNFT } from "./actions.generators";

export function* fetch_nft_cert_colletion(action: ActionStartFetching) {
  // try {

  // } catch (error) {

  // }
  const nextCertID: Number = yield call(get_next_id);
  for (let index = nextCertID.valueOf() - 1; index >= 0; index--) {
    const cert: NFTCert = yield call(get_token_info, index);
    yield put(generateActionSetNFT(cert));
  }
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

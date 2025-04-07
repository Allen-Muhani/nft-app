import { call, put, spawn, takeLatest } from "redux-saga/effects";
import { Actions, type ActionStartFractionizing } from "./actions";
import type { TransactionReceipt } from "web3";
import { fractionalize_cert } from "../web3/certificate.utils";
import {
  generateActionErrorFractionizing,
  generateActionSuccessFractionizing,
} from "./actions.generators";

export function* fractionize_token(action: ActionStartFractionizing) {
  try {
    const tx: TransactionReceipt = yield call(
      fractionalize_cert,
      action.certificateId
    );

    console.log("====================>", tx, tx?.events);
    // const tokenId = tx?.events?.Transfer.returnValues.tokenId;
    // if (tokenId) {
    //   yield put(generateActionSuccessFractionizing(""));
    // } else {
    //   yield put(
    //     generateActionErrorFractionizing(
    //       `Error fractionizing NFT CERT ${action.certificateId}`
    //     )
    //   );
    // }
  } catch (error) {
    yield put(
      generateActionErrorFractionizing(
        `Error fractionizing NFT CERT ${action.certificateId}`
      )
    );
  }
}

/**
 * Watches the restore existing account action.
 */
export function* watch_fractionize_token() {
  yield takeLatest(Actions.START, fractionize_token);
}

/**
 * Root saga of the module/feature.
 */
export function* fractionize_sagas() {
  yield spawn(watch_fractionize_token);
}

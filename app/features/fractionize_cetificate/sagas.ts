import { call, put, spawn, takeLatest } from "redux-saga/effects";
import { Actions, type ActionStartFractionizing } from "./actions";
import type { TransactionReceipt } from "web3";
import { fractionalize_cert } from "../web3/certificate.utils";
import {
  generateActionErrorFractionizing,
  generateActionSuccessFractionizing,
} from "./actions.generators";
import { generateActionStartFetchingNFT } from "../fetch_nfts/actions.generators";
import { set_usdc } from "../web3/fractional.token.utils";

export function* fractionize_token(action: ActionStartFractionizing) {
  try {
    const tx: TransactionReceipt = yield call(
      fractionalize_cert,
      action.certificateId
    );

    const erc20Address =
      tx?.events?.CertificateFractionalized.returnValues.erc20Address;

    if (erc20Address) {
      const x: TransactionReceipt = yield call(
        set_usdc,
        erc20Address ? String(erc20Address) : ""
      );
      if (x.status == 1) {
        yield put(generateActionStartFetchingNFT());
        yield put(
          generateActionSuccessFractionizing(
            erc20Address ? String(erc20Address) : ""
          )
        );
      } else {
        yield put(
          generateActionErrorFractionizing(
            `Error setting USDc Token address for CERT ${action.certificateId}`
          )
        );
      }
    } else {
      console.log("error", tx.status, tx, action);
      yield put(
        generateActionErrorFractionizing(
          `Error fractionizing NFT CERT ${action.certificateId}`
        )
      );
    }
  } catch (error) {
    console.log("error", error);
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

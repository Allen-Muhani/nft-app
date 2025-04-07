import { call, put, spawn, takeLatest } from "redux-saga/effects";
import { Actions, type ActionStartMinting } from "./actions";
import { mint_cert } from "../web3/certificate.utils";
import type { TransactionReceipt } from "web3";
import { generateActionErrorFetchingNFT } from "../fetch_nfts/actions.generators";
import { generateActionSuccesMinting } from "./actions.generators";

export function* mint_token(action: ActionStartMinting) {
  try {
    const tx: TransactionReceipt = yield call(
      mint_cert,
      action.certificateCode
    );
    const tokenId = tx?.events?.Transfer.returnValues.tokenId;
    if (tokenId) {
      yield put(generateActionSuccesMinting(Number(tokenId)));
    } else {
      yield put(
        generateActionErrorFetchingNFT(
          "Failed to create NFT. Kindly check the logs"
        )
      );
    }
  } catch (error) {
    yield put(
      generateActionErrorFetchingNFT(
        "Failed to create NFT. Kindly check the logs"
      )
    );
  }
}

/**
 * Watches the restore existing account action.
 */
export function* watch_mint_token() {
  yield takeLatest(Actions.START, mint_token);
}

/**
 * Root saga of the module/feature.
 */
export function* mint_sagas() {
  yield spawn(watch_mint_token);
}

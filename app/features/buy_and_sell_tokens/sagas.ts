import { call, put, spawn, takeLatest } from "redux-saga/effects";
import { Actions, type ActionStartBuy, type ActionStartSell } from "./actions";
import { buy, sell } from "../web3/fractional.token.utils";
import type { TransactionReceipt } from "web3";
import {
  generateActionSuccesBuy,
  generateActionErrorBuySell,
} from "./actions.generators";
import { generateActionStartFetchingNFT } from "../fetch_nfts/actions.generators";

export function* buy_token(action: ActionStartBuy) {
  try {
    const tx: TransactionReceipt = yield call(
      buy,
      action.fractionAddress,
      action.amount
    );

    console.log("=========================>", tx.status);
    if (tx.status) {
      yield put(generateActionSuccesBuy());
      yield put(generateActionStartFetchingNFT());
    } else {
      yield put(generateActionErrorBuySell("Error purchasing token!!!"));
    }
  } catch (error) {
    yield put(generateActionErrorBuySell("Error purchasing token!!!"));
  }
}

/**
 * Watches the restore existing account action.
 */
export function* watch_buy_token() {
  yield takeLatest(Actions.BUY, buy_token);
}

export function* sell_token(action: ActionStartSell) {
  console.log("sell ===> ", action);
  try {
    const tx: TransactionReceipt = yield call(
      sell,
      action.fractionAddress,
      action.amount
    );

    console.log("=========================>", tx.status);
    if (tx.status) {
      yield put(generateActionSuccesBuy());
      yield put(generateActionStartFetchingNFT());
    } else {
      yield put(generateActionErrorBuySell("Error purchasing token!!!"));
    }
  } catch (error) {
    yield put(generateActionErrorBuySell("Error purchasing token!!!"));
  }
}

/**
 * Watches the restore existing account action.
 */
export function* watch_sell_token() {
  yield takeLatest(Actions.SELL, sell_token);
}

/**
 * Root saga of the module/feature.
 */
export function* buy_sell_sagas() {
  yield spawn(watch_buy_token);
  yield spawn(watch_sell_token);
}

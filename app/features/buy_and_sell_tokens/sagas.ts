import { call, put, spawn, takeLatest } from "redux-saga/effects";
import { Actions, type ActionStartBuy, type ActionStartSell } from "./actions";
import { buy, sell } from "../web3/fractional.token.utils";
import type { TransactionReceipt } from "web3";
import {
  generateActionSuccesBuy,
  generateActionErrorBuySell,
  generateActionSuccessSell,
} from "./actions.generators";
import { generateActionStartFetchingNFT } from "../fetch_nfts/actions.generators";
import { usdc_approve } from "../web3/usdc.token";

export function* buy_token(action: ActionStartBuy) {
  try {
    const approveTx: TransactionReceipt = yield call(
      usdc_approve,
      action.fractionAddress,
      action.usdcAmount
    );
    if (approveTx.status == 1) {
      const tx: TransactionReceipt = yield call(
        buy,
        action.fractionAddress,
        action.amount
      );

      if (tx.status == 1) {
        yield put(generateActionSuccesBuy());
        yield put(generateActionStartFetchingNFT());
      } else {
        yield put(generateActionErrorBuySell("Error purchasing token!!!"));
      }
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
  try {
    const tx: TransactionReceipt = yield call(
      sell,
      action.fractionAddress,
      action.amount
    );

    if (tx.status == 1) {
      yield put(generateActionSuccessSell());
      yield put(generateActionStartFetchingNFT());
    } else {
      yield put(generateActionErrorBuySell("Error selling token!!!"));
    }
  } catch (error) {
    yield put(generateActionErrorBuySell("Error selling token!!!"));
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

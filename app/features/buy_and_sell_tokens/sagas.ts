import { spawn, takeLatest } from "redux-saga/effects";
import { Actions, type ActionStartBuy, type ActionStartSell } from "./actions";

export function* buy_token(action: ActionStartBuy) {
  console.log("===============================>", action);
}

/**
 * Watches the restore existing account action.
 */
export function* watch_buy_token() {
  yield takeLatest(Actions.BUY, buy_token);
}

export function* sell_token(action: ActionStartSell) {
  console.log("===============================>", action);
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

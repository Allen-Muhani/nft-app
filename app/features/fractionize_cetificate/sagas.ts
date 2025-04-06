import { spawn, takeLatest } from "redux-saga/effects";
import { Actions, type ActionStartFractionizing } from "./actions";

export function* fractionize_token(action: ActionStartFractionizing) {
  console.log("===============================>", action);
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

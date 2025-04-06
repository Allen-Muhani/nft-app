import { spawn, takeLatest } from "redux-saga/effects";
import { Actions, type ActionStartMinting } from "./actions";

export function* mint_token(action: ActionStartMinting) {
  console.log("===============================>", action);
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

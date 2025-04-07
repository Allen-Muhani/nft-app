import {
  Actions,
  type ActionErrorBuySell,
  type ActionStartBuy,
  type ActionStartSell,
  type ActionSuccessBuy,
  type ActionSuccessSell,
  type ResetBuySell,
} from "./actions";

export function generateActionStartBuy(
  fractionAddress: String,
  amount: Number,
  usdcAmount: Number
): ActionStartBuy {
  return {
    type: Actions.BUY,
    usdcAmount,
    fractionAddress,
    amount,
  };
}

export function generateActionSuccesBuy(): ActionSuccessBuy {
  return {
    type: Actions.SUCCESS_BUY,
  };
}

export function generateActionStartSell(
  fractionAddress: String,
  amount: Number,
  usdcAmount: Number
): ActionStartSell {
  return {
    type: Actions.SELL,
    usdcAmount,
    fractionAddress,
    amount,
  };
}

export function generateActionSuccessSell(): ActionSuccessSell {
  return {
    type: Actions.SUCCESS_SELL,
  };
}

export function generateActionErrorBuySell(error: String): ActionErrorBuySell {
  return {
    type: Actions.ERROR,
    error,
  };
}

export function generateActionResetBuySell(): ResetBuySell {
  return {
    type: Actions.RESET,
  };
}

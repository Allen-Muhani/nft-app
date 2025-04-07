export enum Actions {
  BUY = "BUY_SELL/START_BUY",

  SELL = "BUY_SELL/START_SELL",

  SUCCESS_BUY = "BUY_SELL/SUCCESS_BUY",

  SUCCESS_SELL = "BUY_SELL/SUCCESS_SELL",

  ERROR = "BUY_SELL/ERROR",

  RESET = "BUY_SELL/RESET",
}

export interface ActionStartBuy {
  type: Actions.BUY;
  fractionAddress: String;
  amount: Number;
  usdcAmount: Number;
}

export interface ActionStartSell {
  type: Actions.SELL;
  fractionAddress: String;
  amount: Number;
  usdcAmount: Number;
}

export interface ActionSuccessBuy {
  type: Actions.SUCCESS_BUY;
}

export interface ActionSuccessSell {
  type: Actions.SUCCESS_SELL;
}

export interface ActionErrorBuySell {
  type: Actions.ERROR;
  error: String;
}

export interface ResetBuySell {
  type: Actions.RESET;
}

/**
 * Create a generic action type.
 */
export type ActionTypes =
  | ActionStartBuy //should be at the beginning of all reducers.
  | ActionStartSell
  | ActionSuccessBuy
  | ActionSuccessSell
  | ActionErrorBuySell
  | ResetBuySell;

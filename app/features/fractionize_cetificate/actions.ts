export enum Actions {
  START = "FRACTIONIZE/START",

  SUCCESS = "FRACTIONIZE/SUCCESS",

  ERROR = "FRACTIONIZE/ERROR",

  RESET = "FRACTIONIZE/RESET",
}

export interface ActionStartFractionizing {
  type: Actions.START;
  certificateId: Number;
}

export interface ActionSuccessFractionizing {
  type: Actions.SUCCESS;
  fractionAddress: String;
}

export interface ActionErrorFractionizing {
  type: Actions.ERROR;
  error: String;
}

export interface ActionResetFractionizing {
  type: Actions.RESET;
}

/**
 * Create a generic action type.
 */
export type ActionTypes =
  | ActionStartFractionizing //should be at the beginning of all reducers.
  | ActionSuccessFractionizing
  | ActionErrorFractionizing
  | ActionResetFractionizing;

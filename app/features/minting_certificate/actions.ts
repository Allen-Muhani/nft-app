export enum Actions {
  START = "MINTING/START",

  SUCCESS = "MINTING/SUCCESS",

  ERROR = "MINTING/ERROR",

  RESET = "MINTING/RESET",
}

export interface ActionStartMinting {
  type: Actions.START;
  certificateCode: String;
}

export interface ActionSuccessMinting {
  type: Actions.SUCCESS;
  id: Number;
}

export interface ActionErrorMinting {
  type: Actions.ERROR;
  error: String;
}

export interface ResetMinting {
  type: Actions.RESET;
}

/**
 * Create a generic action type.
 */
export type ActionTypes =
  | ActionStartMinting //should be at the beginning of all reducers.
  | ActionSuccessMinting
  | ActionErrorMinting
  | ResetMinting;

import {
  Actions,
  type ActionErrorFractionizing,
  type ActionResetFractionizing,
  type ActionStartFractionizing,
  type ActionSuccessFractionizing,
} from "./actions";

export function generateActionStartFractionizing(
  nftAddress: String,
  certificateId: Number
): ActionStartFractionizing {
  return {
    type: Actions.START,
    nftAddress,
    certificateId,
  };
}

export function generateActionSuccessFractionizing(
  fractionAddress: String
): ActionSuccessFractionizing {
  return {
    type: Actions.SUCCESS,
    fractionAddress,
  };
}

export function generateActionErrorMinting(
  error: String
): ActionErrorFractionizing {
  return {
    type: Actions.ERROR,
    error,
  };
}

export function generateActionResetMinting(): ActionResetFractionizing {
  return {
    type: Actions.RESET,
  };
}

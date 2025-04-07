import {
  Actions,
  type ActionErrorFractionizing,
  type ActionResetFractionizing,
  type ActionStartFractionizing,
  type ActionSuccessFractionizing,
} from "./actions";

export function generateActionStartFractionizing(
  certificateId: Number
): ActionStartFractionizing {
  return {
    type: Actions.START,
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

export function generateActionErrorFractionizing(
  error: String
): ActionErrorFractionizing {
  return {
    type: Actions.ERROR,
    error,
  };
}

export function generateActionResetFractionalizing(): ActionResetFractionizing {
  return {
    type: Actions.RESET,
  };
}

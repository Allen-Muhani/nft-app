import {
  Actions,
  type ActionErrorMinting,
  type ActionStartMinting,
  type ActionSuccessMinting,
  type ResetMinting,
} from "./actions";

export function generateActionStartMinting(
  certificateCode: String
): ActionStartMinting {
  return {
    type: Actions.START,
    certificateCode,
  };
}

export function generateActionSuccesMinting(id: Number): ActionSuccessMinting {
  return {
    type: Actions.SUCCESS,
    id,
  };
}

export function generateActionErrorMinting(error: String): ActionErrorMinting {
  return {
    type: Actions.ERROR,
    error,
  };
}

export function generateActionResetMinting(error: String): ResetMinting {
  return {
    type: Actions.RESET,
  };
}

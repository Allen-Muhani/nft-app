import { Actions, type ActionTypes } from "./actions";

/**
 * Onboarding state object.
 */
interface MintingState {
  status: "started_minting" | "finished_minitng" | "error" | "";
  error: String;
  id: Number;
}

/**
 * Initial state.
 */
const initialState: MintingState = {
  status: "",
  error: "",
  id: -1,
};

export const mintingReducer = (
  state: MintingState | undefined = initialState,
  action: ActionTypes
): MintingState => {
  switch (action.type) {
    case Actions.RESET:
      return {
        ...initialState,
      };
    case Actions.START:
      return {
        ...initialState,
        status: "started_minting",
        id: -1,
      };
    case Actions.SUCCESS:
      return {
        ...initialState,
        status: "finished_minitng",
        id: action.id,
      };
    case Actions.ERROR:
      return {
        ...initialState,
        status: "error",
        error: action.error,
      };
    default:
      return state;
  }
};

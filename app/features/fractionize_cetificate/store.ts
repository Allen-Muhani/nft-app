import { Actions, type ActionTypes } from "./actions";

/**
 * Onboarding state object.
 */
interface FractionizingState {
  status: "started_fractionizing" | "finished_fractionizing" | "error" | "";
  error: String;
  id: Number;
  address: String;
}

/**
 * Initial state.
 */
const initialState: FractionizingState = {
  status: "",
  error: "",
  id: -1,
  address: "",
};

export const fractionzingReducer = (
  state: FractionizingState | undefined = initialState,
  action: ActionTypes
): FractionizingState => {
  switch (action.type) {
    case Actions.RESET:
      return {
        ...initialState,
      };
    case Actions.START:
      return {
        ...initialState,
        status: "started_fractionizing",
        id: action.certificateId,
      };
    case Actions.SUCCESS:
      return {
        ...initialState,
        status: "finished_fractionizing",
        address: action.fractionAddress,
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

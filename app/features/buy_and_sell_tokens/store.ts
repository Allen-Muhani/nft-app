import { Actions, type ActionTypes } from "./actions";

/**
 * Onboarding state object.
 */
interface BuySellState {
  status:
    | "started_buy"
    | "started_sell"
    | "finished_sell"
    | "finished_buy"
    | "error"
    | "";
  error: String;
  amount: Number;
}

/**
 * Initial state.
 */
const initialState: BuySellState = {
  status: "",
  error: "",
  amount: -1,
};

export const buy_sell_reducer = (
  state: BuySellState | undefined = initialState,
  action: ActionTypes
): BuySellState => {
  switch (action.type) {
    case Actions.RESET:
      return {
        ...initialState,
      };
    case Actions.BUY:
      return {
        ...initialState,
        status: "started_buy",
        amount: action.amount,
      };
    case Actions.SELL:
      return {
        ...initialState,
        status: "started_sell",
        amount: action.amount,
      };
    case Actions.SUCCESS_BUY:
      return {
        ...initialState,
        status: "finished_buy",
      };
    case Actions.SUCCESS_SELL:
      return {
        ...initialState,
        status: "finished_sell",
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

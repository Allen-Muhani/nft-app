import { Actions, type ActionTypes } from "./actions";
import type { NFTCert } from "./types";

/**
 * Onboarding state object.
 */
interface NFTCertColletionState {
  status: "error" | "";
  error: String;
  certs: Map<Number, NFTCert>;
}

/**
 * Initial state.
 */
const initialState: NFTCertColletionState = {
  status: "",
  error: "",
  certs: new Map<Number, NFTCert>(),
};

export const nft_cert_colletion = (
  state: NFTCertColletionState | undefined = initialState,
  action: ActionTypes
): NFTCertColletionState => {
  switch (action.type) {
    case Actions.RESET:
      return {
        ...initialState,
      };
    case Actions.SET_NFT_CERT:
      let x = new Map(state.certs);
      x.set(action.cert.id, action.cert);
      console.log("====>", action, x);
      return {
        ...state,
        certs: x,
      };
    case Actions.ERROR:
      return {
        ...state,
        status: "error",
        error: action.error,
      };
    default:
      return state;
  }
};

import {
  Actions,
  type ActionErrorFetching,
  type ActionFetchNFT,
  type ActionSetNFT,
  type ActionStartFetching,
  type ResetNFtMap,
} from "./actions";
import type { NFTCert } from "./types";

export function generateActionStartFetchingNFT(): ActionStartFetching {
  return {
    type: Actions.START,
  };
}

export function generateActionSetNFT(cert: NFTCert): ActionSetNFT {
  return {
    type: Actions.SET_NFT_CERT,
    cert,
  };
}

export function generateActionErrorFetchingNFT(
  error: String
): ActionErrorFetching {
  return {
    type: Actions.ERROR,
    error,
  };
}

export function generateActionResetNFT(): ResetNFtMap {
  return {
    type: Actions.RESET,
  };
}

export function generateActionFetchNFT(id: Number): ActionFetchNFT {
  return {
    type: Actions.FETCH_NFT,
    id,
  };
}

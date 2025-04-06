import {
  Actions,
  type ActionErrorFetching,
  type ActionSetNFT,
  type ActionStartFetching,
  type ResetNFtMap,
} from "./actions";
import type { NFTCert } from "./types";

export function generateActionStartMinting(
  certificateCode: String
): ActionStartFetching {
  return {
    type: Actions.START,
    certificateCode,
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

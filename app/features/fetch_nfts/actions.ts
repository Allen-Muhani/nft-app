import type { NFTCert } from "./types";

export enum Actions {
  START = "FETCH_NFT/START",
  SET_NFT_CERT = "FETCH_NFT/SET_NFT",
  ERROR = "FETCH_NFT/ERROR",
  RESET = "FETCH_NFT/RESET",
}

export interface ActionStartFetching {
  type: Actions.START;
  certificateCode: String;
}

export interface ActionSetNFT {
  type: Actions.SET_NFT_CERT;
  cert: NFTCert;
}

export interface ActionErrorFetching {
  type: Actions.ERROR;
  error: String;
}

export interface ResetNFtMap {
  type: Actions.RESET;
}

/**
 * Create a generic action type.
 */
export type ActionTypes =
  | ActionStartFetching //should be at the beginning of all reducers.
  | ActionSetNFT
  | ActionErrorFetching
  | ResetNFtMap;

import { combineReducers } from "@reduxjs/toolkit";
import { buy_sell_reducer } from "~/features/buy_and_sell_tokens/store";
import { nft_cert_colletion } from "~/features/fetch_nfts/store";
import { fractionzingReducer } from "~/features/fractionize_cetificate/store";
import { mintingReducer } from "~/features/minting_certificate/store";

// instead of defining the reducers in the reducer field of configureStore, combine them here:
export const rootReducer = combineReducers({
  minting: mintingReducer,
  buy_sell: buy_sell_reducer,
  fractionanlize: fractionzingReducer,
  nft_cert_colletion: nft_cert_colletion,
});

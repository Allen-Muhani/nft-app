import { combineReducers } from "@reduxjs/toolkit";
import { mintingReducer } from "~/features/minting_certificate/store";

// instead of defining the reducers in the reducer field of configureStore, combine them here:
export const rootReducer = combineReducers({ minting: mintingReducer });

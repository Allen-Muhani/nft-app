import { configureStore, type ThunkAction } from "@reduxjs/toolkit";
import { rootReducer } from "./root.reducer";
import createSagaMiddleware, { type Action } from "redux-saga";
import { root_saga } from "./root.saga";

const sagaMiddleware = createSagaMiddleware();

// then set rootReducer as the reducer object of configureStore
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(root_saga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

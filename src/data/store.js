import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/auth.reducer"
import appStateReducer from "./reducers/appState.reducer"

const reducer = {
  auth: authReducer,
  appState: appStateReducer,
}

const preloadedState = {}

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
})

import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"

import themeSlice from "../slice/theme-slice"

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

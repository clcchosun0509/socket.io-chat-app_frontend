import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../service/auth";
import authSlice from "./auth";

export const store = configureStore({
  reducer: { [authApi.reducerPath]: authApi.reducer, auth: authSlice.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

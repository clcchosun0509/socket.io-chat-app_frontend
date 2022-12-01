import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { authApi } from "../service/auth";
import { roomApi } from "../service/room";
import authSlice from "./auth";
import roomSlice from "./room";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    auth: authSlice.reducer,
    room: roomSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, roomApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

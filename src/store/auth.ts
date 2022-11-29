import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../service/type";

interface AuthInitialState {
  user: User | null;
}

const initialState: AuthInitialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      console.log("action.payload", action.payload)
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "@/store";

interface UserState {
  user_id: number | null;
  fullname: string | null;
  permission: string | null;
}

const initialState: UserState = {
  user_id: null,
  fullname: null,
  permission: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      state.user_id = action.payload.user_id;
      state.fullname = action.payload.fullname;
      state.permission = action.payload.permission;
    },
    logout: (state) => {
      state.user_id = null;
      state.fullname = null;
      state.permission = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;

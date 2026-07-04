import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/auth";

type AuthStatus = "idle" | "loading" | "authenticated" | "error";

interface AuthState {
  user: User | null;
  token: string | null;
  status: AuthStatus;
  pendingEmail: string | null;
  pendingResetOtp: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  status: localStorage.getItem("token") ? "authenticated" : "idle",
  pendingEmail: null,
  pendingResetOtp: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "authenticated";
      localStorage.setItem("token", action.payload.token);
    },
    setPendingEmail(state, action: PayloadAction<string>) {
      state.pendingEmail = action.payload;
    },
    setPendingResetOtp(state, action: PayloadAction<string>) {
      state.pendingResetOtp = action.payload;
    },
    clearPendingEmail(state) {
      state.pendingEmail = null;
      state.pendingResetOtp = null;
    },
    clearPendingResetOtp(state) {
      state.pendingResetOtp = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.pendingEmail = null;
      state.pendingResetOtp = null;
      localStorage.removeItem("token");
    },
    setStatus(state, action: PayloadAction<AuthStatus>) {
      state.status = action.payload;
    },
  },
});

export const {
  setUser,
  setPendingEmail,
  setPendingResetOtp,
  clearPendingEmail,
  clearPendingResetOtp,
  logout,
  setStatus,
} = authSlice.actions;
export default authSlice.reducer;
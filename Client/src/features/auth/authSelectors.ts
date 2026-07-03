import type { RootState } from "../../app/store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectPendingEmail = (state: RootState) => state.auth.pendingEmail;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.status === "authenticated";
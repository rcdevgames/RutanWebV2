import { createSelector } from "reselect";

const selectorAuth = (state) => state.auth;

// SELECTOR FOR AUTH
export const Token = () =>
  createSelector(selectorAuth, (state) => state.accessToken);
export const UserDetail = () =>
  createSelector(selectorAuth, (state) => state.userDetail);

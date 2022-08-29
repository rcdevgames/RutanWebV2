import { createSelector } from "reselect";

const selectorAuth = (state) => state.auth;

// SELECTOR FOR AUTH
export const AllAuthData = () => createSelector(selectorAuth, (state) => state);
export const Token = () =>
  createSelector(selectorAuth, (state) => state.accessToken);
export const UserDetail = () =>
  createSelector(selectorAuth, (state) => state.userDetail);
export const ErrorData = () =>
  createSelector(selectorAuth, (state) => state.error);
export const UserRole = () =>
  createSelector(selectorAuth, (state) => state?.userDetail?.roles);
  export const UserMenus = () =>
  createSelector(selectorAuth, (state) => state?.userDetail?.menus);

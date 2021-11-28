import { createSelector } from "reselect";

const selectorComponent = (state) => state.component;

export const IsGlobalLoading = () =>
  createSelector(selectorComponent, (state) => state.isLoadingGlobal);

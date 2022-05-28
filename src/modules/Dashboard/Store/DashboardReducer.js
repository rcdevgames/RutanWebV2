import { SET_DASHBOARD_DATA } from "./DashboardActions";

export const initialState = {
  dashboardData: {},
};

export default function dashboardReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_DASHBOARD_DATA:
      newState.dashboardData = action.payload;
      return { ...newState };
  }

  return state;
}

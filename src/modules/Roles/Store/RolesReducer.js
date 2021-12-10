import { SET_LIST_ROLES, SET_SELECTED_ROLE_ID } from "./RolesActions";

export const initialState = {
  listRoles: [],
  selectedRoleId: "",
};

export default function rolesReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_LIST_ROLES:
      newState.listRoles = action.payload;
      return { ...newState };

    case SET_SELECTED_ROLE_ID:
      newState.selectedRoleId = action.payload;
      return { ...newState };
  }

  return state;
}

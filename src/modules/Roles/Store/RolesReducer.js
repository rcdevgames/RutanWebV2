import {
  SET_LIST_ROLES,
  SET_SELECTED_ROLE_ID,
  SET_SELECTED_ROLE_DETAIL,
  SET_FORM_STATUS,
  RESET_STATE,
} from "./RolesActions";

export const initialState = {
  listRoles: [],
  selectedRoleId: "",
  selectedRoleDetail: {},
  formStatus: "add",
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

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_SELECTED_ROLE_DETAIL:
      newState.selectedRoleDetail = action.payload;
      return { ...newState };

    case RESET_STATE:
      newState.listRoles = [];
      newState.selectedRoleId = "";
      newState.selectedRoleDetail = {};
      newState.formStatus = "add";
      return { ...newState };
  }

  return state;
}

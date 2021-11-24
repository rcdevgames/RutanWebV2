import {
  SET_ACCESS_TOKEN_DATA,
  SET_USER_DETAIL_DATA,
  SET_ERROR_LOGIN,
} from "./AuthAction";

export const initialState = {
  accessToken: "",
  userDetail: null,
  authRole: null,
  avatar: null,
  error: {
    status: false,
    message: "",
  },
};

export default function authReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_ACCESS_TOKEN_DATA:
      newState.accessToken = action.payload;
      return { ...newState };

    case SET_USER_DETAIL_DATA:
      newState.userDetail = action.payload;
      return { ...newState };

    case SET_ERROR_LOGIN:
      newState.error = action.payload;
      return { ...newState };
  }

  return state;
}

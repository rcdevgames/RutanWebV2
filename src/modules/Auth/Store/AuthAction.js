import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import { Redirect } from "react-router-dom";
import history from "../../../app/History";

export const SET_ACCESS_TOKEN_DATA = "SET_ACCESS_TOKEN_DATA";
export const SET_USER_DETAIL_DATA = "SET_USER_DETAIL_DATA";
export const SET_ERROR_LOGIN = "SET_ERROR_LOGIN";

export const setAccessToken = (payload) => {
  return {
    type: SET_ACCESS_TOKEN_DATA,
    payload,
  };
};
export const setUserDetail = (payload) => {
  return {
    type: SET_USER_DETAIL_DATA,
    payload,
  };
};
export const setErrorLogin = (payload) => {
  return {
    type: SET_ERROR_LOGIN,
    payload,
  };
};

export const handleSubmitLogin = async (values) => {
  const { username, password } = values;
  const payload = { username, password };
  Invoke.submitLogin(payload)
    .then((data) => {
      store.dispatch(setAccessToken(data.data.callback.accessToken));
      delete data.data.callback.accessToken;
      store.dispatch(setUserDetail(data.data.callback));
      history.push("/");
      window.location.reload();
    })
    .catch((onRejected) => {
      if (onRejected) {
        const status = onRejected.response.data.status;
        const dataResponseRejected = onRejected.response.data;
        if (status === 400) {
          const error = {};
          error.status = true;
          error.message = dataResponseRejected.message;
          store.dispatch(setErrorLogin(error));
        } else if (status === 401) {
          const error = {};
          error.status = true;
          error.message = dataResponseRejected.message;
          store.dispatch(setErrorLogin(error));
        }
      }
    });
};

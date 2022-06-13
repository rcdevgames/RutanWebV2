import Invoke from "../../../app/axios/Invoke";
import { store } from "../../../app/ConfigureStore";
import history from "../../../app/History";
import { toastr } from "react-redux-toastr";
import { setGlobalLoading } from "../../App/Store/ComponentAction";
import { initializeApp } from "../../../app/InitializeApp";

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
export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const doLogout = (dispatch) => {
  const toastrConfirmOptions = {
    onOk: () => {
      dispatch(logout());
    },
    okText: "Ya",
    cancelText: "Tidak",
  };

  toastr.confirm("Apakah Anda Yakin Ingin Keluar?", toastrConfirmOptions);
};

const appendItem = async (data) =>
  new Promise((resolve, reject) => {
    store.dispatch(setAccessToken(data.data.callback.accessToken));
    delete data.data.callback.accessToken;
    store.dispatch(setUserDetail(data.data.callback));
    resolve();
  });

export const handleSubmitLogin = async (values) => {
  const { username, password } = values;
  const payload = { username, password };

  console.log("=== user pass : ", username, password);

  store.dispatch(setGlobalLoading(true));

  Invoke.submitLogin(payload)
    .then((data) => {
      appendItem(data).then(() => {
        initializeApp();
        setTimeout(() => {
          history.push("/dashboard");
          window.location.reload();
          store.dispatch(setGlobalLoading(false));
        }, 20000);
      });
    })
    .catch((onRejected) => {
      store.dispatch(setGlobalLoading(false));
      if (onRejected) {
        const status = onRejected?.response?.data?.status;
        const dataResponseRejected = onRejected?.response?.data ?? null;
        if (dataResponseRejected) {
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
      }
    });
};

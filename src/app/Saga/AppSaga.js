// import * as ActionAuth from "../../Auth/Store/AuthAction";
// import * as AuthSelector from "../../Auth/Selector/AuthSelector";

import { call, put, select, takeEvery } from "redux-saga/effects";

import { FormattedMessage } from "react-intl";
import React from "react";
import { toast } from "react-toastify";
import { toastr } from "react-redux-toastr";

// function* getToken() {
//   return yield select(AuthSelector.Token());
// }

// export function* getCommonConfigHeader() {
//   const token = yield call(getToken);
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   };
// }
// export function* getCommonConfigHeaderFormData() {
//   const token = yield call(getToken);
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   };
// }

export function* handleErrorProcess(action) {
  let toastMessage;

  if (!action.errorData.response || action.errorData.response === undefined) {
    const toastrConfirmOptions = {
      onOk: () => {
        window.location.reload();
      },
      okText: "Ya",
      disableCancel: true,
    };

    toastr.confirm(
      "Koneksi terputus, cek koneksi anda dan dimuat ulang",
      toastrConfirmOptions
    );
  }

  if (action.errorData.response) {
    const error = action.errorData;
    const responseStatus = error?.response.status;
    if (responseStatus === 401) {
      // yield put(ActionAuth.renewToken(action));
      console.log("=== Token Expired!");
    } else if (responseStatus === 500) {
      if (error.response.data.ErrorCode === "4201") {
        toastMessage = (
          <span class="capitalFirst">
            <FormattedMessage id="authentication.credential.invalid" />
          </span>
        );
      }
      if (error.response.data.ErrorCode === "5100") {
        toastMessage = (
          <span class="capitalFirst">
            <FormattedMessage id="authentication.credential.invalid" />
          </span>
        );
      } else {
        toastMessage = (
          <span class="capitalFirst">
            <FormattedMessage id={error.response.data.MessageKey} />
          </span>
        );
      }
    } else if (responseStatus === 403) {
      toastMessage = (
        <span class="capitalFirst">
          <FormattedMessage id={"forbiddenError"} />
        </span>
      );
    } else {
      try {
        const dataErr = error.response.data?.Data?.Failures[0]?.ErrorKey;
        if (dataErr) {
          toastMessage = (
            <span class="capitalFirst">
              <FormattedMessage id={dataErr} />
            </span>
          );
        } else {
          toastMessage = (
            <span class="capitalFirst">
              <FormattedMessage id="unknownError" />
            </span>
          );
        }
      } catch (error) {
        toastMessage = (
          <span class="capitalFirst">
            <FormattedMessage id={error} />
          </span>
        );
      }
    }
  } else {
    if (action.errorData.response.data.Message) {
      toastMessage = (
        <span class="capitalFirst">
          <FormattedMessage id={action.errorData.response.data.Message} />
        </span>
      );
    }
  }
  if (toastMessage) {
    toast.error(toastMessage);
  }
}

export function* handleErrorAction() {
  yield takeEvery("HANDLE_ERROR_SAGA", handleErrorProcess);
}

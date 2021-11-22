import { all, fork } from "redux-saga/effects";
// import {
//   getUserDetailAction,
//   loginUserAction,
//   registerUserAction,
//   updateUserAction,
// } from "../../Auth/Saga/AuthSaga";
import { handleErrorAction } from "../../app/Saga/AppSaga";

export default function* () {
  yield all([
    fork(handleErrorAction),
    // fork(registerUserAction),
    // fork(getUserDetailAction),
    // fork(loginUserAction),
    // fork(updateUserAction),
  ]);
}

import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import history from "./History";
import authReducer from "../modules/Auth/Store/AuthReducer";

const rootReducers = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  form: formReducer,
  toastr: toastrReducer,
});

export default rootReducers;

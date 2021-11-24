import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import history from "./History";

const rootReducers = combineReducers({
  router: connectRouter(history),
  toastr: toastrReducer,
  form: formReducer,
});

export default rootReducers;

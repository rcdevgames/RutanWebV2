import { reducer as toastrReducer } from "react-redux-toastr";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "./History";

const rootReducers = combineReducers({
  router: connectRouter(history),
  toastr: toastrReducer,
});

export default rootReducers;

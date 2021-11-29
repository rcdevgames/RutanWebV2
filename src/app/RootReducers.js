import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import history from "./History";
import authReducer from "../modules/Auth/Store/AuthReducer";
import listServicesReducer from "../modules/ListServices/Store/ListServicesReducer";
import ComponentReducer from "../modules/App/Store/ComponentReducer";
import adminReducer from "../modules/Admin/Store/AdminReducer";

const rootReducers = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  services: listServicesReducer,
  admins: adminReducer,
  component: ComponentReducer,
  form: formReducer,
  toastr: toastrReducer,
});

export default rootReducers;

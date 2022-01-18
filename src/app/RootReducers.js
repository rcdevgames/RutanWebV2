import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import history from "./History";
import authReducer from "../modules/Auth/Store/AuthReducer";
import listServicesReducer from "../modules/ListServices/Store/ListServicesReducer";
import ComponentReducer from "../modules/App/Store/ComponentReducer";
import customersReducer from "../modules/Customers/Store/CustomersReducer";
import adminReducer from "../modules/Admin/Store/AdminReducer";
import rolesReducer from "../modules/Roles/Store/RolesReducer";
import employeesReducer from "../modules/Employees/Store/EmployeesReducer";
import masterDataReducer from "../modules/MasterData/Store/MasterDataReducer";
import unitReducer from "../modules/Units/Store/UnitsReducer";
import jobFormsReducer from "../modules/JobForms/Store/JobFormsReducer";
import branchReducer from "../modules/Branch/Store/BranchReducer";
import detailServiceTransactionReducer from "../modules/DetailServiceTransaction/Store/DetailServiceTransactionReducer";
import unitModelReducer from "../modules/UnitsModel/Store/UnitModelReducer";
import externalServiceReducer from "../modules/ExternalService/Store/ExternalServiceReducer";
import identificationReducer from "../modules/Identification/Store/IdentificationReducer";

const rootReducers = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  services: listServicesReducer,
  externalService: externalServiceReducer,
  admins: adminReducer,
  roles: rolesReducer,
  units: unitReducer,
  unitModels: unitModelReducer,
  jobForms: jobFormsReducer,
  customers: customersReducer,
  employees: employeesReducer,
  component: ComponentReducer,
  identification: identificationReducer,
  masters: masterDataReducer,
  branch: branchReducer,
  detailService: detailServiceTransactionReducer,
  form: formReducer,
  toastr: toastrReducer,
});

export default rootReducers;

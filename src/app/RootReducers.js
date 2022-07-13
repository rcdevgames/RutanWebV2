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
import employeeToolsReducer from "../modules/Employees/Store/EmployeeTools/EmployeeToolsReducer";
import masterDataReducer from "../modules/MasterData/Store/MasterDataReducer";
import unitReducer from "../modules/Units/Store/UnitsReducer";
import jobFormsReducer from "../modules/JobForms/Store/JobFormsReducer";
import branchReducer from "../modules/Branch/Store/BranchReducer";
import detailServiceTransactionReducer from "../modules/DetailServiceTransaction/Store/DetailServiceTransactionReducer";
import unitModelReducer from "../modules/Units/Store/UnitModelReducer";
import externalServiceReducer from "../modules/ExternalService/Store/ExternalServiceReducer";
import identificationReducer from "../modules/Identification/Store/IdentificationReducer";
import machineConfigurationReducer from "../modules/MachineConfiguration/Store/MachineConfigurationReducer";
import toolsReducer from "../modules/Tools/Store/ToolsReducer";
import formCategoryReducer from "../modules/FormCategory/Store/FormCategoryReducer";
import unitFieldsReducer from "../modules/Units/Store/UnitFieldsReducer";
import monitoringEmployeeReducer from "../modules/MonitoringEmployee/Store/MonitoringEmployeeReducer";
import reportServiceRepairReducer from "../modules/ReportServiceRepair/Store/ReportServiceRepairReducer";
import reportEmployeeReducer from "../modules/ReportEmployee/Store/ReportEmployeeReducer";
import divisionReducer from "../modules/Division/Store/DivisionReducer";
import divisionUnitReducer from "../modules/Division/Store/DivisionUnitReducer";
import dashboardReducer from "../modules/Dashboard/Store/DashboardReducer";
import unitSerialNumberReducer from "../modules/Units/Store/UnitSerialNumberReducer";
import unitJobFormsReducer from "../modules/Units/Store/UnitJobFormsReducer";

const rootReducers = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  services: listServicesReducer,
  externalService: externalServiceReducer,
  admins: adminReducer,
  roles: rolesReducer,
  units: unitReducer,
  unitModels: unitModelReducer,
  unitFields: unitFieldsReducer,
  unitSerialNumber: unitSerialNumberReducer,
  unitJobForms: unitJobFormsReducer,
  jobForms: jobFormsReducer,
  customers: customersReducer,
  employees: employeesReducer,
  employeeTools: employeeToolsReducer,
  component: ComponentReducer,
  identification: identificationReducer,
  masters: masterDataReducer,
  branch: branchReducer,
  formCategory: formCategoryReducer,
  tools: toolsReducer,
  machineConfiguration: machineConfigurationReducer,
  detailService: detailServiceTransactionReducer,
  monitoringEmployee: monitoringEmployeeReducer,
  serviceRepair: reportServiceRepairReducer,
  reportEmployee: reportEmployeeReducer,
  division: divisionReducer,
  divisionUnit: divisionUnitReducer,
  dashboard: dashboardReducer,
  form: formReducer,
  toastr: toastrReducer,
});

export default rootReducers;

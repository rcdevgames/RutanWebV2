import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import ReduxToastr from "react-redux-toastr";
import TemplateContainer from "../modules/Template/Container/TemplateContainer";
import withTemplate from "./withTemplate";

// Pages
import DashboardContainer from "../modules/Dashboard/Container/DashboardContainer";
import LoginContainer from "../modules/Auth/Container/LoginContainer";
import InternalServiceContainer from "../modules/InternalService/Container/InternalServiceContainer";
import ExternalServiceContainer from "../modules/ExternalService/Container/ExternalServiceContainer";
import MonitoringEmployeeContainer from "../modules/MonitoringEmployee/Container/MonitoringEmployeeContainer";
import ListServicesContainer from "../modules/ListServices/Container/ListServicesContainer";
import AdminContainer from "../modules/Admin/Container/AdminContainer";
import NotFoundPage from "../components/NotFound/NotFound";
import AuthMiddleware from "./AuthMiddleware";
import DetailServiceTransactionContainer from "../modules/DetailServiceTransaction/Container/DetailServiceTransactionContainer";
import RolesContainer from "../modules/Roles/Container/RolesContainer";
import EmployeesListContainer from "../modules/Employees/Container/EmployeesListContainer";
import EmployeeEditContainer from "../modules/Employees/Container/EmployeeEditContainer";
import BranchContainer from "../modules/Branch/Container/BranchContainer";
import JobFormsContainer from "../modules/JobForms/Container/JobFormsContainer";
import FormWizardIdentificationContainer from "../modules/Identification/Container/Wizard/FormWizardIdentificationContainer";
import ListIdentificationContainer from "../modules/Identification/Container/ListIdentificationContainer";
import MachineConfigurationContainer from "../modules/MachineConfiguration/Container/MachineConfigurationContainer";
import UnitsContainer from "../modules/Units/Container/UnitsContainer";
import CustomerContainer from "../modules/Customers/Container/CustomerContainer";
import ToolsContainer from "../modules/Tools/Container/ToolsContainer";
import FormCategoryContainer from "../modules/FormCategory/Container/FormCategoryContainer";
import UnitModelsContainer from "../modules/Units/Container/UnitModelsContainer";
import UnitFieldsContainer from "../modules/Units/Container/UnitFields/UnitFieldsContainer";
import DetailTransactionPreviewPdfContainer from "../modules/DocumentPreviewPdf/Container/DetailTransactionPreviewPdfContainer";

export default function Navigation() {
  const authenticatedPage = (component, footerImg, footer) => {
    return AuthMiddleware(
      withTemplate(TemplateContainer, component, footerImg, footer)
    );
  };

  const templating = (component, isLandingPage) => {
    return withTemplate(TemplateContainer, component, isLandingPage);
  };

  const Login = templating(LoginContainer, false);
  const NotFound = templating(NotFoundPage, false);
  const PreviewPdf = templating(DetailTransactionPreviewPdfContainer, false);
  const Admin = authenticatedPage(AdminContainer, true);
  const Roles = authenticatedPage(RolesContainer, true);
  const JobForms = authenticatedPage(JobFormsContainer, true);
  const Branches = authenticatedPage(BranchContainer, true);
  const EmployeeList = authenticatedPage(EmployeesListContainer, true);
  const EditEmployee = authenticatedPage(EmployeeEditContainer, true);
  const Dashboard = authenticatedPage(DashboardContainer, true);
  const Units = authenticatedPage(UnitsContainer, true);
  const UnitModels = authenticatedPage(UnitModelsContainer, true);
  const UnitFields = authenticatedPage(UnitFieldsContainer, true);
  const Tools = authenticatedPage(ToolsContainer, true);
  const Customers = authenticatedPage(CustomerContainer, true);
  const FormCategory = authenticatedPage(FormCategoryContainer, true);
  const MachineConfiguration = authenticatedPage(
    MachineConfigurationContainer,
    true
  );
  const InternalService = authenticatedPage(InternalServiceContainer, true);
  const ExternalService = authenticatedPage(ExternalServiceContainer, true);
  const MonitoringEmployee = authenticatedPage(
    MonitoringEmployeeContainer,
    true
  );
  const ListServices = authenticatedPage(ListServicesContainer, true);
  const DetailService = authenticatedPage(
    DetailServiceTransactionContainer,
    true
  );
  const FormWizardIdentification = authenticatedPage(
    FormWizardIdentificationContainer,
    true
  );
  const ListIdentification = authenticatedPage(
    ListIdentificationContainer,
    true
  );

  return (
    <>
      <Helmet titleTemplate="PT. Rutan - " defaultTitle="PT. Rutan"></Helmet>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates={true}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar={true}
        closeOnToastrClick={true}
      />
      <ToastContainer autoClose={2000} />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/auth" component={Login} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/role" component={Roles} />
        <Route exact path="/cabang" component={Branches} />
        <Route exact path="/machine" component={MachineConfiguration} />
        <Route exact path="/jobforms" component={JobForms} />
        <Route exact path="/unit" component={Units} />
        <Route exact path="/unit-models" component={UnitModels} />
        <Route exact path="/unit-fields" component={UnitFields} />
        <Route exact path="/tools" component={Tools} />
        <Route exact path="/customer" component={Customers} />
        <Route exact path="/category" component={FormCategory} />
        <Route exact path="/employees" component={EmployeeList} />
        <Route exact path="/edit-employee" component={EditEmployee} />
        <Route exact path="/internal-service" component={InternalService} />
        <Route exact path="/external-service" component={ExternalService} />
        <Route exact path="/preview-pdf" component={PreviewPdf} />
        <Route
          exact
          path="/monitoring-employee"
          component={MonitoringEmployee}
        />
        <Route exact path="/list_service" component={ListServices} />
        <Route exact path="/detail-services" component={DetailService} />
        <Route
          exact
          path="/form-identification"
          component={FormWizardIdentification}
        />
        <Route exact path="/identification" component={ListIdentification} />
        <Route path={"*"} component={NotFound} />
      </Switch>
    </>
  );
}

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
  const Admin = authenticatedPage(AdminContainer, true);
  const Roles = authenticatedPage(RolesContainer, true);
  const EmployeeList = authenticatedPage(EmployeesListContainer, true);
  const EditEmployee = authenticatedPage(EmployeeEditContainer, true);
  const Dashboard = authenticatedPage(DashboardContainer, true);
  const InternalService = authenticatedPage(InternalServiceContainer, true);
  const ExternalService = authenticatedPage(ExternalServiceContainer, true);
  const MonitoringEmployee = authenticatedPage(
    MonitoringEmployeeContainer,
    true
  );
  const ListServices = authenticatedPage(ListServicesContainer, true);

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
        <Route exact path="/employees" component={EmployeeList} />
        <Route exact path="/edit-employee" component={EditEmployee} />
        <Route exact path="/new-internal-service" component={InternalService} />
        <Route exact path="/new-external-service" component={ExternalService} />
        <Route
          exact
          path="/monitoring-employee"
          component={MonitoringEmployee}
        />
        <Route exact path="/list-services" component={ListServices} />
        <Route
          exact
          path="/detail-services"
          component={DetailServiceTransactionContainer}
        />
        <Route path={"*"} component={NotFound} />
      </Switch>
    </>
  );
}

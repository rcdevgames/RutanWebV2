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
import MonitoringEmployeeContainer from "../modules/MonitoringEmployee/Container/MonitoringEmployeeContainer";
import NotFoundPage from "../components/NotFound/NotFound";

export default function Navigation() {
  //   const authenticatedPage = (component, footerImg, footer) => {
  //     return AuthMiddleware(
  //       withTemplate(TemplateContainer, component, footerImg, footer)
  //     );
  //   };
  //   const juriAuthenticatedPage = (component, footerImg, footer) => {
  //     return JuriMiddleware(
  //       withTemplate(TemplateContainer, component, footerImg, footer)
  //     );
  //   };

  const templating = (component, isLandingPage) => {
    return withTemplate(TemplateContainer, component, isLandingPage);
  };

  const Login = templating(LoginContainer, false);
  const NotFound = templating(NotFoundPage, false);
  const Dashboard = templating(DashboardContainer, true);
  const InternalService = templating(InternalServiceContainer, true);
  const MonitoringEmployee = templating(MonitoringEmployeeContainer, true);
  //   const Home = templateLanding(HomeContainer, true, true);
  //   const LatarBelakang = templateLanding(LatarBelakangContainer, true, true);
  //   const Kompetisi = templateLanding(KompetisiContainer, true, true);
  //   const Unduh = templateLanding(UnduhContainer, false, false);
  //   const DashboardUser = authenticatedPage(DashboardUserContainer, false, false);
  //   const UploadVideo = authenticatedPage(UploadVideoContainer, false, false);
  //   const VotingHome = templateLanding(VotingContainer, true, true);
  // const VotingCategory = templateLanding(VotingCategoryContainer, true, true);

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
        <Route exact path="/auth" component={Login} />
        <Route exact path="/new-internal-service" component={InternalService} />
        <Route
          exact
          path="/monitoring-employee"
          component={MonitoringEmployee}
        />
        <Route path={"*"} component={NotFound} />
      </Switch>
    </>
  );
}

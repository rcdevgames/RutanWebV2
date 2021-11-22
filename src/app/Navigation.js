import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import ReduxToastr from "react-redux-toastr";
// import withTemplate from "./WithTemplate";

import DashboardContainer from "../modules/Dashboard/Container/DashboardContainer";
import LoginContainer from "../modules/Auth/Container/LoginContainer";
import NotFoundPage from "./assets/Components/NotFoundPage";

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

  //   const templateLanding = (component, footerImg, footer) => {
  //     return withTemplate(TemplateContainer, component, footerImg, footer);
  //   };

  //   const Dashboard = templateLanding(DashboardContainer, true, true);
  //   const Home = templateLanding(HomeContainer, true, true);
  //   const Login = templateLanding(LoginContainer, false, false);
  //   const LatarBelakang = templateLanding(LatarBelakangContainer, true, true);
  //   const Kompetisi = templateLanding(KompetisiContainer, true, true);
  //   const Unduh = templateLanding(UnduhContainer, false, false);
  //   const DashboardUser = authenticatedPage(DashboardUserContainer, false, false);
  //   const UploadVideo = authenticatedPage(UploadVideoContainer, false, false);
  //   const VotingHome = templateLanding(VotingContainer, true, true);
  // const VotingCategory = templateLanding(VotingCategoryContainer, true, true);

  return (
    <>
      <Helmet titleTemplate="PT. Rutan - " defaultTitle="PT. Rutan">
        <meta
          name="description"
          content="Lomba Film Pendek 2021 TV Digital Indonesia, Menuju Analog Switch Off tahun 2022. Kementerian Komunikasi dan Informatika Republik Indonesia."
        />
      </Helmet>
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
        <Route exact path="/" component={DashboardContainer} />
        <Route exact path="/auth" component={LoginContainer} />
        <Route path={"*"} component={NotFoundPage} />
      </Switch>
    </>
  );
}

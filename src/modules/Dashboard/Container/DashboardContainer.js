import React from "react";
import { store } from "../../../app/ConfigureStore";
import { setGlobalLoading } from "../../App/Store/ComponentAction";
import DashboardComponent from "../Component/DashboardComponent";

const DashboardContainer = (props) => {
  React.useEffect(() => {
    store.dispatch(setGlobalLoading(false));
  }, []);
  return <DashboardComponent />;
};

export default DashboardContainer;

import React from "react";
import { connect } from "react-redux";
import { store } from "../../../app/ConfigureStore";
import { setGlobalLoading } from "../../App/Store/ComponentAction";
import DashboardComponent from "../Component/DashboardComponent";

const DashboardContainer = (props) => {
  const {
    auth: { userDetail },
  } = props;
  React.useEffect(() => {
    store.dispatch(setGlobalLoading(false));
  }, []);
  return <DashboardComponent userDetail={userDetail} />;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

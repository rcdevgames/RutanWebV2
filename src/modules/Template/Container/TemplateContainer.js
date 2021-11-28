import React from "react";
import { compose } from "redux";

import TemplateComponent from "../Component/TemplateComponent";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as authActions from "../../Auth/Store/AuthAction";
import * as AuthSelector from "../../Auth/Selector/AuthSelector";
import * as AppSelector from "../../App/Selector/AppSelector";

const TemplateContainer = (props) => {
  return <TemplateComponent {...props} />;
};
const mapStateToProps = createStructuredSelector({
  isGlobalLoading: AppSelector.IsGlobalLoading(),
  userDetail: AuthSelector.UserDetail(),
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    authActions.doLogout(dispatch);
    // dispatch(authActions.logout());
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TemplateContainer);

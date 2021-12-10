import React from "react";
import { compose } from "redux";

import TemplateComponent from "../Component/TemplateComponent";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as authActions from "../../Auth/Store/AuthAction";
import * as AuthSelector from "../../Auth/Selector/AuthSelector";
import * as AppSelector from "../../App/Selector/AppSelector";

const TemplateContainer = (props) => {
  const [role, setRole] = React.useState("");
  const { userDetail } = props;

  React.useEffect(() => {
    if (userDetail && userDetail.role) {
      setRole(userDetail.role[0].name);
    }
  }, [userDetail]);

  return <TemplateComponent role={role} {...props} />;
};
const mapStateToProps = createStructuredSelector({
  isGlobalLoading: AppSelector.IsGlobalLoading(),
  userDetail: AuthSelector.UserDetail(),
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    authActions.doLogout(dispatch);
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TemplateContainer);

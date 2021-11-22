import React, { useEffect, useState } from "react";
import { bindActionCreators, compose } from "redux";

import TemplateComponent from "../Component/TemplateComponent";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const TemplateContainer = (props) => {
  return <TemplateComponent {...props} />;
};
const mapStateToProps = createStructuredSelector({
  //   isGlobalLoading: SelectorComponent.IsGlobalLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  //   componentAction: bindActionCreators(actionComponent, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TemplateContainer);

import React from "react";
import { connect } from "react-redux";
import TabPanelEmployeeComponent from "../../Component/TabPanel/TabPanelEmployeeComponent";
import * as ComponentActions from "../../../App/Store/ComponentAction";
import * as DetailServiceTransactionActions from "../../Store/DetailServiceTransactionAction";

const TabPanelEmployeeContainer = (props) => {
  const {
    services: { selectedJobService },
  } = props;
  return <TabPanelEmployeeComponent jobId={selectedJobService.id} {...props} />;
};

const mapStateToProps = (state) => ({
  component: state.component,
  masters: state.masters,
  services: state.services,
  detailService: state.detailService,
});
const mapDispatchToProps = (dispatch) => ({
  handlePressAddNew: () => {
    dispatch(ComponentActions.setGlobalModal(true));
  },
  handlePressNonactive: (jobId, employeeServiceId, employeeId) =>
    DetailServiceTransactionActions.setStatusEmployee(
      jobId,
      employeeServiceId,
      employeeId,
      false
    ),
  handlePressActive: (jobId, employeeServiceId, employeeId) =>
    DetailServiceTransactionActions.setStatusEmployee(
      jobId,
      employeeServiceId,
      employeeId,
      true
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabPanelEmployeeContainer);

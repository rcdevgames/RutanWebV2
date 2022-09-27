import React from "react";
import { connect } from "react-redux";
import TabPanelEmployeeComponent from "../../Component/TabPanel/TabPanelEmployeeComponent";
import * as ComponentActions from "../../../App/Store/ComponentAction";
import * as DetailServiceTransactionActions from "../../Store/DetailServiceTransactionAction";
import { isBlockedRoleDetailService } from "../../../../app/Helpers";

const TabPanelEmployeeContainer = (props) => {
  const {
    userRole,
    services: { selectedJobService },
  } = props;

  const [isBlockedRole, setIsBlockedRole] = React.useState(false);

  const checkBlockedRole = () => {
    const isBlock = isBlockedRoleDetailService(userRole[0].role_id);
    setIsBlockedRole(isBlock);
  };

  React.useEffect(() => {
    checkBlockedRole();
  }, []);

  return <TabPanelEmployeeComponent jobId={selectedJobService.id} isBlockedRole={isBlockedRole} {...props} />;
};

const mapStateToProps = (state) => ({
  component: state.component,
  masters: state.masters,
  services: state.services,
  detailService: state.detailService,
  userRole: state.auth.userDetail.roles,
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

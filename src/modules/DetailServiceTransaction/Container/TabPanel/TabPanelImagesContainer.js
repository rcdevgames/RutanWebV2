import React from "react";
import { connect } from "react-redux";
import { isBlockedRoleDetailService } from "../../../../app/Helpers";
import TabPanelImagesComponent from "../../Component/TabPanel/TabPanelImagesComponent";
import {
  resetFormModalImage,
  setInsertMediaModal,
} from "../../Store/DetailServiceTransactionAction";

const TabPanelImagesContainer = (props) => {
  const { userRole } = props;
  const [isBlockedRole, setIsBlockedRole] = React.useState(false);

  const checkBlockedRole = () => {
    const isBlock = isBlockedRoleDetailService(userRole[0].role_id);

    setIsBlockedRole(isBlock);
  };

  React.useEffect(() => {
    checkBlockedRole();
  }, []);

  return <TabPanelImagesComponent isBlockedRole={isBlockedRole} {...props} />;
};

const mapStateToProps = (state) => ({
  userRole: state.auth.userDetail.roles,
});
const mapDispatchToProps = (dispatch) => ({
  handlePressAdd: async (values) => {
    await resetFormModalImage();
    await dispatch(setInsertMediaModal(true));
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabPanelImagesContainer);

export default EnhanceContainer;

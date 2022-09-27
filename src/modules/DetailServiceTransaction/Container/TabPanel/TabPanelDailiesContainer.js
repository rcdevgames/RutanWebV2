import React from "react";
import { connect } from "react-redux";
import { change } from "redux-form";
import { store } from "../../../../app/ConfigureStore";
import { isBlockedRoleDetailService } from "../../../../app/Helpers";
import TabPanelDailiesComponent from "../../Component/TabPanel/TabPanelDailiesComponent";
import {
  mapDailiesToForm,
  setEditDailiesModal,
  setSelectedEditDailiesData,
  setTypeFormDailies,
} from "../../Store/DetailServiceTransactionAction";

const TabPanelDailiesContainer = (props) => {
  const {
    userRole,
    detailService: { typeFormDailies },
  } = props;
  const [isBlockedRole, setIsBlockedRole] = React.useState(false);

  const checkBlockedRole = () => {
    const isBlock = isBlockedRoleDetailService(userRole[0].role_id);
    setIsBlockedRole(isBlock);
  };

  React.useEffect(() => {
    checkBlockedRole();
  }, []);

  return (
    <TabPanelDailiesComponent
      isBlockedRole={isBlockedRole}
      typeFormDailies={typeFormDailies}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  detailService: state.detailService,
  userRole: state.auth.userDetail.roles,
});
const mapDispatchToProps = (dispatch) => ({
  handlePressEdit: async (values) => {
    await dispatch(setTypeFormDailies("edit"));
    await dispatch(setSelectedEditDailiesData(values));
    store.dispatch(setEditDailiesModal(true));
    mapDailiesToForm();
  },
  handlePressAdd: async () => {
    dispatch(change("editDailiesForm", `id`, ""));
    dispatch(change("editDailiesForm", `startDate`, ""));
    dispatch(change("editDailiesForm", `endDate`, ""));
    dispatch(change("editDailiesForm", `title`, ""));
    dispatch(change("editDailiesForm", `description`, ""));
    dispatch(change("editDailiesForm", `type`, ""));
    dispatch(change("editDailiesForm", `timeStartEnd`, null));
    await dispatch(setSelectedEditDailiesData({}));
    await dispatch(setTypeFormDailies("add"));
    store.dispatch(setEditDailiesModal(true));
  },
  handlePressCancel: () => {
    store.dispatch(setEditDailiesModal(false));
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabPanelDailiesContainer);

export default EnhanceContainer;

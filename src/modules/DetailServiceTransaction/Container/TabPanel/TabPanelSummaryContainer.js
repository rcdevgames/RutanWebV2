import React from "react";
import { connect } from "react-redux";
import { change } from "redux-form";
import { isBlockedRoleDetailService } from "../../../../app/Helpers";
import TabPanelSummaryComponent from "../../Component/TabPanel/TabPanelSummaryComponent";
import { setEditSummaryModal } from "../../Store/DetailServiceTransactionAction";

const TabPanelSummaryContainer = (props) => {
  const { summary, userRole } = props;
  const [summaryArr, setSummaryArr] = React.useState([]);
  const [isBlockedRole, setIsBlockedRole] = React.useState(false);

  const checkBlockedRole = () => {
    const isBlock = isBlockedRoleDetailService(userRole[0].role_id);
    setIsBlockedRole(isBlock);
  };

  React.useEffect(() => {
    checkBlockedRole();
  }, []);

  React.useEffect(() => {
    const summaryMapping = [];

    summary.map((item, index) => {
      const summaryText = item.summary ?? "";
      const checkBreakLine = summaryText.includes("\n");

      if (checkBreakLine) {
        const splitSummary = summaryText.split("\n");
        summaryMapping.push({
          id: item.id,
          unitName: item.unitName,
          summary: splitSummary,
        });
      } else {
        summaryMapping.push({
          id: item.id,
          unitName: item.unitName,
          summary: [summaryText],
        });
      }
    });
    setSummaryArr(summaryMapping);
  }, [summary]);

  return (
    <TabPanelSummaryComponent
      summaryArr={summaryArr}
      isBlockedRole={isBlockedRole}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  userRole: state.auth.userDetail.roles,
});
const mapDispatchToProps = (dispatch) => ({
  handlePressEdit: async (unitId) => {
    dispatch(change("editSummaryForm", `unitId`, unitId));
    await dispatch(setEditSummaryModal(true));
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabPanelSummaryContainer);

export default EnhanceContainer;

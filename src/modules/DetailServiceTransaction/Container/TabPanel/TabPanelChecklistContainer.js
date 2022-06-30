import React from "react";
import TabPanelChecklistComponent from "../../Component/TabPanel/TabPanelChecklistComponent";

const TabPanelChecklistContainer = (props) => {
  const { checklist } = props;

  return <TabPanelChecklistComponent checklist={checklist} {...props} />;
};

export default TabPanelChecklistContainer;

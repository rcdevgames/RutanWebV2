import React from "react";
import TabPanelChecklistComponent from "../../Component/TabPanel/TabPanelChecklistComponent";

const TabPanelChecklistContainer = (props) => {
  const { checklist } = props;
  console.log("=== checklist : ", checklist);
  return <TabPanelChecklistComponent {...props} />;
};

export default TabPanelChecklistContainer;

import React, { useState } from "react";
import TabPanelChecklistComponent from "../../Component/TabPanel/TabPanelChecklistComponent";

const TabPanelChecklistContainer = (props) => {
  const { checklist } = props;
  const [checklistArr, setchecklistArr] = useState([]);

  React.useEffect(() => {
    setchecklistArr(checklist);
  }, [checklist]);

  return <TabPanelChecklistComponent checklistArr={checklistArr} {...props} />;
};

export default TabPanelChecklistContainer;

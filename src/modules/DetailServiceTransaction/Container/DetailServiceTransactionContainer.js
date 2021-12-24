import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import DetailServiceTransactionComponent from "../Component/DetailServiceTransactionComponent";
import {
  FileImageOutlined,
  UsergroupAddOutlined,
  CheckCircleOutlined,
  VideoCameraOutlined,
  EditOutlined,
  FileTextOutlined,
  CloseSquareOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import TabPanelEmployeeContainer from "./TabPanel/TabPanelEmployeeContainer";
import * as DetailServiceActions from "../Store/DetailServiceTransactionAction";

const Panel1 = ({ title }) => {
  return (
    <div>
      <h6>{title}</h6>
    </div>
  );
};

const DetailServiceTransactionContainer = (props) => {
  const {
    services: { selectedJobService },
    detailService: { selectedServiceEmployeeList },
  } = props;

  const TabPanel = [
    {
      key: "panel-1",
      title: "Checklist",
      icon: <CheckCircleOutlined />,
      component: <Panel1 title="Checklist" />,
    },
    {
      key: "panel-2",
      title: "Teknisi",
      icon: <UsergroupAddOutlined />,
      component: (
        <TabPanelEmployeeContainer employees={selectedServiceEmployeeList} />
      ),
    },
    {
      key: "panel-3",
      title: "Gambar",
      icon: <FileImageOutlined />,
      component: <Panel1 title="Gambar" />,
    },
    {
      key: "panel-4",
      title: "Video",
      icon: <VideoCameraOutlined />,
      component: <Panel1 title="Video" />,
    },
    {
      key: "panel-5",
      title: "Catatan Teknisi",
      icon: <EditOutlined />,
      component: <Panel1 title="Catatan Teknisi" />,
    },
    {
      key: "panel-6",
      title: "Summary",
      icon: <FileTextOutlined />,
      component: <Panel1 title="Summary" />,
    },
    {
      key: "panel-7",
      title: "Alasan Reject",
      icon: <CloseSquareOutlined />,
      component: <Panel1 title="Alasan Reject" />,
    },
    {
      key: "panel-8",
      title: "History",
      icon: <HistoryOutlined />,
      component: <Panel1 title="History" />,
    },
  ];

  const onChangeTab = (activeTab) => {
    switch (activeTab.toLowerCase()) {
      case "panel-2":
        DetailServiceActions.getJobServiceEmployeeList(selectedJobService.id);
        break;

      default:
        break;
    }
  };

  return (
    <DetailServiceTransactionComponent
      data={selectedJobService}
      TabPanel={TabPanel}
      onChangeTab={onChangeTab}
    />
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
  detailService: state.detailService,
});
const mapDispatchToProps = (dispatch) => ({});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailServiceTransactionContainer);

export default reduxForm({
  form: "detailJobServices",
})(EnhanceContainer);

import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import DetailServiceTransactionComponent from "../Component/DetailServiceTransactionComponent";
import {
  FileImageOutlined,
  UsergroupAddOutlined,
  CheckCircleOutlined,
  EditOutlined,
  FileTextOutlined,
  CloseSquareOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import TabPanelEmployeeContainer from "./TabPanel/TabPanelEmployeeContainer";
import * as DetailServiceActions from "../Store/DetailServiceTransactionAction";
import * as EmployeesActions from "../../Employees/Store/EmployeesActions";
import TabPanelSummaryContainer from "./TabPanel/TabPanelSummaryContainer";
import TabPanelImagesContainer from "./TabPanel/TabPanelImagesContainer";
import TabPanelDailiesContainer from "./TabPanel/TabPanelDailiesContainer";
import TabPanelHistoriesContainer from "./TabPanel/TabPanelHistoriesContainer";
import * as ListServiceActions from "../../ListServices/Store/ListServicesActions";
import TabPanelRejectionsContainer from "./TabPanel/TabPanelRejectionsContainer";
import TabPanelChecklistContainer from "./TabPanel/TabPanelChecklistContainer";
import { store } from "../../../app/ConfigureStore";
import Invoke from "../../../app/axios/Invoke";
import { isBlockedRoleDetailService, isNotBlockedRolePrintForm, navigate } from "../../../app/Helpers";
import { showToast } from "../../Roles/Store/RolesActions";

const DetailServiceTransactionContainer = (props) => {
  const {
    userRole,
    setChecklist,
    services: { selectedJobService },
    detailService: {
      selectedServiceEmployeeList,
      groupingSelectedServiceMedia,
      groupingSelectedServiceSummary,
      groupingSelectedServiceChecklist,
      selectedServiceDailies,
      selectedServiceHistories,
      selectedServiceRejected,
      singleSelectedServiceSummary,
    },
  } = props;

  const [isLoadedChecklist, setIsLoadedChecklist] = React.useState(false);
  const [isNotBlockedRole, setNotIsBlockedRole] = React.useState(false);
  const [isBlockedRoleActionButton, setIsBlockedRoleActionButton] = React.useState(false);
  const [isCompleteLoadedMedia, setIsCompleteLoadedMedia] =
    React.useState(false);
  const [isCompleteLoadedSummary, setIsCompleteLoadedSummary] =
    React.useState(false);

  const TabPanel = [
    {
      key: "panel-gambar",
      title: "Gambar",
      icon: <FileImageOutlined />,
      component: (
        <TabPanelImagesContainer
          medias={groupingSelectedServiceMedia}
          isLoaded={isCompleteLoadedMedia}
        />
      ),
    },
    {
      key: "panel-summary",
      title: "Summary",
      icon: <FileTextOutlined />,
      component: (
        <TabPanelSummaryContainer
          summary={
            selectedJobService.is_external
              ? groupingSelectedServiceSummary
              : singleSelectedServiceSummary
          }
          isLoaded={isCompleteLoadedSummary}
        />
      ),
    },
    {
      key: "panel-teknisi",
      title: "Teknisi",
      icon: <UsergroupAddOutlined />,
      component: (
        <TabPanelEmployeeContainer employees={selectedServiceEmployeeList} />
      ),
    },
    {
      key: "panel-rejected",
      title: "Alasan Reject",
      icon: <CloseSquareOutlined />,
      component: (
        <TabPanelRejectionsContainer rejections={selectedServiceRejected} />
      ),
    },
    {
      key: "panel-dailies",
      title: "Catatan Teknisi",
      icon: <EditOutlined />,
      component: <TabPanelDailiesContainer dailies={selectedServiceDailies} />,
    },
    {
      key: "panel-histories",
      title: "History",
      icon: <HistoryOutlined />,
      component: (
        <TabPanelHistoriesContainer
          title="History"
          histories={selectedServiceHistories}
        />
      ),
    },
  ];

  if (selectedJobService.is_external) {
    TabPanel.push({
      key: "panel-checklist",
      title: "Checklist",
      icon: <CheckCircleOutlined />,
      component: (
        <TabPanelChecklistContainer
          roles={userRole}
          isLoaded={isLoadedChecklist}
          checklist={groupingSelectedServiceChecklist}
          setChecklist={setChecklist}
        />
      ),
    });

    // Move content of checklist to index 0
    const fromIndex = TabPanel.indexOf("panel-checklist"); // 👉️ 0
    const toIndex = 0;

    const element = TabPanel.splice(fromIndex, 1)[0];
    console.log(element); // ['panel-checklist']

    TabPanel.splice(toIndex, 0, element);
  }

  const onChangeTab = (activeTab) => {
    switch (activeTab.toLowerCase()) {
      case "panel-teknisi":
        DetailServiceActions.getJobServiceEmployeeList(selectedJobService.id);
        break;

      case "panel-summary":
        groupingUnitSummary();
        break;

      case "panel-gambar":
        groupingUnitMedia();
        break;

      case "panel-dailies":
        DetailServiceActions.getJobServiceDailies(selectedJobService.id);
        break;

      case "panel-histories":
        DetailServiceActions.getJobServiceHistories(selectedJobService.id);
        break;

      case "panel-checklist":
        groupingUnitChecklist();
        break;

      case "panel-rejected":
        DetailServiceActions.getJobServiceRejections(selectedJobService.id);
        break;

      default:
        console.log("no panel selected...");
        break;
    }
  };

  const callInitialize = async () => {
    await EmployeesActions.loadEmployeeListData(1, 99999);
    await DetailServiceActions.getJobServiceEmployeeList(selectedJobService.id);
    await DetailServiceActions.getJobServiceDailies(selectedJobService.id);
    await DetailServiceActions.getJobServiceHistories(selectedJobService.id);
    await DetailServiceActions.getJobServiceRejections(selectedJobService.id);
    await groupingUnitMedia();
    await groupingUnitSummary();
    await groupingUnitChecklist();
  };

  const groupingUnitMedia = async () => {
    setIsCompleteLoadedMedia(false);
    await DetailServiceActions.getUnitMedia((isCompleted) => {
      setIsCompleteLoadedMedia(isCompleted);
    });
  };

  const groupingUnitSummary = async () => {
    setIsCompleteLoadedSummary(false);
    await DetailServiceActions.getUnitSummary((isCompleted) => {
      setIsCompleteLoadedSummary(isCompleted);
    });
  };

  const groupingUnitChecklist = async () => {
    const groupingChecklist = [];

    if (selectedJobService.units) {
      await selectedJobService.units.map(async (item, index) => {
        Invoke.getChecklistData(item.id)
          .then((dataChecklist) => {
            groupingChecklist.push({
              unitName: item.unit_name,
              unitId: item.id,
              checklist: dataChecklist.data.callback,
            });
            if (index + 1 === selectedJobService.units.length) {
              setIsLoadedChecklist(true);
            }
          })
          .catch(() => setIsLoadedChecklist(true));
      });

      setTimeout(() => {
        setChecklist(groupingChecklist);
      }, 1000);
    }
  };

  const checkBlockedRole = () => {
    const isNotBlocked = isNotBlockedRolePrintForm(userRole[0].role_id);
    setNotIsBlockedRole(isNotBlocked);
    const isBlockedRoleButtonAction = isBlockedRoleDetailService(userRole[0].role_id);
    setIsBlockedRoleActionButton(isBlockedRoleButtonAction)
  };

  React.useEffect(() => {
    callInitialize();
    checkBlockedRole();
  }, []);

  const handlePressGeneratePdf = () => {
    // exportDetailServicePdfRevision(printedData);
    DetailServiceActions.downloadTransactionPdf();
  };

  const handleBackToListService = () => {
    store.dispatch(DetailServiceActions.resetDetailService());
  };

  const handleSetOnProgress = () => {
    Invoke.setJobToProgress(selectedJobService.id)
      .then(() => {
        showToast("Berhasil memindahkan job service ke On Progress", "success");
        setTimeout(() => {
          navigate("list_service");
        }, 1500);
      })
      .catch(() => {
        showToast("Gagal memindahkan job service ke On Progress", "error");
      });
  };

  return (
    <DetailServiceTransactionComponent
      data={selectedJobService}
      isNotBlockedRole={isNotBlockedRole}
      isBlockedRoleActionButton={isBlockedRoleActionButton}
      TabPanel={TabPanel}
      onChangeTab={onChangeTab}
      handlePressGeneratePdf={handlePressGeneratePdf}
      goBack={handleBackToListService}
      medias={groupingSelectedServiceMedia}
      checklist={groupingSelectedServiceChecklist}
      employees={selectedServiceEmployeeList}
      dailies={selectedServiceDailies}
      summary={groupingSelectedServiceSummary}
      handleSetOnProgress={handleSetOnProgress}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
  detailService: state.detailService,
  units: state.units,
  userRole: state.auth.userDetail.roles,
});
const mapDispatchToProps = (dispatch) => ({
  handlePressDelete: (jobId) => {
    ListServiceActions.deleteJobServiceRequested(jobId);
  },
  handlePressActions: (jobId, type) => {
    ListServiceActions.handlePressActionsRequested(jobId, type);
  },
  handlePressEdit: async () => {
    await dispatch(DetailServiceActions.setEditTransactionModal(true));
    await DetailServiceActions.mapDetailTransactionToForm();
    dispatch(DetailServiceActions.setEditTransactionModal(true));
  },
  setMediaList: (list) => {
    dispatch(DetailServiceActions.setGroupingSelectedServicesMediaData(list));
  },
  setSummaryList: (list) => {
    dispatch(DetailServiceActions.setGroupingSummaryData(list));
  },
  setChecklist: (list) => {
    dispatch(DetailServiceActions.setGroupingChecklistData(list));
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailServiceTransactionContainer);

export default reduxForm({
  form: "detailJobServices",
})(EnhanceContainer);

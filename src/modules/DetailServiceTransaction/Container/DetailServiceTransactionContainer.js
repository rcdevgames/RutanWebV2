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
import { isBlockedRoleDetailService, navigate } from "../../../app/Helpers";

const DetailServiceTransactionContainer = (props) => {
  const {
    userRole,
    setMediaList,
    setChecklist,
    setSummaryList,
    services: { selectedJobService },
    detailService: {
      selectedServiceEmployeeList,
      groupingSelectedServiceMedia,
      groupingSelectedServiceSummary,
      groupingSelectedServiceChecklist,
      selectedServiceDailies,
      selectedServiceHistories,
      selectedServiceRejected,
    },
  } = props;
  const [isLoadedChecklist, setIsLoadedChecklist] = React.useState(false);
  const [isBlockedRole, setIsBlockedRole] = React.useState(false);
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
          summary={groupingSelectedServiceSummary}
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
          isLoaded={isLoadedChecklist}
          checklist={groupingSelectedServiceChecklist}
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
    const groupingMediaList = [];
    let sequence = 0;

    const setDispatch = () => {
      if (sequence === selectedJobService.units.length) {
        setTimeout(() => {
          setMediaList(groupingMediaList);
          setIsCompleteLoadedMedia(true);
        }, 1000);
      }
    };

    if (selectedJobService.units) {
      await selectedJobService.units.map(async (item, index) => {
        await Invoke.getJobServiceMedia(selectedJobService.id, item.id).then(
          (dataMedia) => {
            const imageList = dataMedia.data.callback.data ?? [];
            // Push to tempporary array
            groupingMediaList.push({
              unitName: item.unit_name,
              image: imageList ?? [],
            });
            sequence += 1;
            setDispatch();
          }
        );
      });
    } else {
      try {
        // Get media without unitId
        const { data: dataMedia } = await Invoke.getJobServiceMedia(
          selectedJobService.id
        );
        // Push to tempporary array
        groupingMediaList.push({
          unitName: "All Unit",
          image: dataMedia.callback.data ?? [],
        });
      } catch (error) {
        setMediaList([]);
        setIsCompleteLoadedMedia(true);
      }

      setTimeout(() => {
        setMediaList(groupingMediaList);
        setIsCompleteLoadedMedia(true);
      }, 1000);
    }
  };

  const groupingUnitSummary = async () => {
    setIsCompleteLoadedSummary(false);
    const groupingSummaryList = [];
    let sequence = 0;

    const setDispatch = (responseStatus) => {
      if (sequence === selectedJobService.units.length) {
        if (responseStatus === "error") {
          setTimeout(() => {
            setSummaryList(groupingSummaryList);
            setIsCompleteLoadedSummary(true);
          }, 1000);
        } else {
          setTimeout(() => {
            setSummaryList(groupingSummaryList);
            setIsCompleteLoadedSummary(true);
          }, 1000);
        }
      }
    };

    if (selectedJobService.units) {
      await selectedJobService.units.map(async (item, index) => {
        await Invoke.getJobServiceSummary(selectedJobService.id, item.id)
          .then((dataSummary) => {
            groupingSummaryList.push({
              id: item.id,
              unitName: item.unit_name,
              summary: dataSummary.data.callback.summary,
            });

            sequence += 1;
            setDispatch(dataSummary.status);
          })
          .catch((err) => {
            groupingSummaryList.push({
              id: item.id,
              unitName: item.unit_name,
              summary: [],
            });
            sequence += 1;
            setDispatch("error");
            console.log(err);
          });
      });
    }
  };

  const groupingUnitChecklist = async () => {
    const groupingChecklist = [];

    if (selectedJobService.units) {
      await selectedJobService.units.map(async (item, index) => {
        Invoke.getChecklistData(item.id)
          .then((dataChecklist) => {
            groupingChecklist.push({
              unitName: item.unit_name,
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
    const isBlock = isBlockedRoleDetailService(userRole[0].role_id);
    setIsBlockedRole(isBlock);
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
    setTimeout(() => {
      navigate("list_service");
    }, 500);
  };

  return (
    <DetailServiceTransactionComponent
      data={selectedJobService}
      isBlockedRole={isBlockedRole}
      TabPanel={TabPanel}
      onChangeTab={onChangeTab}
      handlePressGeneratePdf={handlePressGeneratePdf}
      goBack={handleBackToListService}
      medias={groupingSelectedServiceMedia}
      checklist={groupingSelectedServiceChecklist}
      employees={selectedServiceEmployeeList}
      dailies={selectedServiceDailies}
      summary={groupingSelectedServiceSummary}
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

import React from "react";
import { connect } from "react-redux";
import { getFormValues, reduxForm } from "redux-form";
import { BookOutlined } from "@ant-design/icons";
import {
  enumTypeMonitoringEmployee,
  getStatus,
  isBlockedRoleCustomerView,
} from "../../../app/Helpers";
import * as ReportServiceRepairActions from "../Store/ReportServiceRepairActions";
import Text from "antd/lib/typography/Text";
import { Space, Tag } from "antd";
import ReportServiceRepairComponent from "../Component/ReportServiceRepairComponent";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import moment from "moment";
import * as ListServiceActions from "../../ListServices/Store/ListServicesActions";
import { Link } from "react-router-dom";
import * as BranchActions from "../../Branch/Store/BranchActions";

const ReportServiceRepairContainer = (props) => {
  const {
    handlePressEdit,
    handlePressAddNew,
    getListServiceRepair,
    branch: { listBranchDropdown },
    serviceRepairFormValues,
    user: { roles, branchId },
    serviceRepair: { listServiceRepair, paging },
  } = props;
  const [isBlockedRole, setIsBlockedRole] = React.useState(false);
  const [successLoaded, setSuccessLoaded] = React.useState(false);
  const [selectBranch, setSelectBranch] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const { page, limit } = paging;

  if (listServiceRepair.length > 0) {
    listServiceRepair.map((item, index) => {
      listServiceRepair[index] = { ...item, no: index + 1 };
    });
  }

  const renderActionTable = (text, record) => (
    <Space size="middle">
      <Link
        to={"/detail-services"}
        onClick={() => {
          handlePressEdit(record);
        }}
      >
        <CButtonAntd type="primary" icon={<BookOutlined />} size="middle" />
      </Link>
    </Space>
  );

  const switchColorType = (isExternal, isWarranty) => {
    if (isWarranty) {
      return "#ffc018";
    }
    switch (isExternal) {
      case true:
        return "#87d068";
        break;

      default:
        return "#108ee9";
        break;
    }
  };

  const headers = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "7%",
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: "Tipe",
      dataIndex: "type",
      key: "type",
      width: "20%",
      render: (type, items) => {
        let color = switchColorType(items.is_external, items.warranty);
        return (
          <Tag
            style={{ borderRadius: 10, width: 115, textAlign: "center" }}
            color={color}
            key={type}
          >
            {type ? type.toUpperCase() : "-"}
          </Tag>
        );
      },
      sorter: (a, b) => a.type.length - b.type.length,
    },
    {
      title: "Customer",
      dataIndex: "customer_name",
      key: "customer_name",
      width: "20%",
      sorter: (a, b) => a.customer_name.length - b.customer_name.length,
    },
    {
      title: "Unit",
      dataIndex: "unit_models",
      render: (units) => {
        if (units) {
          return units.map((unit) => (
            <Text>
              {unit.unit_name}
              {units.length <= 1 ? "" : ", "}
            </Text>
          ));
        }
        return <Text>{"-"}</Text>;
      },
      key: "unit_models",
      width: "15%",
    },
    {
      title: "Model",
      dataIndex: "unit_models",
      render: (units) => {
        if (units) {
          return units.map((unit) => (
            <Text>
              {unit.unit_model_name}
              {units.length <= 1 ? "" : ", "}
            </Text>
          ));
        }
        return <Text>{"-"}</Text>;
      },
      key: "unit_models",
      width: "15%",
      sorter: (a, b) => a.customer_name.length - b.customer_name.length,
    },
    {
      title: "Due date",
      dataIndex: "due",
      key: "due",
      width: "15%",
      sorter: (a, b) => a.due.length - b.due.length,
      render: (due) => (
        <Text>{due ? moment(due).format("YYYY-MM-DD") : "0000-00-00"}</Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = getStatus(status).color;
        return (
          <Tag
            style={{ width: 80, textAlign: "center" }}
            color={color}
            key={status}
          >
            {status ? getStatus(status).value : "-"}
          </Tag>
        );
      },
    },
    {
      title: "Dibuat",
      dataIndex: "start",
      key: "start",
      width: 500,
      render: (start) => (
        <Text>{start ? moment(start).format("YYYY-MM-DD") : "0000-00-00"}</Text>
      ),
      sorter: (a, b) => a.created_date.length - b.created_date.length,
    },
    {
      align: "center",
      title: "Aksi",
      key: "action",
      width: 200,
      render: renderActionTable,
      fixed: "right",
    },
  ];

  const checkBlockedRole = () => {
    const SelectBranch = [];
    const roleId = roles[0].role_id;
    const blocked = isBlockedRoleCustomerView(roleId);

    if (blocked) {
      setIsBlockedRole(blocked);

      if (blocked) {
        // Call API report service only for his own branch
        getListServiceRepair(page, limit, "", branchId).then((success) => {
          setIsLoading(false);
        });

        // Set branch only on his own branch if role access is blocked
        const selectedBranch = listBranchDropdown.filter(
          (x) => x.id === branchId
        );

        // Push to enum dropdown branch reducer
        SelectBranch.push({
          id: `branch-${selectedBranch[0].id}`,
          value: selectedBranch[0].id,
          label: selectedBranch[0].name,
        });
        setSelectBranch(SelectBranch);
      } else {
        // Call API service report for all data, without filtering branch
        getListServiceRepair(page, limit).then((success) => {
          setIsLoading(false);
        });

        // Show all branch when not blocked role
        listBranchDropdown.map((item, index) => {
          SelectBranch.push({
            id: `branch-${index}`,
            value: item.id,
            label: item.name,
          });
        });
        setSelectBranch(SelectBranch);
      }
    } else {
      setIsBlockedRole(false);
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    checkBlockedRole();
  }, []);

  React.useEffect(() => {
    BranchActions.getBranchListDataRequested(1, 99999, "", true).then(
      (successLoadedListBranch) => {
        setSuccessLoaded(true);
        checkBlockedRole();
      }
    );
  }, []);

  const onSearch = () => {
    setIsLoading(true);
    ReportServiceRepairActions.handleSearch(serviceRepairFormValues).then(
      () => {
        setIsLoading(false);
      }
    );
  };

  return (
    <ReportServiceRepairComponent
      headers={headers}
      listServiceRepair={listServiceRepair}
      handlePressAddNew={handlePressAddNew}
      paging={paging}
      enumTypeReport={enumTypeMonitoringEmployee}
      enumBranch={selectBranch}
      onSearch={onSearch}
      isLoading={isLoading}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  branch: state.branch,
  user: state.auth.userDetail,
  serviceRepair: state.serviceRepair,
  serviceRepairFormValues: getFormValues("serviceRepairForm")(state),
});
const mapDispatchToProps = (dispatch) => ({
  getListServiceRepair: async (page, limit, keyword, branch, from, until) =>
    ReportServiceRepairActions.getServiceRepairListDataRequested(
      page,
      limit,
      keyword,
      branch,
      from,
      until
    ),
  handlePressEdit: async (value) => ListServiceActions.handlePressEdit(value),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportServiceRepairContainer);

export default reduxForm({
  form: "serviceRepairForm",
})(EnhanceContainer);

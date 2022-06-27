import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { getFormValues, reduxForm } from "redux-form";
import * as UnitSerialNumberActions from "../../Store/UnitSerialNumberActions";
import * as CustomerActions from "../../../Customers/Store/CustomersActions";
import * as ComponentActions from "../../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../../components/CButton/CButtonAntd";
import { getIndex } from "../../../../app/Helpers";
import { store } from "../../../../app/ConfigureStore";
import UnitSerialNumberComponent from "../../Component/UnitSerialNumber/UnitSerialNumberComponent";

const UnitSerialNumberContainer = (props) => {
  const {
    getUnitSerialNumber,
    handlePressEdit,
    handlePressDelete,
    handlePressAddNew,
    unitSerialNumber: {
      listUnitSerialNumber,
      paging,
      selectedtUnitSerialNumber,
    },
    unitModels: { selectedUnitModelsData },
    customers: { listCustomersDropdown },
    unitSerialNumberFormValues,
  } = props;

  const { dispatch } = store;
  const { page, limit, totalPage } = paging;

  if (listUnitSerialNumber.length > 0) {
    listUnitSerialNumber.map((item, index) => {
      listUnitSerialNumber[index] = {
        ...item,
        no: getIndex(page, limit)[index],
      };
    });
  }

  const SelectCustomerData = [];
  listCustomersDropdown.map((item, index) => {
    SelectCustomerData.push({
      id: `customer-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  const headers = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "10%",
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: "Serial Number",
      dataIndex: "serial_number",
      key: "serial_number",
      width: "30%",
      sorter: (a, b) => a.serial_number.length - b.serial_number.length,
    },
    {
      title: "Deskripsi",
      dataIndex: "descriptions",
      key: "descriptions",
      width: "30%",
      sorter: (a, b) => a.descriptions.length - b.descriptions.length,
    },
  ];

  const renderActionTable = (text, record) => (
    <Space size="middle">
      <CButtonAntd
        onClick={() => {
          handlePressEdit(record);
        }}
        type="primary"
        icon={<EditOutlined />}
        size="middle"
      />
      <CButtonAntd
        onClick={() => handlePressDelete(record.id)}
        type="primary"
        icon={<DeleteOutlined />}
        size="middle"
        danger
      />
    </Space>
  );

  React.useEffect(() => {
    CustomerActions.getCustomerListDataByPaging(1, 999999, "", "", true);
    // getUnitSerialNumber(page, limit);
  }, []);

  const onChangePagination = async (nextPage, pageSize) => {
    const paging = {};
    paging.page = nextPage;
    paging.limit = pageSize;
    paging.totalPage = totalPage;
    await store.dispatch(UnitSerialNumberActions.setPagingUnitModel(paging));
    getUnitSerialNumber(nextPage, pageSize);
  };

  const onSearch = (keyword) => {
    UnitSerialNumberActions.handleSearch(unitSerialNumberFormValues, keyword);
  };

  const handleOnchangeCustomer = (customer) => {
    if (!customer) {
      dispatch(UnitSerialNumberActions.setUnitSerialNumberData([]));
      return;
    }

    const splitCustomerId = customer.split("|");
    UnitSerialNumberActions.getUnitSerialNumber(
      page,
      limit,
      "",
      splitCustomerId[0]
    );
  };

  return (
    <UnitSerialNumberComponent
      headers={headers}
      listUnitSerialNumber={listUnitSerialNumber}
      renderActionTable={renderActionTable}
      handlePressAddNew={handlePressAddNew}
      onChangePagination={onChangePagination}
      onSearch={onSearch}
      paging={paging}
      listCustomer={SelectCustomerData}
      selectedUnitModelsData={selectedUnitModelsData}
      selectedtUnitSerialNumber={selectedtUnitSerialNumber}
      onChangeCustomer={handleOnchangeCustomer}
      // {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  units: state.units,
  unitSerialNumber: state.unitSerialNumber,
  unitModels: state.unitModels,
  customers: state.customers,
  unitSerialNumberFormValues: getFormValues("unitSerialNumberForm")(state),
});
const mapDispatchToProps = (dispatch) => ({
  getUnitSerialNumber: (page, limit, keyword) =>
    UnitSerialNumberActions.getUnitSerialNumber(page, limit, keyword),
  handlePressAddNew: async () => {
    await dispatch(UnitSerialNumberActions.setSelectedUnitSerialNumberData({}));
    await dispatch(UnitSerialNumberActions.setSelectedUnitSerialNumberId(""));
    dispatch(UnitSerialNumberActions.setFormStatus("add"));
    dispatch(ComponentActions.setGlobalModal(true));
    UnitSerialNumberActions.resetForm();
  },
  handlePressEdit: async (record) => {
    await dispatch(UnitSerialNumberActions.setFormStatus("edit"));
    await dispatch(
      UnitSerialNumberActions.setSelectedUnitSerialNumberId(record.id)
    );
    await dispatch(
      UnitSerialNumberActions.setSelectedUnitSerialNumberData(record)
    );
    await dispatch(ComponentActions.setGlobalModal(true));
    await UnitSerialNumberActions.mapDetailUnitSerialNumberToForm();
  },
  handlePressDelete: async (unitModelId) => {
    await dispatch(
      UnitSerialNumberActions.setSelectedUnitSerialNumberId(unitModelId)
    );
    UnitSerialNumberActions.deleteUnitModelRequested(unitModelId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitSerialNumberContainer);

export default reduxForm({
  form: "unitSerialNumberForm",
})(EnhanceContainer);

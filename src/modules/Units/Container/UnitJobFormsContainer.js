import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { getFormValues, reduxForm } from "redux-form";
import * as UnitJobFormsActions from "../../Units/Store/UnitJobFormActions";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";
import { store } from "../../../app/ConfigureStore";
import UnitJobFormsComponent from "../Component/UnitJobFormsComponent";

const UnitJobFormsContainer = (props) => {
  const {
    units: { selectedUnitsData },
    unitJobForms: { listUnitJobForms },
    handlePressEdit,
    handlePressDelete,
  } = props;

  const { dispatch } = store;
  //   const { page, limit, totalPage } = paging;

  if (listUnitJobForms.length > 0) {
    listUnitJobForms.map((item, index) => {
      listUnitJobForms[index] = {
        ...item,
        no: index + 1,
      };
    });
  }

  const headers = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "10%",
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: "Job Form",
      dataIndex: "job_form_name",
      key: "job_form_name",
      width: "30%",
      sorter: (a, b) => a.job_form_name.length - b.job_form_name.length,
    },
    {
      title: "Deskripsi",
      dataIndex: "descriptions",
      key: "descriptions",
      width: "30%",
      sorter: (a, b) => a.descriptions.length - b.descriptions.length,
    },
  ];

  React.useEffect(() => {
    UnitJobFormsActions.getUnitJobFormsListDataRequested("");
    // getUnitSerialNumber(page, limit);
  }, []);

  const onSearch = (keyword) => {
    // UnitSerialNumberActions.handleSearch(unitSerialNumberFormValues, keyword);
  };

  return (
    <UnitJobFormsComponent
      headers={headers}
      selectedUnitsData={selectedUnitsData}
      listUnitSerialNumber={listUnitJobForms}
      onSearch={onSearch}
      // {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  units: state.units,
  unitJobForms: state.unitJobForms,
  unitSerialNumberFormValues: getFormValues("unitSerialNumberForm")(state),
});
const mapDispatchToProps = (dispatch) => ({});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitJobFormsContainer);

export default reduxForm({
  form: "unitJobForms",
})(EnhanceContainer);

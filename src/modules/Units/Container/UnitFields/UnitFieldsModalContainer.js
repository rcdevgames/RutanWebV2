import React from "react";
import { connect } from "react-redux";
import { change, reduxForm } from "redux-form";
import { validateFormUnitModel } from "../../../../app/validateForm";
import * as ComponentActions from "../../../App/Store/ComponentAction";
import * as UnitFieldsActions from "../../Store/UnitFieldsActions";
import { store } from "../../../../app/ConfigureStore";
import UnitFieldsModalComponent from "../../Component/UnitFields/UnitFieldsModalComponent";
import Invoke from "../../../../app/axios/Invoke";

const UnitFieldsModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    units: { formStatus, selectedUnitsData },
    handleSubmitForm,
  } = props;
  const [formCategory, setFormCategory] = React.useState([]);
  const [jobForm, setJobForm] = React.useState([]);

  const submitForm = (values) => {
    if (valid) {
      console.log("valid");
      handleSubmitForm(formStatus, values);
    } else {
    }
  };

  const loadOption = async () => {
    const { data } = await Invoke.getFormCategory(1, 100);
    const dataJobForm = await Invoke.getListJobForm(1, 100);
    const listFormCategory = data.callback.data;
    const listJobForm = dataJobForm.data.callback.data;

    const SelectFormCategory = [];
    listFormCategory.map((item, index) => {
      SelectFormCategory.push({
        id: `form-category-${index}`,
        value: item.id,
        label: item.name,
      });
    });
    const SelectJobForm = [];
    listJobForm.map((item, index) => {
      SelectJobForm.push({
        id: `job-form-${index}`,
        value: item.id,
        label: item.name,
      });
    });
    setFormCategory(SelectFormCategory);
    setJobForm(SelectJobForm);
  };

  React.useEffect(() => {
    loadOption();
  }, []);

  const handleUploadPhoto = (base64) => {
    store.dispatch(change("editUnitForm", `imageUrl`, base64 ?? ""));
  };

  return (
    <UnitFieldsModalComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      submitForm={submitForm}
      formStatus={formStatus}
      formName={formStatus === "add" ? "Tambah Data" : "Ubah Data"}
      handleUploadPhoto={handleUploadPhoto}
      selectedUnitsData={selectedUnitsData}
      enumFormCategory={formCategory}
      enumJobForm={jobForm}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  admins: state.admins,
  units: state.units,
  component: state.component,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  handleSubmitForm: (type, values) =>
    UnitFieldsActions.saveUnitFieldsRequested(type, values),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitFieldsModalContainer);

export default reduxForm({
  form: "editUnitFieldsForm",
  validate: validateFormUnitModel,
})(EnhanceContainer);

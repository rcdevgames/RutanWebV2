import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { validateFormTools } from "../../../app/validateForm";
import * as ComponentActions from "../../App/Store/ComponentAction";
import * as ToolsActions from "../Store/ToolsActions";
import ToolsModalComponent from "../Component/ToolsModalComponent";

const ToolsModalContainer = (props) => {
  const {
    valid,
    handleCancel,
    component: { isModalVisible },
    tools: { formStatus },
    masters: { listMenu },
    handleSubmitForm,
  } = props;

  const submitForm = (values) => {
    if (valid) {
      handleSubmitForm(formStatus, values);
    } else {
    }
  };

  const SelectMenu = [];
  listMenu.map((item, index) => {
    SelectMenu.push({
      id: `role-${index}`,
      value: item.id,
      label: item.menu,
    });
  });

  return (
    <ToolsModalComponent
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      submitForm={submitForm}
      formStatus={formStatus}
      formName={formStatus === "add" ? "Tambah Data" : "Ubah Data"}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  tools: state.tools,
  component: state.component,
  masters: state.masters,
});
const mapDispatchToProps = (dispatch) => ({
  handleCancel: () => dispatch(ComponentActions.setGlobalModal(false)),
  handleSubmitForm: (type, values) =>
    ToolsActions.saveToolsRequested(type, values),
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolsModalContainer);

export default reduxForm({
  form: "editToolsForm",
  validate: validateFormTools,
})(EnhanceContainer);

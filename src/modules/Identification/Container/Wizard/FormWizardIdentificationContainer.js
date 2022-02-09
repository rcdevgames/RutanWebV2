import React from "react";
import { connect } from "react-redux";
import { change, getFormValues, reduxForm } from "redux-form";
import Invoke from "../../../../app/axios/Invoke";
import {
  getCitiesEnum,
  getMachineConf,
  getProvinceEnum,
  SelectInstanceType,
  SelectInstanceTypeRegular,
  SelectStatusMilling,
} from "../../../../app/Helpers";
import ContentStepOneComponent from "../../Component/Wizard/ContentStepOneComponent";
import ContentUnitComponent from "../../Component/Wizard/ContentUnitComponent";
import ContentSparePartComponent from "../../Component/Wizard/ContentSparePartComponent";
import FormWizardIdentificationComponent from "../../Component/Wizard/FormWizardIdentificationComponent";
import ContentMachineConfigurationComponent from "../../Component/Wizard/ContentMachineConfigurationComponent";
import { store } from "../../../../app/ConfigureStore";
import ContentStepOneRegularComponent from "../../Component/Wizard/ContentStepOneRegularComponent";
import * as IdentificationActions from "../../Store/IdentificationActions";

const FormWizardIdentificationContainer = (props) => {
  const [cities, setCities] = React.useState([]);
  const [serviced, setServiced] = React.useState(false);
  const {
    identification: { selectedIdentificationData, formStatus },
    masters: { listProvince },
    machineConfiguration: { listMachine },
    identificationFormValues,
  } = props;

  const onChangeProvince = async (provinceId) => {
    setCities([]);
    try {
      if (provinceId) {
        const splitProvince = provinceId.split("|");
        const { data } = await Invoke.getCityList(1, 100, splitProvince[0]);
        const provinceMapping = getCitiesEnum(data.callback.data);
        setCities(provinceMapping);
      } else {
        store.dispatch(change("wizardIdentificationForm", `city`, ""));
        setCities([]);
      }
    } catch (error) {
      setCities([]);
      console.log("Error : ", error);
    }
  };

  const onChangeServiced = (val) => {
    const isServiced = val.split("|");
    if (isServiced[0] === "true") {
      setServiced(true);
    } else {
      setServiced(false);
    }
  };

  const onAddMachineConf = (item) => {
    store.dispatch(
      change(
        "wizardIdentificationForm",
        `engine_confs.${item.name}.id`,
        item.id
      )
    );
  };

  const saveFormChanges = (isLastStep) => {
    IdentificationActions.saveIdentificationRequested(
      formStatus,
      identificationFormValues,
      isLastStep
    );
  };

  const steps = [];

  if (selectedIdentificationData.milling) {
    steps.push({
      title: "Customer",
      content: (
        <ContentStepOneComponent
          provinces={getProvinceEnum(listProvince)}
          cities={cities}
          onChangeProvince={onChangeProvince}
          enumInstanceType={SelectInstanceType}
          enumStatusMilling={SelectStatusMilling}
        />
      ),
    });
    steps.push({
      title: "Konfigurasi Mesin",
      content: (
        <ContentMachineConfigurationComponent
          machineConf={getMachineConf(listMachine)}
          onAddMachineConf={onAddMachineConf}
        />
      ),
    });
  } else {
    steps.push({
      title: "Customer",
      content: (
        <ContentStepOneRegularComponent
          provinces={getProvinceEnum(listProvince)}
          cities={cities}
          onChangeProvince={onChangeProvince}
          enumInstanceType={SelectInstanceTypeRegular}
          enumStatusMilling={SelectStatusMilling}
        />
      ),
    });
    steps.push({
      title: "Unit",
      content: <ContentUnitComponent />,
    });
  }

  steps.push({
    title: "Spare Part",
    content: (
      <ContentSparePartComponent
        onChangeServiced={onChangeServiced}
        isServiced={serviced}
      />
    ),
  });

  return (
    <FormWizardIdentificationComponent
      data={selectedIdentificationData}
      steps={steps}
      saveFormChanges={saveFormChanges}
    />
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
  detailService: state.detailService,
  identification: state.identification,
  masters: state.masters,
  machineConfiguration: state.machineConfiguration,
  identificationFormValues: getFormValues("wizardIdentificationForm")(state),
});
const mapDispatchToProps = (dispatch) => ({});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormWizardIdentificationContainer);

export default reduxForm({
  form: "wizardIdentificationForm",
})(EnhanceContainer);

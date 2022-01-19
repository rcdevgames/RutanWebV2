import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Invoke from "../../../../app/axios/Invoke";
import {
  getCitiesEnum,
  getMachineConf,
  getProvinceEnum,
  machineConf,
  SelectInstanceType,
  SelectStatusMilling,
} from "../../../../app/Helpers";
import ContentStepOneComponent from "../../Component/Wizard/ContentStepOneComponent";
import ContentStepTwoComponent from "../../Component/Wizard/ContentStepTwoComponent";
import ContentSparePartComponent from "../../Component/Wizard/ContentSparePartComponent";
import FormWizardIdentificationComponent from "../../Component/Wizard/FormWizardIdentificationComponent";
import ContentMachineConfigurationComponent from "../../Component/Wizard/ContentMachineConfigurationComponent";

const FormWizardIdentificationContainer = (props) => {
  const [cities, setCities] = React.useState([]);
  const [serviced, setServiced] = React.useState(false);
  const {
    identification: { selectedIdentificationData },
    masters: { listProvince },
    machineConfiguration: { listMachine },
  } = props;

  const onChangeProvince = async (provinceId) => {
    try {
      const splitProvince = provinceId.split("|");
      const { data } = await Invoke.getCityList(1, 100, splitProvince[0]);
      const provinceMapping = getCitiesEnum(data.callback);
      setCities(provinceMapping);
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

  const steps = [];

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

  if (selectedIdentificationData.milling) {
    steps.push({
      title: "Konfigurasi Mesin",
      content: (
        <ContentMachineConfigurationComponent
          machineConf={getMachineConf(listMachine)}
        />
      ),
    });
  } else {
    steps.push({
      title: "Unit",
      content: <ContentStepTwoComponent />,
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
    />
  );
};

const mapStateToProps = (state) => ({
  services: state.services,
  detailService: state.detailService,
  identification: state.identification,
  masters: state.masters,
  machineConfiguration: state.machineConfiguration,
});
const mapDispatchToProps = (dispatch) => ({});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormWizardIdentificationContainer);

export default reduxForm({
  form: "wizardIdentificationForm",
})(EnhanceContainer);

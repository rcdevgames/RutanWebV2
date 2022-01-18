import React from "react";
import { connect } from "react-redux";
import { getFormValues, reduxForm, reset } from "redux-form";
import ExternalServiceComponent from "../Component/ExternalServiceComponent";
import * as validateForm from "../../../app/validateForm";
import * as CustomerActions from "../../Customers/Store/CustomersActions";
import * as EmployeeActions from "../../Employees/Store/EmployeesActions";
import * as MasterDataActions from "../../MasterData/Store/MasterDataActions";
import * as ExternalServiceActions from "../Store/ExternalServiceActions";
import * as UnitsActions from "../../Units/Store/UnitsActions";
import * as JobFormsActions from "../../JobForms/Store/JobFormsActions";
import { enumTypeExternalServices, enumWarranty } from "../../../app/Helpers";

const ExternalServiceContainer = (props) => {
  const [unitQty, setUnitQty] = React.useState(1);
  const [unitData, setUnitData] = React.useState([]);
  const [selectedUnitModelList, setSelectedUnitModelList] = React.useState([]);

  const {
    valid,
    customers: { listCustomers },
    employees: { listEmployees },
    units: { listUnits },
    jobForms: { listJobForms },
    resetForm,
    formValues,
    // form: { externalServiceForm },
  } = props;

  const submitForm = (values) => {
    if (valid) {
      // AuthActions.handleSubmitLogin(values);
      console.log("success");
    }
  };

  const handleAddNewUnit = () => {
    if (unitQty === 5) {
      return;
    }
    setUnitQty(unitQty + 1);
  };

  const handleSubtractUnit = () => {
    if (unitQty === 0) {
      return;
    }
    setUnitQty(unitQty - 1);
  };

  const getData = () => {
    console.log("=== formValues : ", formValues);
    const units = formValues.units;
    const unitModel = [];

    if (units.length > 0) {
      units.map((item, indexUnit) => {
        item.enumModel.map((item, indexEnumModel) => {
          const subItem = {
            id: `unit-model-${indexEnumModel}`,
            value: item.id,
            label: item.name,
          };
          unitModel.push(subItem);
        });
      });
    }

    setSelectedUnitModelList(unitModel);
  };

  React.useEffect(() => {
    getData();
  }, [formValues]);

  React.useEffect(() => {
    CustomerActions.loadCustomerListData();
    EmployeeActions.loadEmployeeListData();
    MasterDataActions.loadProvinceListData();
    return () => {
      console.log("=== reset Form");
      resetForm();
    };
  }, []);

  const SelectCustomerData = [];
  listCustomers.map((item, index) => {
    SelectCustomerData.push({
      id: `customer-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  const SelectEmployeeData = [];
  listEmployees.map((item, index) => {
    SelectEmployeeData.push({
      id: `employee-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  const SelectUnitData = [];
  listUnits.map((item, index) => {
    SelectUnitData.push({
      id: `unit-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  const SelectJobFormsData = [];
  listJobForms.map((item, index) => {
    SelectJobFormsData.push({
      id: `job-forms-${index}`,
      value: item.id,
      label: item.name,
    });
  });

  React.useEffect(() => {
    UnitsActions.getUnitListDataRequested();
    JobFormsActions.getJobFormsListDataRequested();
    let totalUnit = [];
    for (let i = 0; i < unitQty; i++) {
      totalUnit.push(i);
    }
    setUnitData(totalUnit);
  }, [unitQty]);

  return (
    <ExternalServiceComponent
      listCustomers={SelectCustomerData}
      listEmployee={SelectEmployeeData}
      listUnit={SelectUnitData}
      enumJobForms={SelectJobFormsData}
      enumType={enumTypeExternalServices}
      enumWarranty={enumWarranty}
      submitForm={submitForm}
      handleAddNewUnit={handleAddNewUnit}
      handleSubtractUnit={handleSubtractUnit}
      unitData={unitData}
      selectedUnitModelList={selectedUnitModelList}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  customers: state.customers,
  employees: state.employees,
  units: state.units,
  jobForms: state.jobForms,
  formValues: getFormValues("externalServiceForm")(state),
});
const mapDispatchToProps = (dispatch) => ({
  resetForm: () => {
    dispatch(reset("externalServiceForm"));
  },
  handleAutoPopulateEmployee: (employeeId, indexEmployee) => {
    const arrVal = employeeId.split("|");
    ExternalServiceActions.setAutoPopulateEmployee(arrVal[0], indexEmployee);
  },
  handleAutoPopulateCustomer: (customerId) => {
    const arrVal = customerId.split("|");
    ExternalServiceActions.setAutoPopulateCustomer(arrVal[0]);
  },
  handleAutoPopulateUnitModel: (unitId, fieldIndex) => {
    const arrVal = unitId.split("|");
    ExternalServiceActions.setAutoPopulateUnitModel(arrVal[0], fieldIndex);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExternalServiceContainer);

export default reduxForm({
  form: "externalServiceForm",
  validate: validateForm.validateFormExternalService,
})(EnhanceContainer);

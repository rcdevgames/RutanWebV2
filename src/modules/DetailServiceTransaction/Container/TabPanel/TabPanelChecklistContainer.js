import React, { useState } from "react";
import Invoke from "../../../../app/axios/Invoke";
import { store } from "../../../../app/ConfigureStore";
import { isBlockedRoleDetailService } from "../../../../app/Helpers";
import { setGlobalLoading } from "../../../App/Store/ComponentAction";
import { showToast } from "../../../Roles/Store/RolesActions";
import TabPanelChecklistComponent from "../../Component/TabPanel/TabPanelChecklistComponent";
import { setGroupingChecklistData } from "../../Store/DetailServiceTransactionAction";

const TabPanelChecklistContainer = (props) => {
  const { roles, checklist, isLoaded } = props;
  const [isBlocked, setIsBlocked] = useState(false);

  React.useEffect(() => {
    checkBlockedRole();
  }, []);

  const checkBlockedRole = () => {
    const roleId = roles[0].role_id;
    const isBlockedRole = isBlockedRoleDetailService(roleId);
    if (isBlockedRole) {
      setIsBlocked(isBlockedRole);
    } else {
      setIsBlocked(false);
    }
  };

  const handleSubmitUpdateChecklist = async () => {
    const { dispatch } = store;
    dispatch(setGlobalLoading(true));
    const payload = {};
    let countHitApi = 0;
    payload.checklist = [];
    payload.note = "";

    // Looping the checklist by unit
    checklist.map(async (itemParent, index) => {
      // Looping the fields by checklist unit
      itemParent.checklist.map((itemChecklist, indexChecklist) => {
        itemChecklist.fields.map((itemFields, indexFields) => {
          const item = {};
          item.unit_field_id = itemFields.unit_field_id;
          item.category_form_id = itemChecklist.category_form_id;
          item.is_check = itemFields.is_check;
          item.is_adjust = itemFields.is_adjust;
          item.is_repair = itemFields.is_repair;
          item.is_replace = itemFields.is_replace;
          payload.checklist.push(item);
        });
      });

      try {
        await Invoke.updateChecklist(payload, itemParent.unitId);
        if (countHitApi === checklist.length - 1) {
          showToast("Berhasil menyimpan checklist", "success");
          dispatch(setGlobalLoading(false));
        } else {
          countHitApi += 1;
        }
      } catch (error) {
        showToast("Gagal menyimpan checklist", "error");
        dispatch(setGlobalLoading(false));
      }
    });
  };

  const handleChangeRadio = (
    val,
    indexChecklist,
    indexFields,
    indexUnit,
    itemFields
  ) => {
    const { dispatch } = store;
    let checklistTemp = checklist;
    const valueCheck = val.target.value;

    if (valueCheck === `${itemFields.unit_field_id}-is_check`) {
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_check = true;
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_adjust = false;
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_replace = false;
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_repair = false;
    } else if (valueCheck === `${itemFields.unit_field_id}-is_adjust`) {
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_check = false;
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_adjust = true;
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_replace = false;
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_repair = false;
    } else if (valueCheck === `${itemFields.unit_field_id}-is_replace`) {
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_check = false;
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_adjust = false;
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_replace = true;
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_repair = false;
    } else if (valueCheck === `${itemFields.unit_field_id}-is_repair`) {
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_check = false;
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_adjust = false;
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_replace = false;
      checklistTemp[indexUnit].checklist[indexChecklist].fields[
        indexFields
      ].is_repair = true;
    }

    dispatch(setGroupingChecklistData(checklistTemp));
  };

  const getDefaultValueCheckbox = (field) => {
    if (field.is_adjust) {
      return `${field.unit_field_id}-${Object.keys(field)[3]}`;
    } else if (field.is_check) {
      return `${field.unit_field_id}-${Object.keys(field)[2]}`;
    } else if (field.is_repair) {
      return `${field.unit_field_id}-${Object.keys(field)[4]}`;
    } else if (field.is_replace) {
      return `${field.unit_field_id}-${Object.keys(field)[5]}`;
    }
  };

  return (
    <TabPanelChecklistComponent
      isLoaded={isLoaded}
      isBlocked={isBlocked}
      checklistArr={checklist}
      handleChangeRadio={handleChangeRadio}
      getDefaultValueCheckbox={getDefaultValueCheckbox}
      handleSubmitUpdateChecklist={handleSubmitUpdateChecklist}
      {...props}
    />
  );
};

export default TabPanelChecklistContainer;

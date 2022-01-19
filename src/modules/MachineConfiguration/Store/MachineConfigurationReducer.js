import {
  SET_MACHINE_LIST_DATA,
  SET_FORM_STATUS,
  SET_SELECTED_MACHINE_ID,
  SET_SELECTED_MACHINE_DATA,
} from "./MachineConfigurationActions";

export const initialState = {
  listMachine: [],
  selectedMachineId: "",
  selectedMachineData: {},
  formStatus: "add",
};

export default function machineConfigurationReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_MACHINE_LIST_DATA:
      newState.listMachine = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_SELECTED_MACHINE_ID:
      newState.selectedMachineId = action.payload;
      return { ...newState };

    case SET_SELECTED_MACHINE_DATA:
      newState.selectedMachineData = action.payload;
      return { ...newState };
  }

  return state;
}

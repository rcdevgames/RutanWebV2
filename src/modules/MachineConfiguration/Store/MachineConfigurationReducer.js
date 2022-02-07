import {
  SET_MACHINE_LIST_DATA,
  SET_FORM_STATUS,
  SET_SELECTED_MACHINE_ID,
  SET_SELECTED_MACHINE_DATA,
  SET_PAGING_MACHINE_CONF,
} from "./MachineConfigurationActions";

export const initialState = {
  listMachine: [],
  selectedMachineId: "",
  selectedMachineData: {},
  formStatus: "add",
  paging: {
    page: 1,
    limit: 10,
    totalPage: 0,
  },
};

export default function machineConfigurationReducer(
  state = initialState,
  action
) {
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

    case SET_PAGING_MACHINE_CONF:
      newState.paging = action.payload;
      return { ...newState };
  }

  return state;
}

import {
  SET_TOOLS_LIST_DATA,
  SET_FORM_STATUS,
  SET_SELECTED_TOOLS_ID,
  SET_SELECTED_TOOLS_DATA,
  SET_PAGING_TOOLS,
} from "./ToolsActions";

export const initialState = {
  listTools: [],
  selectedToolsId: "",
  selectedToolsData: {},
  formStatus: "add",
  paging: {
    page: 1,
    limit: 10,
    totalPage: 0,
  },
};

export default function toolsReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_TOOLS_LIST_DATA:
      newState.listTools = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_SELECTED_TOOLS_ID:
      newState.selectedToolsId = action.payload;
      return { ...newState };

    case SET_SELECTED_TOOLS_DATA:
      newState.selectedToolsData = action.payload;
      return { ...newState };

    case SET_PAGING_TOOLS:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}

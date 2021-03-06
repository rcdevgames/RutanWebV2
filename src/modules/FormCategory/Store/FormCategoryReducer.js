import {
  SET_FORM_CATEGORY_LIST_DATA,
  SET_FORM_STATUS,
  SET_SELECTED_FORM_CATEGORY_ID,
  SET_SELECTED_FORM_CATEGORY_DATA,
  SET_PAGING_FORM_CATEGORY
} from "./FormCategoryActions";

export const initialState = {
  listFormCategory: [],
  selectedFormCategoryId: "",
  selectedFormCategoryData: {},
  formStatus: "add",
  paging: {
    page: 1,
    limit: 10,
    totalPage: 0,
  },
};

export default function formCategoryReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_FORM_CATEGORY_LIST_DATA:
      newState.listFormCategory = action.payload;
      return { ...newState };

    case SET_FORM_STATUS:
      newState.formStatus = action.payload;
      return { ...newState };

    case SET_SELECTED_FORM_CATEGORY_ID:
      newState.selectedFormCategoryId = action.payload;
      return { ...newState };

    case SET_SELECTED_FORM_CATEGORY_DATA:
      newState.selectedFormCategoryData = action.payload;
      return { ...newState };

    case SET_PAGING_FORM_CATEGORY:
      newState.paging = { ...state.paging, ...action.payload };
      return { ...newState };
  }

  return state;
}

import { PROCESS_GLOBAL_LOADING } from "./ComponentAction";

export const initialState = {
  isLoadingGlobal: false,
};

export default function ComponentReducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  const newState = Object.assign({}, state);

  // eslint-disable-next-line default-case
  switch (action.type) {
    case PROCESS_GLOBAL_LOADING: {
      newState.isLoadingGlobal = action.payload;
      return { ...newState };
    }
  }
  return state;
}

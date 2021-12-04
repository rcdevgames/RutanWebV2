import * as _ from "lodash";
import { applyMiddleware, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import Saga from "./Saga/SagaMiddleware";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import history from "../app/History";
import rootReducers from "./RootReducers";
import { routerMiddleware } from "connected-react-router";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["form"],
};

const resetEnhancer = (rootReducer) => (state, action) => {
  if (action.type !== "LOGOUT") {
    return rootReducer(state, action);
  } else {
    const newState = rootReducer(undefined, {});
    newState.router = state.router;
    return newState;
  }
};

const persistedReducer = persistReducer(
  persistConfig,
  resetEnhancer(rootReducers)
);

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  _.has(window, "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__")
    ? composeWithDevTools({ trace: true, traceLimit: 1000 })
    : compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);
export const persistor = persistStore(store);
sagaMiddleware.run(Saga);

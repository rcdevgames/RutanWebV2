import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "antd/dist/antd.css";
import { ConnectedRouter } from "connected-react-router";
import history from "./app/History";
import { Provider } from "react-redux";
import { persistor, store } from "./app/ConfigureStore";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./app/Navigation";

function App({ context }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Navigation />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

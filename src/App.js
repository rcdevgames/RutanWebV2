import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "antd/dist/antd.css";
import { ConnectedRouter } from "connected-react-router";
import history from "./app/History";
import { Provider } from "react-redux";
import { persistor, store } from "./app/ConfigureStore";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./app/Navigation";
import { BrowserRouter } from "react-router-dom";

function App({ context }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <BrowserRouter>
            <Navigation />
          </BrowserRouter>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

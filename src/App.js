import "./App.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import { ConnectedRouter } from "connected-react-router";
import history from "./app/History";
import { Provider } from "react-redux";
import { persistor, store } from "./app/ConfigureStore";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./app/Navigation";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Sidebar />
        <div class="page-wrapper">
          <Navbar />
          <ConnectedRouter history={history}>
            <Navigation />
          </ConnectedRouter>
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;

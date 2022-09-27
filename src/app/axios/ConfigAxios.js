// First we need to import axios.js
import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";

// Next we make an 'instance' of it
const ConfigAxios = axios.create({
  // .. where we make our configurations
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization",
  },
  timeout: 15000,
});
ConfigAxios.defaults.headers.delete = {
  "Content-Type": "application/json",
};

// Where you would set stuff like your 'Authorization' header, etc ...
// ConfigAxios.defaults.headers.common["Authorization"] =
//   "AUTH TOKEN FROM INSTANCE";

// Also add/ configure interceptors && all the other cool stuff
ConfigAxios.interceptors.request.use(
  (requestFulfilled) => {
    if (requestFulfilled.method === "get") {
      requestFulfilled.data = true;
    }
    if (
      process.env.NODE_ENV === "development" &&
      !_.isEmpty(requestFulfilled)
    ) {
      console.log(
        "axios-debug-request-fulfilled",
        JSON.parse(JSON.stringify(requestFulfilled))
      );
    }
    return Promise.resolve(requestFulfilled);
  },
  (requestRejected) => {
    if (!_.isEmpty(requestRejected)) {
      if (process.env.NODE_ENV === "development") {
        console.log(
          "axios-debug-request-rejected",
          JSON.parse(
            JSON.stringify(requestRejected.response || requestRejected)
          )
        );
      }
    }
    return Promise.reject(requestRejected);
  }
);

ConfigAxios.interceptors.response.use(
  (responseFulfilled) => {
    if (
      process.env.NODE_ENV === "development" &&
      !_.isEmpty(responseFulfilled)
    ) {
      console.log(
        "axios-debug-response-fulfilled",
        JSON.parse(JSON.stringify(responseFulfilled))
      );
    }
    return Promise.resolve(responseFulfilled);
  },
  (responseRejected) => {
    if (responseRejected.response && responseRejected.response.data) {
      if (responseRejected.response.data.status === 400) {
        toast.warning(responseRejected.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Request Timeout!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    if (!_.isEmpty(responseRejected)) {
      if (process.env.NODE_ENV === "development") {
        console.log(
          "axios-debug-response-rejected",
          JSON.parse(
            JSON.stringify(responseRejected.response || responseRejected)
          )
        );
      }
    }
    return Promise.reject(responseRejected);
  }
);

export default ConfigAxios;

// First we need to import axios.js
import axios from "axios";
import _ from "lodash";

// Next we make an 'instance' of it
const ConfigAxios = axios.create({
  // .. where we make our configurations
  baseURL: "http://109.235.71.161:3000",
  headers: { "Content-Type": "application/json" },
});

// Where you would set stuff like your 'Authorization' header, etc ...
ConfigAxios.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

// Also add/ configure interceptors && all the other cool stuff

axios.interceptors.request.use(
  (requestFulfilled) => {
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

export default ConfigAxios;

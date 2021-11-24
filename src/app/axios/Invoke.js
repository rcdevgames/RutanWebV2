import ConfigAxios from "./ConfigAxios";

const Invoke = {};

Invoke.submitLogin = (data) => {
  return ConfigAxios.post("/login", data);
};

export default Invoke;

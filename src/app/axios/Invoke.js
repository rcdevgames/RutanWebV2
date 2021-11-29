import ConfigAxios from "./ConfigAxios";

const Invoke = {};

Invoke.submitLogin = (data) => {
  return ConfigAxios.post("/login", data);
};

Invoke.getListServices = (page, limit) => {
  return ConfigAxios.get(`/services?page=${page}&limit=${limit}`);
};

Invoke.getListAdmin = (page, limit) => {
  return ConfigAxios.get(`/admins?page=${page}&limit=${limit}`);
};

export default Invoke;

import ConfigAxios from "./ConfigAxios";

const Invoke = {};
const headersConfigDelete = {
  headers: {
    "Content-Type": "application/json",
  },
  data: {},
};

Invoke.submitLogin = (data) => {
  return ConfigAxios.post("/login", data);
};

Invoke.submitLoginEmployee = (data) => {
  return ConfigAxios.post("/m_auth", data);
};

Invoke.getListServices = (page, limit) => {
  return ConfigAxios.get(`/services?page=${page}&limit=${limit}`);
};

// === Admin API : ===
Invoke.getListAdmin = (page, limit) => {
  return ConfigAxios.get(`/admins?page=${page}&limit=${limit}`);
};

Invoke.getAdminById = (adminId) => {
  return ConfigAxios.get(`/admins/${adminId}`);
};

Invoke.addAdmin = (data) => {
  return ConfigAxios.post("/admins", data);
};

Invoke.updateAdmin = (data) => {
  return ConfigAxios.put("/admins", data);
};

Invoke.deleteAdminById = (adminId) => {
  return ConfigAxios.delete(`/admins/${adminId}`);
};
// === End Admin API ===

// === Admin - Roles API : ===
Invoke.getListAdminRoles = (adminId, page, limit) => {
  return ConfigAxios.get(
    `/admins/roles/${adminId}?page=${page}&limit=${limit}`
  );
};

Invoke.getAdminRolesById = (customerId) => {
  return ConfigAxios.get(`/admins/roles${customerId}`);
};

Invoke.addAdminRoles = (data) => {
  return ConfigAxios.post("/admins/roles", data);
};

Invoke.updateAdminRoles = (data) => {
  return ConfigAxios.put("/admins/roles", data);
};

Invoke.deleteAdminRolesById = (customerId) => {
  return ConfigAxios.delete(`/admins/roles${customerId}`);
};
// === End Admin - Roles API ===

// === Employee - Roles API : ===
Invoke.getEmployeeRoles = (employeeId, page, limit) => {
  return ConfigAxios.get(
    `/employees/roles/${employeeId}?page=${page}&limit=${limit}`
  );
};

Invoke.addEmployeeRole = (data) => {
  return ConfigAxios.post(`/employees/roles`, data);
};

Invoke.deleteEmployeeRole = (id) => {
  return ConfigAxios.delete(`/employees/roles/${id}`, headersConfigDelete);
};
// === End Employee - Roles API ===

// === Customers API ===
Invoke.getCustomerList = (page, limit) => {
  return ConfigAxios.get(`/customers?page=${page}&limit=${limit}`);
};
Invoke.getCustomerById = (customerId) => {
  return ConfigAxios.get(`/customers/${customerId}`);
};

Invoke.addCustomer = (data) => {
  return ConfigAxios.post("/customers", data);
};

Invoke.updateCustomer = (data) => {
  return ConfigAxios.put("/customers", data);
};

Invoke.deleteCustomerById = (customerId) => {
  return ConfigAxios.delete(`/customers/${customerId}`);
};
// === End Customers API ===

// === Employee API === :
Invoke.getEmployeeList = (page, limit) => {
  return ConfigAxios.get(`/employees?page=${page}&limit=${limit}`);
};

Invoke.getEmployeeById = (employeeId) => {
  return ConfigAxios.get(`/employees/${employeeId}`);
};

Invoke.addEmployee = (data) => {
  return ConfigAxios.post("/employees", data);
};

Invoke.updateEmployee = (data) => {
  return ConfigAxios.put("/employees", data);
};

Invoke.deleteEmployeeById = (employeeId) => {
  return ConfigAxios.delete(`/employees/${employeeId}`);
};
// === End employee API ===

// === Employee - Tools API : ===
Invoke.getListEmployeeTools = (employeeId, page, limit) => {
  return ConfigAxios.get(
    `/admins/roles/${employeeId}?page=${page}&limit=${limit}`
  );
};

Invoke.getEmployeeToolsById = (employeeId) => {
  return ConfigAxios.get(`/employees/tools${employeeId}`);
};

Invoke.addEmployeeTools = (data) => {
  return ConfigAxios.post("/employees/tools", data);
};

Invoke.updateEmployeeTools = (data) => {
  return ConfigAxios.put("/employees/tools", data);
};

Invoke.deleteEmployeeToolsById = (employeeId) => {
  return ConfigAxios.delete(`/employees/tools${employeeId}`);
};
// === End Employee - Tools API ===

// === Roles API ===
Invoke.getListRole = (page, limit) => {
  return ConfigAxios.get(`/roles?page=${page}&limit=${limit}`);
};
Invoke.getRoleById = (customerId) => {
  return ConfigAxios.get(`/roles/${customerId}`);
};

Invoke.addRole = (data) => {
  return ConfigAxios.post("/roles", data);
};

Invoke.updateRole = (data) => {
  return ConfigAxios.put("/roles", data);
};

Invoke.deleteRoleById = (roleId) => {
  return ConfigAxios.delete(`/roles/${roleId}`, headersConfigDelete);
};
// === End Roles API ===

// === Master Province API === :
Invoke.getProvinceList = (page, limit) => {
  return ConfigAxios.get(`/provinces?page=${page}&limit=${limit}`);
};
// === End Master Province API ===

// === Master Cities API === :
Invoke.getCityList = (page, limit, provinceId) => {
  return ConfigAxios.get(
    `/provinces/cities/${provinceId}?page=${page}&limit=${limit}`
  );
};
// === End Master Cities API ===

// === Services API ===
Invoke.addInternalService = (data) => {
  return ConfigAxios.post("/services", data);
};
// === End Service API ===

// === Master Unit API === :
Invoke.getUnitList = (page, limit) => {
  return ConfigAxios.get(`/units?page=${page}&limit=${limit}`);
};
// === End Master Unit API ===

// === Master unit-model API === :
Invoke.getListUnitModel = (page, limit, unitId) => {
  return ConfigAxios.get(`/units/models/${unitId}?page=${page}&limit=${limit}`);
};
// === End Master Unit-Model API ===

// === Master Job-Form API === :
Invoke.getListJobForm = (page, limit) => {
  return ConfigAxios.get(`job_forms?page=${page}&limit=${limit}`);
};
// === End Job-Form API ===

// === Master Branch API === :
Invoke.getListBranch = (page, limit) => {
  return ConfigAxios.get(`/branches?page=${page}&limit=${limit}`);
};
// === End Branch API ===

// === Master Menu API === :
Invoke.getListMenu = (page, limit) => {
  return ConfigAxios.get(`/menus?page=${page}&limit=${limit}`);
};
// === End Menu API ===

// === Master Menu - Roles API === :
Invoke.addMenuRole = (payload) => {
  return ConfigAxios.post(`/menus/roles`, payload);
};

Invoke.getMenuByRoleId = (roleId) => {
  return ConfigAxios.get(`/menus/menu_by_role/${roleId}`);
};

Invoke.deleteMenuByMenuRoleId = (menuRoleId) => {
  return ConfigAxios.delete(`menus/roles/${menuRoleId}`, headersConfigDelete);
};
// === End Menu - Roles API ===

export default Invoke;

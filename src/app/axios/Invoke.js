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
Invoke.getListAdmin = (page, limit, keyword = "") => {
  return ConfigAxios.get(`/admins?page=${page}&limit=${limit}&q=${keyword}`);
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
Invoke.getCustomerList = (page, limit, keyword = "") => {
  return ConfigAxios.get(`/customers?page=${page}&limit=${limit}&q=${keyword}`);
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
Invoke.getEmployeeList = (page, limit, keyword = "") => {
  return ConfigAxios.get(`/employees?page=${page}&limit=${limit}&q=${keyword}`);
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

// Services - Employee API
Invoke.getServicesEmployee = (jobId, page, limit) => {
  return ConfigAxios.get(
    `/services/employees/${jobId}?page=${page}&limit=${limit}`
  );
};
Invoke.addNewEmployeeService = (jobId, payload) => {
  return ConfigAxios.post(`/services/employees/${jobId}`, payload);
};
Invoke.setStatusEmployeeService = (jobId, payload) => {
  return ConfigAxios.put(
    `/services/employees/${jobId}`,
    payload,
    headersConfigDelete
  );
};
// End Services - Employee API

// === Service - Views API ===
Invoke.getJobServiceSummary = (jobId) => {
  return ConfigAxios.get(`/services/summary/${jobId}`);
};
Invoke.getJobServiceMedia = (jobId) => {
  return ConfigAxios.get(`/services/medias/${jobId}`);
};
Invoke.getJobServiceDailies = (jobId) => {
  return ConfigAxios.get(`/services/dailies/${jobId}`);
};
// === End Service Views ===

// === Master Unit API === :
Invoke.getUnitList = (page, limit, keyword) => {
  return ConfigAxios.get(`/units?page=${page}&limit=${limit}&q=${keyword}`);
};
Invoke.addUnit = (payload) => {
  return ConfigAxios.post(`/units`, payload);
};
Invoke.updateUnit = (payload) => {
  return ConfigAxios.put(`/units`, payload);
};
Invoke.deleteUnitById = (unitId) => {
  return ConfigAxios.delete(`units/${unitId}`, headersConfigDelete);
};
// === End Master Unit API ===

// === Master unit-model API === :
Invoke.getListUnitModel = (page, limit, unitId, keyword) => {
  return ConfigAxios.get(
    `/units/models/${unitId}?page=${page}&limit=${limit}&q=${keyword}`
  );
};
Invoke.addUnitModel = (payload) => {
  return ConfigAxios.post(`/units/models`, payload);
};
Invoke.updateUnitModel = (payload) => {
  return ConfigAxios.put(`/units/models`, payload);
};
Invoke.deleteUnitModelById = (unitModelId) => {
  return ConfigAxios.delete(`units/models/${unitModelId}`, headersConfigDelete);
};
// === End Master Unit-Model API ===

// === Master Job-Form API === :
Invoke.getListJobForm = (page, limit) => {
  return ConfigAxios.get(`job_forms?page=${page}&limit=${limit}`);
};
Invoke.addJobForms = (payload) => {
  return ConfigAxios.post(`job_forms`, payload);
};
Invoke.updateJobForms = (payload) => {
  return ConfigAxios.put(`job_forms`, payload);
};
Invoke.deleteJobForms = (jobFormsId) => {
  return ConfigAxios.delete(`job_forms/${jobFormsId}`, headersConfigDelete);
};
// === End Job-Form API ===

// === Master Branch API === :
Invoke.getListBranch = (page, limit, keyword) => {
  return ConfigAxios.get(`/branches?page=${page}&limit=${limit}&q=${keyword}`);
};
Invoke.deleteBranchById = (branchId) => {
  return ConfigAxios.delete(`/branches/${branchId}`, headersConfigDelete);
};
Invoke.addBranch = (payload) => {
  return ConfigAxios.post(`/branches`, payload);
};
Invoke.updateBranch = (payload) => {
  return ConfigAxios.put(`/branches`, payload);
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

// === Master Engines API === :
Invoke.getListEngine = (page, limit) => {
  return ConfigAxios.get(`/engines?page=${page}&limit=${limit}`);
};
Invoke.addEngine = (payload) => {
  return ConfigAxios.post(`/engines`, payload);
};
Invoke.updateEngine = (payload) => {
  return ConfigAxios.put(`/engines`, payload);
};
Invoke.deleteEngine = (machineId) => {
  return ConfigAxios.delete(`/engines/${machineId}`, headersConfigDelete);
};
// === End Engines API ===

// === Master Tools API === :
Invoke.getListTools = (page, limit) => {
  return ConfigAxios.get(`/tools?page=${page}&limit=${limit}`);
};
Invoke.addTool = (payload) => {
  return ConfigAxios.post(`/tools`, payload);
};
Invoke.updateTool = (payload) => {
  return ConfigAxios.put(`/tools`, payload);
};
Invoke.deleteTool = (toolId) => {
  return ConfigAxios.delete(`/tools/${toolId}`, headersConfigDelete);
};
// === End Tools API ===

// === Master FormCategory API === :
Invoke.getFormCategory = (page, limit) => {
  return ConfigAxios.get(`/category_forms?page=${page}&limit=${limit}`);
};
Invoke.addFormCategory = (payload) => {
  return ConfigAxios.post(`/category_forms`, payload);
};
Invoke.updateFormCategory = (payload) => {
  return ConfigAxios.put(`/category_forms`, payload);
};
Invoke.deleteFormCategory = (categoryFormId) => {
  return ConfigAxios.delete(
    `/category_forms/${categoryFormId}`,
    headersConfigDelete
  );
};
// === End FormCategory API ===

// === Master Identification API === :
Invoke.getIdentificationList = (page, limit) => {
  return ConfigAxios.get(`/identifications?page=${page}&limit=${limit}`);
};
Invoke.addIdentification = (payload) => {
  return ConfigAxios.post(`/identifications`, payload);
};
Invoke.updateIdentificationMilling = (payload) => {
  return ConfigAxios.post("/m_identifications/milling", payload);
};

export default Invoke;

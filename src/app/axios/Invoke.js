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

Invoke.getListServices = (page, limit, keyword, type, status, employeeId) => {
  return ConfigAxios.get(
    `/services?page=${page}&limit=${limit}&q=${keyword}&type=${type}&status=${status}&employeeId=${employeeId}`
  );
};

Invoke.deleteJobServiceById = (jobId) => {
  return ConfigAxios.delete(`/services/${jobId}`, headersConfigDelete);
};

Invoke.getOneServices = (jobId) => {
  return ConfigAxios.get(`/services/${jobId}`);
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
  return ConfigAxios.delete(`/admins/${adminId}`, headersConfigDelete);
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

// === Employee - Tools API : ===
Invoke.getEmployeeTools = (employeeId, page, limit) => {
  return ConfigAxios.get(
    `/employees/tools/${employeeId}?page=${page}&limit=${limit}`
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
Invoke.getCustomerList = (page, limit, keyword, branchId) => {
  return ConfigAxios.get(
    `/customers?page=${page}&limit=${limit}&q=${keyword}&branchId=${branchId}`
  );
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
  return ConfigAxios.delete(`/customers/${customerId}`, headersConfigDelete);
};
// === End Customers API ===

// === Employee API === :
Invoke.getEmployeeList = (
  page,
  limit,
  keyword,
  roleId,
  branchId,
  divisionId
) => {
  return ConfigAxios.get(
    `/employees?page=${page}&limit=${limit}&q=${keyword}&role_id=${roleId}&branch_id=${branchId}&division_id=${divisionId}`
  );
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
  return ConfigAxios.delete(`/employees/${employeeId}`, headersConfigDelete);
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

Invoke.deleteEmployeeToolsById = (employeeToolsId) => {
  return ConfigAxios.delete(
    `/employees/tools/${employeeToolsId}`,
    headersConfigDelete
  );
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

// === Dashboard API ===
Invoke.getDashboardProgressData = (data) => {
  return ConfigAxios.get("/dashboards", data);
};
// === End Dashboard API ===

// === Services API ===
Invoke.addInternalService = (data) => {
  return ConfigAxios.post("/services", data);
};
Invoke.updateJobService = (data) => {
  return ConfigAxios.put("/services", data);
};
Invoke.setFinishedService = (jobId) => {
  return ConfigAxios.get(`/m_services/finish/${jobId}`);
};
Invoke.setApprovedService = (jobId) => {
  return ConfigAxios.get(`/m_services/approve/${jobId}`);
};
Invoke.setRejectedService = (jobId, payload) => {
  return ConfigAxios.post(
    `/m_services/reject/${jobId}?allowReject=true`,
    payload
  );
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
Invoke.getJobServiceSummary = (jobId, unitId) => {
  return ConfigAxios.get(
    `/m_services/summary/${jobId}${unitId ? "/" + unitId : ""}`
  );
};
Invoke.getJobServiceMedia = (jobId, unitId) => {
  return ConfigAxios.get(
    `/services/medias/${jobId}${unitId ? "/" + unitId : ""}`
  );
};
Invoke.getJobServiceDailies = (jobId, unitId) => {
  return ConfigAxios.get(`/services/dailies/${jobId}/${unitId}`);
};
Invoke.updateJobServiceDailies = (payload) => {
  return ConfigAxios.put(`/services/dailies`, payload);
};
Invoke.getChecklistData = (unitModelId) => {
  return ConfigAxios.get(`/m_services/checklist/${unitModelId}`);
};
Invoke.getRejectedData = (jobId) => {
  return ConfigAxios.get(`/m_services/reject/${jobId}`);
};
Invoke.getJobServiceHistories = (jobId, page, limit, keyword) => {
  return ConfigAxios.get(
    `/services/logs/${jobId}?page=${page}&limit=${limit}&q=${keyword}`
  );
};
Invoke.addJobServiceMedia = (payload, jobId, unitId) => {
  return ConfigAxios.post(
    `/m_services/media/${jobId}${unitId ? "/" + unitId : ""}`,
    payload
  );
};
Invoke.addJobServiceDaily = (payload, jobId) => {
  return ConfigAxios.post(`/m_services/daily/${jobId}`, payload);
};
Invoke.updateSummary = (payload, jobId, unitId) => {
  return ConfigAxios.put(
    `/m_services/summary/${jobId}${unitId ? "/" + unitId : ""}`,
    payload
  );
};
Invoke.setJobToProgress = (jobId) => {
  return ConfigAxios.get(`/m_services/progress/${jobId}`);
};
Invoke.updateChecklist = (payload, unitId) => {
  return ConfigAxios.put(`/m_services/checklist/${unitId}`, payload);
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
Invoke.addUnitSerialNumber = (payload, unitModelId) => {
  return ConfigAxios.post(`/units/serial/${unitModelId}`, payload);
};
Invoke.updateUnitSerialNumber = (payload, unitModelId, unitSerialNumberId) => {
  return ConfigAxios.put(
    `/units/serial/${unitModelId}/${unitSerialNumberId}`,
    payload
  );
};
Invoke.deleteUnitSerialNumber = (unitModelId, unitSerialNumberId) => {
  return ConfigAxios.delete(
    `/units/serial/${unitModelId}/${unitSerialNumberId}`,
    headersConfigDelete
  );
};
Invoke.getUnitSerialNumber = (
  page,
  limit,
  keyword,
  unitModelId,
  customerId
) => {
  return ConfigAxios.get(
    `/units/serial/${unitModelId}?page=${page}&limit=${limit}&q=${keyword}&customerId=${customerId}`
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

// === Master unit-fields API === :
Invoke.getListUnitFields = (page, limit, unitId, keyword) => {
  return ConfigAxios.get(
    `/units/fields/${unitId}?page=${page}&limit=${limit}&q=${keyword}`
  );
};
Invoke.getListUnitJobForms = (unitId, jobFormId) => {
  return ConfigAxios.get(`/units/job_forms/${unitId}?job_form_id=${jobFormId}`);
};
Invoke.addUnitFields = (payload) => {
  return ConfigAxios.post(`/units/fields`, payload);
};
Invoke.updateUnitFields = (payload) => {
  return ConfigAxios.put(`/units/fields`, payload);
};
Invoke.deleteUnitFieldsById = (unitfieldsId) => {
  return ConfigAxios.delete(
    `units/fields/${unitfieldsId}`,
    headersConfigDelete
  );
};
// === End Master Unit-Model API ===

// === Master Job-Form API === :
Invoke.getListJobForm = (page, limit, keyowrd) => {
  return ConfigAxios.get(`job_forms?page=${page}&limit=${limit}&q=${keyowrd}`);
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
Invoke.getListEngine = (page, limit, keyword) => {
  return ConfigAxios.get(`/engines?page=${page}&limit=${limit}&q=${keyword}`);
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
Invoke.getListTools = (page, limit, keyword) => {
  return ConfigAxios.get(`/tools?page=${page}&limit=${limit}&q=${keyword}`);
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
Invoke.getFormCategory = (page, limit, keyword) => {
  return ConfigAxios.get(
    `/category_forms?page=${page}&limit=${limit}&q=${keyword}`
  );
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
Invoke.getIdentificationList = (page, limit, keyword) => {
  return ConfigAxios.get(
    `/identifications?page=${page}&limit=${limit}&q=${keyword}`
  );
};

Invoke.addIdentification = (payload) => {
  return ConfigAxios.post(`/identifications`, payload);
};

Invoke.updateIdentificationMilling = (payload) => {
  return ConfigAxios.put("/m_identifications/milling", payload);
};

Invoke.updateIdentificationRegular = (payload) => {
  return ConfigAxios.put("/m_identifications/regular", payload);
};

Invoke.deleteIdentificationById = (identificationId) => {
  return ConfigAxios.delete(
    `/identifications/${identificationId}`,
    headersConfigDelete
  );
};

// === Master Dvision API === :
Invoke.getDivisionList = (page, limit, keyword) => {
  return ConfigAxios.get(`/divisions?page=${page}&limit=${limit}&q=${keyword}`);
};
Invoke.addDivision = (payload) => {
  return ConfigAxios.post(`/divisions`, payload);
};
Invoke.updateDivision = (payload) => {
  return ConfigAxios.put(`/divisions`, payload);
};
Invoke.deleteDivision = (divisionId) => {
  return ConfigAxios.delete(`/divisions/${divisionId}`, headersConfigDelete);
};

// === Master Dvision - Unit API === :
Invoke.getDivisionUnitList = (divisionId, page, limit, keyword) => {
  return ConfigAxios.get(
    `/units/divisions/${divisionId}?page=${page}&limit=${limit}&q=${keyword}`
  );
};
Invoke.addDivisionUnit = (payload) => {
  return ConfigAxios.post(`/units/divisions`, payload);
};

// Monitoring Employee
Invoke.getReportMonitoringEmployee = (
  page,
  limit,
  from,
  until,
  type = "all",
  keyword,
  branchId
) => {
  return ConfigAxios.get(
    `/report/monitoring?from=${from}&until=${until}&page=${page}&limit=${limit}&branchId=${branchId}&type=${type}&q=${keyword}`
  );
};

// Report Service Repair
Invoke.getReportServiceRepair = (
  page,
  limit,
  from,
  until,
  keyword,
  branchId
) => {
  return ConfigAxios.get(
    `/report/report_services?from=${from}&until=${until}&page=${page}&limit=${limit}&branchId=${branchId}&q=${keyword}`
  );
};

// Report Employee
Invoke.getReportEmployee = (page, limit, from, until, keyword, branchId) => {
  return ConfigAxios.get(
    `/report/report_employee?from=${from}&until=${until}&page=${page}&limit=${limit}&branchId=${branchId}&q=${keyword}`
  );
};

// Working Hours
Invoke.getWorkingHours = (page, limit, from, until, keyword) => {
  return ConfigAxios.get(
    `/services/monitor/hour?startDate=${from}&endDate=${until}&page=${page}&limit=${limit}&q=${keyword}`
  );
};

// Download pdf from server
Invoke.getTransactionPdfUrl = (jobId) => {
  return ConfigAxios.get(`/services/print_job/${jobId}`);
};
// Download pdf to BLOB
Invoke.downloadPdfFromUrl = (url) => {
  return ConfigAxios.get(url, { responseType: "blob" });
};

export default Invoke;

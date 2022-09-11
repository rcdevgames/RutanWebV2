export const validateFormLogin = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Username wajib diisi!";
  } else if (values.username.length < 4) {
    errors.username = "Minimal 4 karakter atau lebih";
  }
  if (!values.password) {
    errors.password = "Password wajib diisi!";
  } else if (values.password.length < 5) {
    errors.password = "Minimal 5 karakter atau lebih";
  }
  return errors;
};

export const validateFormInternalService = (values) => {
  const errors = {};
  if (!values.typeService) {
    errors.typeService = "Tipe service wajib diisi!";
  }
  if (!values.startDate) {
    errors.startDate = "Tanggal Mulai wajib diisi!";
  }
  if (!values.endDate) {
    errors.endDate = "Tanggal Akhir wajib diisi!";
  }
  if (!values.jobPerform) {
    errors.jobPerform = "Job Perform wajib diisi!";
  }
  if (!values.customer) {
    errors.customer = "Wajib pilih customer";
  }
  if (!values.customerLocation) {
    errors.customerLocation = "Lokasi wajib diisi!";
  }
  // ========== Field Array Valdiation ===========
  if (!values.employees) {
    errors.employees = "Wajib pilih karyawan!";
  }
  return errors;
};

export const validateFormExternalService = (values) => {
  const errors = {};
  if (!values.typeService) {
    errors.typeService = "Tipe service wajib diisi!";
  }
  if (!values.startDate) {
    errors.startDate = "Tanggal Mulai wajib diisi!";
  }
  if (!values.endDate) {
    errors.endDate = "Tanggal Akhir wajib diisi!";
  }
  if (!values.jobPerform) {
    errors.jobPerform = "Job Perform wajib diisi!";
  }
  if (!values.jobForm) {
    errors.jobForm = "Job Form wajib diisi!";
  }
  if (!values.warranty) {
    errors.warranty = "Job Form wajib diisi!";
  }
  if (!values.customer) {
    errors.customer = "Wajib pilih customer";
  }
  if (!values.customerLocation) {
    errors.customerLocation = "Lokasi wajib diisi!";
  }
  // ========== Field Array Valdiation ===========
  if (!values.employees) {
    errors.employees = "Wajib pilih karyawan!";
  }
  return errors;
  return errors;
};

export const validateFormRoles = (values) => {
  const errors = {};
  if (!values.description) {
    errors.description = "Deskripsi wajib diisi!";
  }
  return errors;
};

export const validateFormCategory = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Judul wajib diisi!";
  }
  return errors;
};

export const validateFormUnit = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Nama Unit wajib diisi!";
  }
  return errors;
};

export const validateFormUnitModel = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Nama Model wajib diisi!";
  }
  return errors;
};

export const validateFormTools = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Nama peralatan wajib diisi!";
  }
  return errors;
};

export const validateFormEmployee = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Nama wajib diisi!";
  }
  if (!values.phone) {
    errors.phone = "No. Telpon wajib diisi!";
  }
  if (!values.province) {
    errors.province = "Wajib pilih provinsi!";
  }
  if (!values.city) {
    errors.city = "Wajib pilih kota!";
  }
  if (!values.branch) {
    errors.branch = "Wajib pilih cabang!";
  }
  if (!values.address) {
    errors.address = "Wajib isi alamat!";
  }
  return errors;
};

export const validateServiceEmployeeForm = (values) => {
  const errors = {};
  if (!values.employee) {
    errors.employee = "Karyawan wajib diisi!";
  }
  return errors;
};

export const validateDivisionForm = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Judul wajib diisi!";
  }
  if (!values.headDivision) {
    errors.headDivision = "Kepala divisi wajib diisi!";
  }
  return errors;
};

export const validateDivisionUnitForm = (values) => {
  const errors = {};
  if (!values.unit) {
    errors.unit = "Unit wajib dipilih!";
  }
  return errors;
};

export const validateEmployeeToolsForm = (values) => {
  const errors = {};
  if (!values.tools) {
    errors.tools = "Peralatan wajib dipilih!";
  }
  return errors;
};

export const validateFormRejected = (values) => {
  const errors = {};
  if (!values.reson) {
    errors.reson = "Field ini wajib diisi!";
  }
  return errors;
};

export const validateFormTransaction = (values) => {
  const errors = {};
  if (!values.jobPerform) {
    errors.jobPerform = "Field ini wajib diisi!";
  }
  return errors;
};

export const validateFormEditMedia = (values) => {
  const errors = {};
  if (!values.imageUrl) {
    errors.imageUrl = "Field ini wajib diisi!";
  }
  if (!values.title) {
    errors.title = "Field ini wajib diisi!";
  }
  if (!values.unit) {
    errors.unit = "Wajib pilih unit!";
  }

  return errors;
};

export const validateUnitSerialNumberForm = (values) => {
  const errors = {};
  if (!values.customer) {
    errors.customer = "Wajib memilih customer!";
  }
  if (!values.serialNumber) {
    errors.serialNumber = "Serial number wajib diisi!";
  }
  if (!values.descriptions) {
    errors.descriptions = "Deskripsi wajib diisi!";
  }
  return errors;
};

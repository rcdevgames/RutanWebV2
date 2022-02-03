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
  // if (!values.typeService) {
  //   errors.typeService = "Tipe service wajib diisi!";
  // }
  // if (!values.startDate) {
  //   errors.startDate = "Tanggal Mulai wajib diisi!";
  // }
  // if (!values.endDate) {
  //   errors.endDate = "Tanggal Akhir wajib diisi!";
  // }
  // if (!values.jobPerform) {
  //   errors.jobPerform = "Job Perform wajib diisi!";
  // }
  // if (!values.employee) {
  //   errors.employee = "Wajib pilih karyawan!";
  // }
  // if (!values.customer) {
  //   errors.customer = "Wajib pilih customer";
  // }
  // if (!values.customerLocation) {
  //   errors.customerLocation = "Lokasi wajib diisi!";
  // }
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

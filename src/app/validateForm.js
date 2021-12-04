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
  if (!values.employee) {
    errors.employee = "Wajib pilih karyawan!";
  }
  if (!values.customer) {
    errors.customer = "Wajib pilih customer";
  }
  if (!values.customerLocation) {
    errors.customerLocation = "Lokasi wajib diisi!";
  }
  return errors;
};

import history from "./History";

export const navigate = (path) => {
  history.push(path);
  window.location.reload();
};

export const getIndex = (currentpage, limit) => {
  const pageNumbers = [];
  const startIndex = currentpage * limit - limit + 1;
  const endIndex = startIndex + limit;
  for (let i = startIndex === 0 ? 1 : startIndex; i <= endIndex; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const SelectLocation = [
  {
    id: `location-1`,
    value: "L1",
    label: "Cabang",
  },
  {
    id: `location-2`,
    value: "L2",
    label: "Depo PT Rutan",
  },
];

export const SelectType = [
  {
    id: `type-1`,
    value: "T1",
    label: "Project",
  },
  {
    id: `type-2`,
    value: "T2",
    label: "PB",
  },
  {
    id: `type-3`,
    value: "T3",
    label: "Komersil",
  },
];

export const SelectInstanceType = [
  {
    id: `type-1`,
    value: "T1",
    label: "Penggilingan",
  },
  {
    id: `type-2`,
    value: "T2",
    label: "Kelompok Tani",
  },
];

export const SelectStatus = [
  {
    id: `status-1`,
    value: "S1",
    label: "Progress",
  },
  {
    id: `status-2`,
    value: "S2",
    label: "Finished",
  },
  {
    id: `status-3`,
    value: "S3",
    label: "Rejected",
  },
];

export const SelectStatusServices = [
  {
    id: `status-1`,
    value: "S1",
    label: "New",
  },
  {
    id: `status-2`,
    value: "S2",
    label: "Progress",
  },
  {
    id: `status-3`,
    value: "S3",
    label: "Completed",
  },
  {
    id: `status-2`,
    value: "S4",
    label: "Approved",
  },
  {
    id: `status-3`,
    value: "S5",
    label: "Rejected",
  },
];

export const SelectStatusMilling = [
  {
    id: `status-1`,
    value: "S1",
    label: "Pemilik",
  },
  {
    id: `status-2`,
    value: "S2",
    label: "Operator",
  },
  {
    id: `status-3`,
    value: "S3",
    label: "Penanggung Jawab",
  },
  {
    id: `status-3`,
    value: "S4",
    label: "Lain-lain",
  },
];

export const SelectInstanceTypeRegular = [
  {
    id: `status-1`,
    value: "T1",
    label: "Kepemilikan Pribadi",
  },
  {
    id: `status-2`,
    value: "T2",
    label: "Perusahaan",
  },
  {
    id: `status-3`,
    value: "T3",
    label: "Kelompok Tani",
  },
  {
    id: `status-3`,
    value: "T4",
    label: "Dinas",
  },
];

export const SelectStatusIdentification = [
  {
    id: `status-identification-1`,
    value: "S1",
    label: "Pemilik",
  },
  {
    id: `status-identification-2`,
    value: "S2",
    label: "Operator",
  },
  {
    id: `status-identification-3`,
    value: "S3",
    label: "Penanggung Jawab",
  },
];

export const SelectMilling = [
  {
    id: `milling-1`,
    value: "true",
    label: "Penggilingan",
  },
  {
    id: `milling-2`,
    value: "false",
    label: "non-Penggilingan",
  },
];

export const enumTypeInternalServices = [
  { id: `enum-type-1`, value: "T1", label: "Repair" },
  { id: `enum-type-2`, value: "T2", label: "TroubleShoot" },
  { id: `enum-type-3`, value: "T3", label: "Training" },
];

export const enumTypeExternalServices = [
  { id: `enum-type-1`, value: "T1", label: "Repair" },
  { id: `enum-type-2`, value: "T2", label: "TroubleShoot" },
  { id: `enum-type-3`, value: "T3", label: "Identification" },
  { id: `enum-type-4`, value: "T4", label: "Training" },
  { id: `enum-type-5`, value: "T5", label: "Demo" },
  { id: `enum-type-6`, value: "T6", label: "Modification" },
];

export const enumWarranty = [
  { id: `enum-warranty-1`, value: true, label: "Warranty" },
  { id: `enum-warranty-2`, value: false, label: "No Warranty" },
];

export const warrantyMonths = () => {
  const warrantyMonths = [];
  for (let i = 0; i <= 24; i++) {
    warrantyMonths.push({
      id: `enum-warranty-moths-${i}`,
      value: i.toString(),
      label: `${i} bulan`,
    });
  }
  return warrantyMonths;
};

export const getProvinceEnum = (data) => {
  const SelectProvince = [];
  data.map((item, index) => {
    SelectProvince.push({
      id: `province-${index}`,
      value: item.id,
      label: item.name,
    });
  });
  return SelectProvince;
};

export const getCitiesEnum = (data) => {
  const SelectCities = [];
  data.map((item, index) => {
    SelectCities.push({
      id: `city-${index}`,
      value: item.id,
      label: item.name,
    });
  });
  return SelectCities;
};

export const getRolesEnum = (data) => {
  const SelectRoles = [];
  data.map((item, index) => {
    SelectRoles.push({
      id: `role-${index}`,
      value: item.id,
      label: item.name,
    });
  });
  return SelectRoles;
};

export const enumSelectGenerator = (data, enumName) => {
  const SelectEnum = [];
  data.map((item, index) => {
    SelectEnum.push({
      id: `${enumName}-${index}`,
      value: item.id,
      label: item.name,
    });
  });
  return SelectEnum;
};

export const getUnitModelEnum = (data) => {
  const SelectUnitModel = [];
  data.map((item, index) => {
    SelectUnitModel.push({
      id: `unit-model-${index}`,
      value: item.id,
      label: item.name,
    });
  });
  return SelectUnitModel;
};

export const getMachineConf = (data) => {
  const SelectMachines = [];
  data.map((item, index) => {
    SelectMachines.push({
      id: item.id,
      name: item.name.replace(/ /g, "_").toLowerCase(),
      type: item.name,
    });
  });
  return SelectMachines;
};

export const getStatus = (status = "") => {
  let statusItem = {};
  switch (status.toUpperCase()) {
    case "S1":
      statusItem = { value: "Progress", color: "#108ee9" };
      break;
    case "S2":
      statusItem = { value: "Finished", color: "#87d068" };
      break;
    case "S3":
      statusItem = { value: "Rejected", color: "#f50" };
      break;
    default:
      statusItem = { value: "-", color: "#f50" };
      break;
  }

  return statusItem;
};

// This list not used
export const machineConf = [
  {
    name: "dryer",
    type: "dryer",
  },
  {
    name: "cleaner",
    type: "cleaner",
  },
  {
    name: "head_husker",
    type: "head husker",
  },
  {
    name: "body_husker",
    type: "body husker",
  },
  {
    name: "separator",
    type: "separator",
  },
  {
    name: "destoner",
    type: "destoner",
  },
  {
    name: "horizontal_abrasive",
    type: "horizontal abrasive",
  },

  {
    name: "vertikal_abrasive",
    type: "vertikal abrasive",
  },
  {
    name: "horizontal_abrasive",
    type: "horizontal abrasive",
  },
  {
    name: "friction_abrasive",
    type: "friction abrasive",
  },
  {
    name: "rotary_rice_sifter",
    type: "rotary rice sifter",
  },
  {
    name: "non_rotary_rice_sifter",
    type: "non rotary rice sifter",
  },

  {
    name: "length_grader",
    type: "length grader",
  },
  {
    name: "milling_meter",
    type: "milling meter",
  },
  {
    name: "scale",
    type: "scale",
  },
];

export const monitoringType = {
  all: "all",
  external: "T1",
  internal: "T2",
  loss: "T3",
};

export const categoryServices = [
  {
    name: "Internal Service",
    status: "processing",
  },
  {
    name: "External Service",
    status: "success",
  },
  {
    name: "Service With Warranty",
    status: "warning",
  },
];

export const categoryMonitoringServices = [
  {
    name: "Internal Service",
    status: "processing",
  },
  {
    name: "External Service",
    status: "success",
  },
  {
    name: "Service With Warranty",
    status: "warning",
  },
  {
    name: "Loss",
    status: "error",
  },
];

export const enumTypeMonitoringEmployee = [
  { id: `enum-type-1`, value: "T1", label: "Repair" },
  { id: `enum-type-2`, value: "T2", label: "TroubleShoot" },
  { id: `enum-type-3`, value: "T3", label: "Identification" },
  { id: `enum-type-4`, value: "T4", label: "Pelatihan" },
  { id: `enum-type-5`, value: "T5", label: "Demo" },
  { id: `enum-type-6`, value: "T6", label: "Modifikasi" },
];

export const getBase64Image = (url) => {
  const img = new Image();
  img.setAttribute("crossOrigin", "anonymous");
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL("image/png");
    console.log(dataURL);
  };
  img.src = url;
};
